import {
  Box,
  useTimeout,
  Text,
  Image,
  Spinner,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import AwardIcon from "../icons/award.icon";
import InfoIcon from "../icons/info.icon";

export default function ScoreBar({ score, isLoading }: any) {
  const [degree, setDegree] = useState(0);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    // Inspired by https://codepen.io/davatron5000/pen/jzMmME

    // Get all the Meters
    const meters = document.querySelectorAll("svg[data-value] .meter");
    console.log(meters.length);
    meters.forEach((path: any) => {
      // Get the length of the path
      let length = path.getTotalLength();
      console.log("Lol", path);
      // console.log(length);

      // Just need to set this once manually on the .meter element and then can be commented out
      // path.style.strokeDashoffset = length;
      // path.style.strokeDasharray = length;

      // Get the value of the meter
      let value = parseInt(path.parentNode.getAttribute("data-value"));
      // Calculate the percentage of the total length
      let to = length * ((200 - value) / 200);
      console.log(length);
      // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
      path.getBoundingClientRect();
      // Set the Offset
      path.style.strokeDashoffset = Math.max(0, to);
      setDegree(((score || 0) / 100) * 180);
      if (score >= 0 && score < 20) {
        setRemarks("Poor");
      } else if (score >= 20 && score < 40) {
        setRemarks("Fair");
      } else if (score >= 40 && score < 60) {
        setRemarks("Good");
      } else if (score >= 60 && score < 80) {
        setRemarks("Very Good");
      } else {
        setRemarks("Excellent");
      }
    });
  }, [score]);

  return (
    <Box
      bg="#F1F4FF"
      rounded="35px"
      position="relative"
      py="4"
      px="6"
      zIndex={1}
      minH="360px"
      minW="420px"
      border="1px solid white"
      boxShadow="0px 4px 41px #D8E0FF"
    >
      <Flex alignItems="center" w="full" justify="space-between">
        <Flex alignItems="center" experimental_spaceX={2}>
          <AwardIcon />{" "}
          <Text color="secondary" fontWeight="medium" fontSize="2xl">
            Trust Score
          </Text>
        </Flex>
        <Tooltip
          label="Trust score of your current address on Polygon Mainnet"
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
      <Box id="meter_parent" mt="5" position="relative" zIndex={2} w="full">
        <Box className="meter_parent" position="absolute" zIndex={2} left="12%">
          <svg
            viewBox="0 0 100 100"
            id="1"
            className="meter_line"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            data-value={score}
          >
            <linearGradient
              id="g1"
              gradientUnits="userSpaceOnUse"
              x1="-0.72%"
              y1="50.74%"
              x2="100.72%"
              y2="49.26%"
            >
              <stop offset=".006" stop-color="#D60340" />
              <stop offset=".338" stop-color="#8262FD" />
              <stop offset=".661" stop-color="#598BF8" />
              <stop offset=".992" stop-color="#52E09A" />
            </linearGradient>
            <circle r="45" cx="50" cy="50" />
            <path
              fill="none"
              className="meter"
              id="1"
              d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
              stroke="url(#g1)"
              strokeWidth="2.5px"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDashoffset="282.78302001953125"
              strokeDasharray="282.78302001953125"
            />
          </svg>
        </Box>
        <Box position="absolute" className="meter_parent" zIndex={1} left="12%">
          <svg
            viewBox="0 0 100 100"
            id="2"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            data-value="100"
          >
            <circle r="45" cx="50" cy="50" />
            <path
              fill="none"
              className="meter"
              id="2"
              d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
              stroke="#DDE2F7"
              strokeWidth="2.5px"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDashoffset={282.78314208984375 * 0.5}
              strokeDasharray="282.78302001953125"
            />
          </svg>
        </Box>
        <Box
          position="absolute"
          left="40px"
          top="125px"
          fontSize="xs"
          fontWeight="bold"
          color={score >= 0 ? "#D60543" : "#DDE2F7"}
        >
          0
        </Box>
        <Box
          position="absolute"
          right="38px"
          top="125px"
          fontSize="xs"
          fontWeight="bold"
          color={score == 100 ? "#52DD9D" : "#DDE2F7"}
        >
          100
        </Box>
        <Box
          position="absolute"
          w="215px"
          h="215px"
          bg="#EDEEFF"
          left="19.5%"
          mt="28px"
          rounded="full"
        ></Box>
        <Box
          position="absolute"
          zIndex={3}
          left="21.6%"
          mt="50.5px"
          color="black"
        >
          <Image
            w="185px"
            alt="score"
            position="relative"
            zIndex={3}
            src="/assets/score_element.svg"
            rotate="0deg"
            filter="drop-shadow( 0px 4.09396px 18.4228px rgba(117, 122, 189, 0.12))"
            transform={`rotate(${degree}deg)`}
            transitionDuration="1000ms"
            transformOrigin="100px"
          />
          {!isLoading ? (
            <Box
              position="absolute"
              zIndex={4}
              top="20%"
              color="primary"
              fontWeight="medium"
              fontSize="55px"
              textAlign="center"
              w="full"
              ml="7.5px"
            >
              <CountUp end={score} duration={1} />
              <br />
              <Box fontSize="lg" mt="-5">
                {remarks}
              </Box>
            </Box>
          ) : (
            <>
              <Box
                zIndex={2}
                position="absolute"
                top="29%"
                rounded="full"
                left="32.5%"
                transform="scale(2.18)"
              >
                <Spinner
                  w="20"
                  h="20"
                  color="secondary"
                  opacity={0.4}
                  borderWidth="1px"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
