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
  Spinner,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useAddress, useNetwork } from "@thirdweb-dev/react";
import config from "../../utils/helpers/config";
import Recaptcha from "react-google-recaptcha";
import axios from "axios";
import { supabase } from "@/utils/helpers/supabase";
import getClaimableVouches from "@/utils/helpers/getClaimableVouches";
import addVouch from "@/utils/helpers/addVouch";
import { Wallet } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

export default function Vouching({ isOpen, onClose, id }: any) {
  const address = useAddress();
  const [vouches, setVouches] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(true);
  const recaptchaRef = React.createRef<any>();
  const [, switchNetwork]: any = useNetwork();

  const getVouches = async () => {
    if (address) {
      setLoading(true);
      const res = await getClaimableVouches(address);
      console.log(res);
      setLoading(false);
      setVouches(res);
    }
  };

  useEffect(() => {
    getVouches();
  }, [address]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />

      <ModalContent position="relative" bg="transparent" shadow="none">
        <Flex justify="center" direction="column" alignItems="center">
          {!loading ? (
            <>
              {vouches?.length > 0 ? (
                <>
                  <Button
                    bg="#F8F9FF"
                    fontFamily="primary"
                    color="secondary"
                    ring="1px"
                    ringColor="white"
                    size="lg"
                    rounded="xl"
                    _focus={{}}
                    _hover={{ transform: "scale(1.1)" }}
                    _active={{}}
                    fontWeight="normal"
                    onClick={async () => {
                      let { data }: any = await supabase
                        .from("user")
                        .select("tracks")
                        .match({ address: address })
                        .single();
                      console.log(data);
                      data?.tracks?.push(id);
                      await supabase.from("user").upsert({
                        address: address,
                        tracks: data?.tracks || [id],
                      });
                      const PK = process.env.NEXT_PUBLIC_PRIVATE_KEY; // channel private key
                      const Pkey = `0x${PK}`;
                      const _signer: any = await new Wallet(Pkey);
                      const apiResponse =
                        await PushAPI.payloads.sendNotification({
                          signer: _signer,
                          type: 3,
                          identityType: 2,
                          notification: {
                            title: `You completed a track!`,
                            body: "Track Completed: Vouch Claimed",
                          },
                          payload: {
                            title: `You completed a track!`,
                            body: "Track Completed: Vouch Claimed",
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
                    }}
                  >
                    Claim
                  </Button>
                </>
              ) : (
                <Text color="primary" textShadow="md" fontSize="lg">
                  No Claimable Vouches
                </Text>
              )}
              <Text mt="6" color="blackAlpha.400">
                or
              </Text>
              <Flex mt="6">
                <Input
                  placeholder="vouch for a friend ..."
                  bg="whiteAlpha.600"
                  onChange={(e) => {
                    setReceiver(e.target.value);
                  }}
                  roundedLeft="xl"
                  roundedRight="none"
                  fontFamily="secondary"
                  fontWeight="normal"
                  _placeholder={{ color: "blackAlpha.600" }}
                />
                <Button
                  bg="#F8F9FF"
                  fontFamily="primary"
                  color="secondary"
                  ring="1px"
                  ringColor="white"
                  roundedRight="xl"
                  roundedLeft="none"
                  _focus={{}}
                  _hover={{ transform: "scale(1.1)" }}
                  _active={{}}
                  fontWeight="normal"
                  onClick={() => {
                    if (receiver) {
                      addVouch(address || "", receiver);
                      setReceiver("");
                    }
                  }}
                >
                  Send
                </Button>
              </Flex>
            </>
          ) : (
            <Spinner color="primary" />
          )}
        </Flex>
      </ModalContent>
    </Modal>
  );
}
