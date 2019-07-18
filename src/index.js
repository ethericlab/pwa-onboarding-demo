import React from "react";
import ReactDOM from "react-dom";
import { PageView } from "./components/PageView/PageView";
import { Page, Image, Title, Text } from "./components/Page/Page";

import explore from "./explore.png";
import make from "./make.png";
import share from "./share.png";
import "./styles.scss";
import { Spacer } from "./components/Spacer";

// In mobile browsers 100vh can include browser UI elements, which we want to avoid for a good UX.
// The following code re-computes 1vh for mobile browsers, excluding browser UI.
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () => {
  return (
    <PageView>
      <Page color="hsla(208, 65%, 27%, 0.1)">
        <Image src={explore} alt={"Explore"} />
        <Spacer />
        <Title>Explore</Title>
        <Text>
          Explore limitless variations of your digital representation.
        </Text>
      </Page>

      <Page color="hsla(360, 71%, 64%, 0.1)">
        <Image src={make} alt={"Make"} />
        <Spacer />
        <Title>Make</Title>
        <Text>
          Create an emoji and stickers which describe your personality.
        </Text>
      </Page>

      <Page color="hsla(162, 48%, 40%, 0.1)">
        <Image src={share} alt={"Share"} />
        <Spacer />
        <Title>Share</Title>
        <Text>Share it in your favorite social networks or in iMessage.</Text>
      </Page>
    </PageView>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").then(
      registration => {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      err => {
        // registration failed
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
