import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Linking } from "expo";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { BrowserResult } from "expo-web-browser/build/WebBrowser.types";
import { EventType } from "expo/build/Linking/Linking.types";

interface AppState {
  browserLaunched: boolean;
  result: BrowserResult;
  redirectData: any;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      browserLaunched: false,
      result: null,
      redirectData: null,
    };
  }

  componentDidMount() {
    Linking.getInitialURL().then((url: string) => {
      if (url) {
        console.log(`Initial url is ${url}`);
      }
    }).catch((err: any) => console.error("An error occurred", err));
  }

  handleOpen = () => {
    this.launchBrowser();
  }

  launchBrowser = async () => {
    this.setState({
      browserLaunched: true,
    });

    const { manifest } = Constants;
    const uri = `http://${manifest.debuggerHost.split(":").shift()}:3333`;

    try {
      this.addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(`${uri}/?returnUri=${Linking.makeUrl("return/path")}`);
      this.removeLinkingListener();
      this.setState({ result });
    } catch (error) {
      console.error(error);
    }
  }

  addLinkingListener = () => {
    Linking.addEventListener("url", this.handleRedirect);
  };

  removeLinkingListener = () => {
    Linking.removeEventListener("url", this.handleRedirect);
  };
  
  handleRedirect = (event: EventType) => {
    WebBrowser.dismissBrowser();
    let redirectData = Linking.parse(event.url);
    this.setState({ redirectData: redirectData || {} });
  };

  render() {
    const { browserLaunched, result, redirectData } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button title="Open browser" onPress={this.handleOpen} disabled={browserLaunched}></Button>
        </View>
        <View style={styles.container}>
            {result && <Text style={{ fontSize: 14 }}>{JSON.stringify(result)}</Text>}
            {redirectData && <Text style={{ fontSize: 14 }}>{JSON.stringify(redirectData)}</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
