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
  useWalletConnect,
} from "@thirdweb-dev/react";

export default function WalletConnect({ isOpen, onClose }: any) {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  useEffect(() => {
    if (address && isOpen) {
      onClose();
    }
  }, [address]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <Text color="white" fontWeight="medium" fontSize="2xl" mt="2">
              Connect Wallet
            </Text>
            <Text
              fontWeight="thin"
              fontFamily="secondary"
              color="whiteAlpha.600"
              fontSize="sm"
            >
              Please connect wallet of your choice
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />
        <ModalBody mb="4">
          <Flex direction="column" experimental_spaceY="4" mt="4">
            <Button
              bg="rgba(246, 133, 27, 0.14);"
              w="full"
              mx="auto"
              py="12"
              rounded="2xl"
              border="solid #F6851B 1px"
              role="group"
              _hover={{}}
              _active={{}}
              _focus={{}}
              onClick={() => {
                connectWithMetamask();
                localStorage.setItem("method", "injected");
              }}
              leftIcon={
                <Image
                  src="assets/metamask.png"
                  w="12"
                  h="12"
                  mr="4"
                  alt="metamask-logo"
                />
              }
              rightIcon={
                <Box
                  color="#F6851B"
                  ml="4"
                  _groupHover={{ transform: "translateX(4px)" }}
                  transitionDuration="200ms"
                >
                  <FaChevronRight />
                </Box>
              }
            >
              <Flex direction="column" experimental_spaceY="2">
                <Text color="#F6851B">Connect with Metamask</Text>
                <Badge
                  rounded="full"
                  py="1"
                  colorScheme="orange"
                  w="fit-content"
                  px="3"
                  mx="auto"
                >
                  Popular
                </Badge>
              </Flex>
            </Button>
            <Button
              w="full"
              bg="rgba(59, 153, 252, 0.15);"
              mx="auto"
              py="12"
              rounded="2xl"
              border="solid #3B99FC 1px"
              role="group"
              _hover={{}}
              _active={{}}
              _focus={{}}
              onClick={() => {
                connectWithWalletConnect();
                localStorage.setItem("method", "walletconnect");
              }}
              leftIcon={
                <Image
                  src="assets/walletconnect.png"
                  w="12"
                  h="12"
                  mr="4"
                  alt="metamask-logo"
                />
              }
              rightIcon={
                <Box
                  color="#3B99FC"
                  ml="4"
                  _groupHover={{ transform: "translateX(4px)" }}
                  transitionDuration="200ms"
                >
                  <FaChevronRight />
                </Box>
              }
            >
              <Flex direction="column" experimental_spaceY="2">
                <Text color="#3B99FC">Connect with WalletConnect</Text>
              </Flex>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
