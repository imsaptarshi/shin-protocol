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
import { useAddress, useNetwork } from "@thirdweb-dev/react";
import config from "../../utils/helpers/config";
import Recaptcha from "react-google-recaptcha";
import axios from "axios";
import { supabase } from "@/utils/helpers/supabase";
import * as PushAPI from "@pushprotocol/restapi";
import { Wallet } from "ethers";

export default function Captcha({ isOpen, onClose, id }: any) {
  const address = useAddress();
  const recaptchaRef = React.createRef<any>();
  const [, switchNetwork]: any = useNetwork();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />

      <ModalContent position="relative" bg="transparent" shadow="none">
        <Flex justify="center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              let res = await recaptchaRef.current.getValue();
              const response = await axios.post("/api/captcha", {
                response: res,
              });
              let status = response.data.response.success;
              console.log(status);

              if (status && address) {
                let { data }: any = await supabase
                  .from("user")
                  .select("tracks")
                  .match({ address: address })
                  .single();
                console.log(data);
                data?.tracks?.push(id);
                await supabase
                  .from("user")
                  .upsert({ address: address, tracks: data?.tracks || [id] });
                const PK = process.env.NEXT_PUBLIC_PRIVATE_KEY; // channel private key
                const Pkey = `0x${PK}`;
                const _signer: any = await new Wallet(Pkey);
                const apiResponse = await PushAPI.payloads.sendNotification({
                  signer: _signer,
                  type: 3,
                  identityType: 2,
                  notification: {
                    title: `You completed a track!`,
                    body: "Track Completed: Captcha",
                  },
                  payload: {
                    title: `You completed a track!`,
                    body: "Track Completed: Captcha",
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
          >
            <Recaptcha
              ref={recaptchaRef}
              sitekey={
                process.env.NEXT_APP_RECAPTCHA_KEY ||
                "6LfzOD8lAAAAABanEnxY6SoD-JygIv2sr2JWyFs-"
              }
              size="normal"
              onChange={(e) => {
                document.getElementById("_submit")?.click();
              }}
            />
            <button id="_submit" type="submit" style={{ display: "none" }}>
              submit
            </button>
          </form>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
