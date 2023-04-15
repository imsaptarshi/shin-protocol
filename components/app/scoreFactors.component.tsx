import { Box, Flex, Tooltip, Text, useDisclosure } from "@chakra-ui/react";
import AwardIcon from "../icons/award.icon";
import InfoIcon from "../icons/info.icon";
import Track from "./track.component";
import KeyIcon from "../icons/key.icon";

import { useState, useEffect } from "react";

import Captcha from "../modals/captcha.component";
import config from "@/utils/helpers/config";
import Vouching from "../modals/vouching.component";
import AsterickIcon from "../icons/asterick.icon";
import ClockIcon from "../icons/clock.icon";

export default function ScoreFactors() {
  const {
    isOpen: isCaptchaOpen,
    onOpen: onCaptchaOpen,
    onClose: onCaptchaClose,
  } = useDisclosure();
  const {
    isOpen: isVouchingOpen,
    onOpen: onVouchingOpen,
    onClose: onVouchingClose,
  } = useDisclosure();

  return (
    <Box
      bg="#ECEDFF"
      w="full"
      h="auto"
      rounded="35px"
      py="4"
      px="6"
      border="1px solid #F9FAFF"
    >
      <Captcha isOpen={isCaptchaOpen} onClose={onCaptchaClose} id={1} />
      <Vouching isOpen={isVouchingOpen} onClose={onVouchingClose} id={2} />

      <Flex alignItems="center" w="full" justify="space-between">
        <Flex alignItems="center" experimental_spaceX={2}>
          <Text color="secondary" fontWeight="medium" fontSize="2xl">
            Score Factors
          </Text>
        </Flex>
        <Tooltip
          label="Tracks to leverage your scores"
          w="60"
          bg="whiteAlpha.600"
          shadow="none"
          rounded="xl"
          fontFamily="secondary"
          p="2"
          fontSize="xs"
          color="secondary"
        >
          <Box bg="#F9FAFF" p="1" rounded="lg" cursor="pointer">
            <InfoIcon />
          </Box>
        </Tooltip>
      </Flex>
      <Flex mt="4" wrap="wrap">
        <Track
          title="Chain Reputation"
          description="Score based on your chain behaviour"
          icon={<AsterickIcon />}
          points={
            config.weightage.balance +
            config.weightage.NFT_count[0] +
            config.weightage.chain_history.erc20_token_transactions[0] +
            config.weightage.chain_history.transaction_count[0]
          }
          id={0}
          callback={() => {}}
        />
        <Track
          title="Captcha"
          description="Complete captcha to increase your trust score"
          icon={<KeyIcon width="7" height="7" />}
          points={config.weightage.captcha}
          id={1}
          callback={onCaptchaOpen}
        />{" "}
        <Track
          title="Chain History"
          description="Score based on your chain history"
          icon={<ClockIcon />}
          points={
            config.weightage.chain_history.erc20_token_transactions[0] +
            config.weightage.chain_history.transaction_count[0]
          }
          id={0}
          callback={() => {}}
        />
        <Track
          title="Vouching"
          description="Vouch for your friends or claim vouches to gain points"
          icon={<KeyIcon width="7" height="7" />}
          points={config.weightage.vouching}
          id={2}
          callback={onVouchingOpen}
        />
      </Flex>
    </Box>
  );
}
