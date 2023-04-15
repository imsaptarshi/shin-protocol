import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import KeyIcon from "../icons/key.icon";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { supabase } from "@/utils/helpers/supabase";
import CheckIcon from "../icons/check.icon";
import AwardIcon from "../icons/award.icon";
import safeMint from "@/utils/helpers/safeMint";
import { Wallet } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

export default function Quest({
  title,
  description,
  link,
  name,
  logo,
  price,
  points,
  id,
  isEligible,
  isStateLoading,
  callback,
}: any) {
  const address = useAddress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUserQuests = async () => {
    setIsLoading(true);
    if (id !== 0) {
      let { data }: any = await supabase
        .from("user")
        .select("quests")
        .match({ address: address })
        .single();
      if (data?.quests?.includes(id)) {
        setIsCompleted(true);
      }
    } else if (id == 0) {
      setIsCompleted(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUserQuests();
  }, [address]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />

        <ModalContent
          position="relative"
          bg="transparent"
          shadow="none"
          fontFamily="primary"
        >
          <Box
            bg="#F1F4FF"
            py="6"
            px="8"
            cursor="pointer"
            transitionDuration="200ms"
            boxShadow="0px 3.79078px 38.8555px #D8E0FF"
            rounded="35px"
            border="1px #FFFFFF solid"
            maxW="360px"
            h="fit-content"
            mr="4"
            mb="4"
          >
            <Image src={logo} alt="quest" w="12" mb="3" />
            <Link
              textDecoration="underline"
              href={link}
              target="_blank"
              fontFamily="secondary"
              fontWeight="normal"
              color="#6770C5"
              opacity={0.4}
              fontSize="lg"
            >
              {name}
            </Link>
            <Text color="secondary" fontWeight="medium" fontSize="30px" mt="1">
              {title}
            </Text>
            <Text
              color="blackAlpha.400"
              fontWeight="normal"
              lineHeight={1}
              mt="2"
              fontFamily="secondary"
              fontSize="md"
            >
              {description}
            </Text>
            <Flex mt="10" experimental_spaceX={4} w="full">
              <Flex
                bg="#F8F9FF"
                rounded="10px"
                alignItems="center"
                px="3"
                py="2"
                experimental_spaceX={1}
              >
                <AwardIcon />
                <Text color="primary" fontWeight="medium">
                  +{points}
                </Text>
              </Flex>
              <Flex
                bg="#F8F9FF"
                rounded="10px"
                alignItems="center"
                px="3"
                py="2"
                experimental_spaceX={1}
              >
                {price ? (
                  <>
                    <Image src="/assets/polygon.svg" alt="matic" />
                    <Text color="primary" fontWeight="medium">
                      {price} MATIC
                    </Text>
                  </>
                ) : (
                  <Text color="primary" fontWeight="medium">
                    Free
                  </Text>
                )}
              </Flex>
            </Flex>
            <Button
              bg="primary"
              fontFamily="primary"
              color="white"
              ring="1px"
              w="full"
              size="lg"
              mt="4"
              ringColor="white"
              rounded="xl"
              _focus={{}}
              _hover={{ transform: "scale(1.1)" }}
              _active={{}}
              fontWeight="normal"
              isLoading={isLoading}
              onClick={async () => {
                if (isEligible && !isLoading && !isStateLoading && address) {
                  setIsLoading(true);
                  console.log("minting");
                  await safeMint(id, address);
                  let { data }: any = await supabase
                    .from("user")
                    .select("quests")
                    .match({ address: address })
                    .single();
                  console.log(data);
                  data?.quests?.push(id);
                  await supabase
                    .from("user")
                    .upsert({ address: address, quests: data?.quests || [id] });
                  const PK = process.env.NEXT_PUBLIC_PRIVATE_KEY; // channel private key
                  const Pkey = `0x${PK}`;
                  const _signer: any = await new Wallet(Pkey);
                  const apiResponse = await PushAPI.payloads.sendNotification({
                    signer: _signer,
                    type: 3,
                    identityType: 2,
                    notification: {
                      title: `You completed a quest!`,
                      body: "Quest Completed: " + title,
                    },
                    payload: {
                      title: `You completed a quest!`,
                      body: "Quest Completed: " + title,
                      cta: "",
                      img: "/assets/icons/completed.svg",
                    },
                    recipients: "eip155:80001:" + address,
                    channel:
                      "eip155:80001:0xeA88B7ad2B6663A4FC367bB1289D6EeD7a34860C",
                    env: "staging",
                  });
                  location.reload();
                  onClose();
                }
              }}
              isDisabled={!isEligible}
            >
              {isEligible ? "Claim" : "Not Eligible"}
            </Button>
          </Box>
        </ModalContent>
      </Modal>
      <Box
        bg="#F1F4FF"
        py="6"
        px="8"
        opacity={isLoading || isStateLoading || isCompleted ? "0.5" : "1"}
        onClick={() => {
          if (!isLoading && !isStateLoading && !isCompleted) {
            onOpen();
          }
        }}
        cursor={!isCompleted ? "pointer" : "auto"}
        transitionDuration="200ms"
        _hover={{ transform: "scale(1.05)" }}
        boxShadow="0px 3.79078px 38.8555px #D8E0FF"
        rounded="35px"
        border="1px #FFFFFF solid"
        maxW="360px"
        h="fit-content"
        mr="4"
        mb="4"
      >
        <Image src={logo} alt="quest" w="12" mb="3" />
        <Link
          textDecoration="underline"
          href={link}
          target="_blank"
          fontFamily="secondary"
          fontWeight="normal"
          color="#6770C5"
          opacity={0.4}
          fontSize="lg"
        >
          {name}
        </Link>
        <Text color="secondary" fontWeight="medium" fontSize="30px" mt="1">
          {title}
        </Text>
        <Text
          color="blackAlpha.400"
          fontWeight="normal"
          lineHeight={1}
          mt="2"
          fontFamily="secondary"
          fontSize="md"
        >
          {description}
        </Text>
        <Flex mt="10" experimental_spaceX={4} w="full">
          <Flex
            bg="#F8F9FF"
            rounded="10px"
            alignItems="center"
            px="3"
            py="2"
            experimental_spaceX={1}
          >
            <AwardIcon />
            <Text color="primary" fontWeight="medium">
              +{points}
            </Text>
          </Flex>
          <Flex
            bg="#F8F9FF"
            rounded="10px"
            alignItems="center"
            px="3"
            py="2"
            experimental_spaceX={1}
          >
            {price ? (
              <>
                <Image src="/assets/polygon.svg" alt="matic" />
                <Text color="primary" fontWeight="medium">
                  {price} MATIC
                </Text>
              </>
            ) : (
              <Text color="primary" fontWeight="medium">
                Free
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
