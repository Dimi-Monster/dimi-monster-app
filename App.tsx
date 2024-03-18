import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import React from 'react';

export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    delay_splash();
    return (
      <SafeAreaView style={[styles.container]}>
      <WebView
        onLoadEnd={() => SplashScreen.hideAsync()}
        source={{ 
          uri: "https://dimi.monster",
          injectedJavaScript: `let meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); document.getElementsByTagName('head')[0].appendChild(meta);`
        }}
        userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
      />
    </SafeAreaView>
    );
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
