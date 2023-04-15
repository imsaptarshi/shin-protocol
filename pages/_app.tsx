import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import config from "../utils/helpers/config";
import NetworkWrapper from "../components/wrappers/networkWrapper.component";
import Head from "next/head";
import { Mumbai } from "@thirdweb-dev/chains";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export default function App({ Component, pageProps }: AppProps) {
  const supportedChainIds = [config.chain];

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>
      <ThirdwebProvider
        supportedWallets={[metamaskWallet()]}
        activeChain={"mumbai"}
        dAppMeta={{
          name: config.title,
          description: "to-do",
          isDarkMode: true,
          logoUrl: "/assets/logo.svg",
          url: "https://example.com",
        }}
      >
        <ChakraProvider theme={theme}>
          <NetworkWrapper>
            <Component {...pageProps} />
          </NetworkWrapper>
        </ChakraProvider>
      </ThirdwebProvider>
    </>
  );
}
