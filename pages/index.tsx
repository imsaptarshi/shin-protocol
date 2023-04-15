import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, Flex, useTimeout, Image } from "@chakra-ui/react";
import Navbar from "@/components/navigation/navbar.component";
import { useEffect, useState } from "react";
import ScoreBar from "@/components/app/scoreBar.component";
import { useAddress } from "@thirdweb-dev/react";
import ScoreFactors from "@/components/app/scoreFactors.component";
import { SelectPicker } from "rsuite";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import Quests from "@/components/app/quests.component";

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    google: any;
    googleTranslateElementInit: any;
  }
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const languages = [
    { label: "English", value: "/en/en" },
    { label: `Japanese`, value: "/en/ja" },
  ];
  const [selected, setSelected] = useState<any>(languages[0].value);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,ja",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
    setIsLoaded(true);
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans"));
    } else {
      setSelected("/en/en");
    }
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState<any>(0);
  const address = useAddress();
  useEffect(() => {
    if (address) {
      setIsLoading(true);
      fetch("/api/score/" + address)
        .then((res) => res.json())
        .then((data) => {
          setScore(data.result);
          setIsLoading(false);
        });
    }
  }, [address]);

  return (
    <Box
      backgroundColor="background"
      minH="100vh"
      position="relative"
      className="main"
    >
      <Box px="14" py="10" maxW="1400px" mx="auto">
        <>
          <div id="google_translate_element" style={{ display: "none" }}></div>
        </>
        <Navbar
          translateToggle={
            <Button
              bg="#ECEDFF"
              border="1px solid #F9FAFF"
              rounded="full"
              w="fit-content"
              pr="6"
              color="#757ABD"
              fontWeight="medium"
              leftIcon={
                <Image src="/assets/japan.png" w="10" ml="-3" alt="japanese" />
              }
              onClick={() => {
                if (selected === "/en/en" || selected === "%2fen%2fen") {
                  if (hasCookie("googtrans")) {
                    setCookie("googtrans", "/en/ja");
                  } else {
                    setCookie("googtrans", "/en/ja");
                  }
                } else {
                  if (hasCookie("googtrans")) {
                    setCookie("googtrans", "/en/en");
                  } else {
                    setCookie("googtrans", "/en/en");
                  }
                }
                window.location.reload();
              }}
            >
              {selected === "/en/en" || selected === "%2fen%2fen"
                ? "日本"
                : "English"}
            </Button>
          }
        />
        {address && (
          <Box mt="10">
            <Flex experimental_spaceX="12">
              <ScoreBar score={Math.round(score * 100)} isLoading={isLoading} />
              <ScoreFactors />
            </Flex>
            <Box mt="6">
              <Quests />
            </Box>
          </Box>
        )}
      </Box>
      <div id="download-comp"></div>
    </Box>
  );
}
