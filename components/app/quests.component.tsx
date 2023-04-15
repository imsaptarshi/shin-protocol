import { Box, Flex, Tooltip, Text, useDisclosure } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import Quest from "./quest.component";
import { useAddress } from "@thirdweb-dev/react";
import { getAllEnsLinked } from "@/utils/helpers/resolveEns";
import { getLensHandle } from "@/utils/helpers/resolveLens";

export default function Quests() {
  const [isLoading, setIsLoading] = useState(true);
  const address: any = useAddress();
  const [isEnsEligible, setEnsEligible] = useState(false);
  const [isLensEligible, setLensEligible] = useState(false);

  const getEligibilities = async () => {
    setIsLoading(true);
    const ens: any = await getAllEnsLinked(address);
    if (ens.data?.domains?.length > 0) {
      setEnsEligible(true);
    }

    const lens: any = await getLensHandle(address);
    if (lens?.data?.defaultProfile) {
      setLensEligible(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (address) {
      getEligibilities();
    }
  }, [address]);

  return (
    <Box bg="transparent" w="full" h="auto" py="4" px="6">
      <Text color="secondary" fontWeight="medium" fontSize="3xl">
        Quests
      </Text>
      <Text
        color="blackAlpha.400"
        fontWeight="light"
        fontFamily="secondary"
        fontSize="lg"
      >
        Complete these quests to increase your trust score
      </Text>
      <Flex mt="8" experimental_spaceX={4}>
        <Quest
          title="ENS Address Holder"
          logo="https://s2.coinmarketcap.com/static/img/coins/64x64/13855.png"
          name="ENS"
          link="https://ens.domains/"
          description="Hold an ENS domain to complete this quest"
          points={20}
          isStateLoading={isLoading}
          isEligible={isEnsEligible}
          price={0}
          id={1}
        />
        <Quest
          title="Lens Handle Holder"
          logo="/assets/lens_logo.svg"
          name="Lens Protocol"
          link="https://www.lens.xyz/"
          description="Hold a Lens handle to complete this quest."
          points={20}
          isStateLoading={isLoading}
          isEligible={isLensEligible}
          price={0}
          id={2}
        />
      </Flex>
    </Box>
  );
}
