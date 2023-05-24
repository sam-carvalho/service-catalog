import React from "react";
import App from "next/app";
import dynamic from "next/dynamic";
import { getDeviceType } from "src/utils";
import { ThemeProvider } from "@mui/material/styles";
import { Global } from "@emotion/react";
import theme from "../styles/theme";
import globalStyles from "../styles/globalStyles";
import { PinnedServicesProvider } from "../context/PinnedServices/PinnedServicesProvider";

const AppShell = dynamic(() => import("../components/AppShell"), {
  ssr: false,
});

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const userAgent = appContext.ctx.req?.headers?.["user-agent"];
    const isMobile = getDeviceType(userAgent) === "mobile";
    return { ...appProps, isMobile };
  }

  render() {
    const { Component, pageProps, isMobile } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <PinnedServicesProvider>
          <AppShell isMobile={isMobile}>
            <Component {...pageProps} />
          </AppShell>
        </PinnedServicesProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
