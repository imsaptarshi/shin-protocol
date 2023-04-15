import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
  CloseButton,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { FaChevronRight, FaWallet } from "react-icons/fa";
import {
  ConnectWallet,
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useWalletConnect,
} from "@thirdweb-dev/react";
import config from "../../utils/helpers/config";

export default function ChangeNetwork({ isOpen, onClose }: any) {
  const address = useAddress();

  const [, switchNetwork]: any = useNetwork();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay bg="blackAlpha.800" />

      <ModalContent
        position="relative"
        rounded={{ base: "none", md: "40px" }}
        bg="blackAlpha.400"
        backdropFilter="blur(30px)"
        border="solid white 2px"
      >
        <Box position="absolute" right="-8" top="-8" bg="white" rounded="full">
          <CloseButton color="black" onClick={onClose} />
        </Box>

        <ModalHeader>
          <Flex
            alignItems="center"
            direction="column"
            experimental_spaceX="2"
            mt="3"
          >
            <Box color="white">
              <FaWallet size="35px" />
            </Box>
            <Text
              textAlign="center"
              color="white"
              fontWeight="medium"
              fontSize="2xl"
              mt="2"
            >
              Change Network
            </Text>
            <Text
              textAlign="center"
              fontWeight="thin"
              fontFamily="secondary"
              color="whiteAlpha.600"
              fontSize="sm"
            >
              Please change your network to polygon
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />
        <ModalBody mb="4">
          <Flex direction="column" experimental_spaceY="4" mt="0">
            <Button
              bg="rgba(131, 69, 230, 0.19);"
              w="full"
              mx="auto"
              py="12"
              rounded="2xl"
              border="solid #BE96FF 1px"
              role="group"
              _hover={{}}
              _active={{}}
              _focus={{}}
              onClick={() => {
                switchNetwork(config.chainId);
              }}
              leftIcon={
                <Image
                  src="assets/polygon.png"
                  w="12"
                  h="12"
                  mr="4"
                  alt="polygon-logo"
                />
              }
              rightIcon={
                <Box
                  color="#BE96FF"
                  ml="4"
                  _groupHover={{ transform: "translateX(4px)" }}
                  transitionDuration="200ms"
                >
                  <FaChevronRight />
                </Box>
              }
            >
              <Flex direction="column" experimental_spaceY="2">
                <Text color="#BE96FF">Switch to Polygon</Text>
              </Flex>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
