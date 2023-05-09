import React from "react";
import App from "next/app";
import dynamic from "next/dynamic";
import { getDeviceType } from "src/utils";

const AppShell = dynamic(() => import("../components/AppShell"), {
  ssr: false,
});

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const userAgent = appContext.ctx.req.headers["user-agent"];
    const isMobile = getDeviceType(userAgent) === "mobile";
    return { ...appProps, isMobile };
  }

  render() {
    const { Component, pageProps, isMobile } = this.props;
    return (
      <AppShell isMobile={isMobile}>
        <Component {...pageProps} />
      </AppShell>
    );
  }
}

export default MyApp;
