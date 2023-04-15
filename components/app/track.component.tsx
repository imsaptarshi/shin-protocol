import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import KeyIcon from "../icons/key.icon";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { supabase } from "@/utils/helpers/supabase";
import CheckIcon from "../icons/check.icon";

export default function Track({
  title,
  description,
  icon,
  points,
  id,
  callback,
}: any) {
  const address = useAddress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getUserTracks = async () => {
    setIsLoading(true);
    if (id !== 0) {
      let { data }: any = await supabase
        .from("user")
        .select("tracks")
        .match({ address: address })
        .single();
      if (data?.tracks?.includes(id)) {
        setIsCompleted(true);
      }
    } else if (id == 0) {
      setIsCompleted(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUserTracks();
  }, [address]);

  return (
    <Box
      bg="#F8F9FF"
      p="3"
      rounded="20px"
      maxW="360px"
      h="fit-content"
      mr="4"
      mb="4"
    >
      <Flex alignItems="center" experimental_spaceX={4}>
        <Flex
          position="relative"
          justifyContent="center"
          alignItems="center"
          minW="56px"
          minH="56px"
          bg="#191D77"
          rounded="14px"
          p="2"
          textAlign="center"
        >
          {icon}
          <Box
            right="-2.5"
            bottom="-2.5"
            border="3.5px solid #F8F9FF"
            bg="inactive"
            rounded="full"
            position="absolute"
            fontSize="12px"
            color="primary"
            fontWeight="medium"
            p="1"
          >
            +{points}
          </Box>
        </Flex>
        <Box>
          <Text
            color="secondary"
            fontWeight="medium"
            fontSize="22px"
            noOfLines={1}
            wordBreak="break-word"
          >
            {title}
          </Text>
          <Text
            color="#C9CACF"
            fontFamily="secondary"
            fontWeight="normal"
            fontSize="12px"
            noOfLines={2}
            mt="-0.5"
            lineHeight="14px"
          >
            {description}
          </Text>
        </Box>
        {!isLoading ? (
          isCompleted ? (
            <Flex
              direction="column"
              minW="20"
              justify="center"
              alignItems="center"
            >
              <CheckIcon width="6" height="6" />
              <Text
                color="inactive"
                fontFamily="secondary"
                fontWeight="medium"
                fontSize="xs"
              >
                Completed
              </Text>
            </Flex>
          ) : (
            <Button
              color="primary"
              bg="#F1F4FF"
              border="1px solid #4049B6"
              fontFamily="secondary"
              fontWeight="normal"
              fontSize="14px"
              rounded="lg"
              _focus={{}}
              _hover={{ bg: "#DDE5FF" }}
              _active={{}}
              px="8"
              onClick={callback}
            >
              Begin
            </Button>
          )
        ) : (
          <Flex minW="12" justify="center" alignItems="center">
            <Spinner minW="5" minH="5" color="secondary" />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
