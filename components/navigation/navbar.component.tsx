import {
  Flex,
  Image,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  Text,
  Box,
  MenuList,
  MenuItem,
  MenuIcon,
  Link,
} from "@chakra-ui/react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { FaCaretDown, FaSignOutAlt, FaWallet } from "react-icons/fa";
import { getAllEnsLinked } from "../../utils/helpers/resolveEns";
import WalletConnect from "../modals/connect.component";
import BellIcon from "../icons/bell.icon";
import getNotifications from "@/utils/helpers/getNotifications";

export default function Navbar({ translateToggle }: any) {
  const {
    isOpen: isConnectOpen,
    onClose: onConnectClose,
    onOpen: onConnectOpen,
  } = useDisclosure();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const [ens, setEns] = useState("");
  const address: any = useAddress();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (address) {
      _getAllEnsLinked();
      _getNotifications();
    }
  }, [address]);
  const _getAllEnsLinked = async () => {
    const n = await getAllEnsLinked(address);
    //console.log("ens", n);
    if (n.data.domains[0]?.name) {
      setEns(n.data.domains[0]?.name);
    } else {
      setEns("");
    }
  };

  const _getNotifications = async () => {
    const n: any = await getNotifications(address);
    setNotifications(n);
  };

  return (
    <Flex w="100%" justify="space-between" align="center">
      <WalletConnect isOpen={isConnectOpen} onClose={onConnectClose} />
      <Image src="/assets/logo.svg" alt={""} w="50px" />
      <Flex alignItems="center" experimental_spaceX={6}>
        <Link
          href="/docs"
          fontFamily="secondary"
          color="secondary"
          fontWeight="normal"
          textDecoration="underline"
        >
          Docs
        </Link>
        {translateToggle}
        {address ? (
          <>
            <Menu>
              <MenuButton
                bg="#F8F9FF"
                fontFamily="secondary"
                color="white"
                ring="1px"
                ringColor="whiteAlpha.500"
                _focus={{}}
                _hover={{ bg: "whiteAlpha.100" }}
                _active={{}}
                fontWeight="normal"
                onClick={async () => {
                  if (address) {
                    const n: any = await getNotifications(address);
                    setNotifications(n);
                  }
                }}
                rounded="lg"
                px="3.5"
                py="2"
              >
                <BellIcon width="5" height="5" />
              </MenuButton>
              <MenuList
                backdropFilter="blur(20px) "
                rounded="2xl"
                border="0.520833px solid #F9FAFF"
                bg="rgba(255, 255, 255, 0.6)"
              >
                {notifications.slice(0, 6).map((data: any, key) => (
                  <MenuItem key={key} bg="transparent">
                    <MenuIcon rounded="xl" p="2">
                      <Image src={data.image} alt={data.image} w="8" />
                    </MenuIcon>
                    <Text
                      fontFamily="secondary"
                      fontWeight="medium"
                      color="#757ABD"
                      fontSize="sm"
                      ml="2"
                    >
                      {data.notification.body}
                    </Text>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                bg="#F8F9FF"
                fontFamily="primary"
                color="secondary"
                ring="1px"
                ringColor="white"
                _focus={{}}
                _hover={{ transform: "scale(1.1)" }}
                _active={{}}
                fontWeight="normal"
                rounded="lg"
                p="4"
                py="2"
              >
                <Flex alignItems="center" experimental_spaceX={2}>
                  <Text>
                    {ens
                      ? ens
                      : address.slice(0, 4) +
                        "..." +
                        address.slice(address.length - 4)}
                  </Text>
                  <FaCaretDown />
                </Flex>
              </MenuButton>
              <MenuList
                bg="white"
                border="none"
                rounded="xl"
                shadow="sm"
                px="4"
                color="blackAlpha.700"
              >
                <MenuItem
                  w="fit-content"
                  bg="transparent"
                  textAlign="center"
                  onClick={disconnect}
                >
                  <MenuIcon mr="2">
                    <FaSignOutAlt />
                  </MenuIcon>
                  Disconnect
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            bg="#F8F9FF"
            fontFamily="primary"
            color="secondary"
            ring="1px"
            ringColor="white"
            _focus={{}}
            _hover={{ transform: "scale(1.1)" }}
            _active={{}}
            fontWeight="normal"
            onClick={() => {
              connectWithMetamask();
              localStorage.setItem("method", "injected");
            }}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
