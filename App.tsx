// import * as SplashScreen from "expo-splash-screen";
// import { SafeAreaView } from "react-native";
// import { WebView, WebViewNavigation } from "react-native-webview";

// // export default class App extends React.Component {
// //   constructor(props: {}) {
// //     super(props);
// //   }
// //   render() {
// //     delay_splash();
// //     return (
// //       <SafeAreaView style={[styles.container]}>
// //       <WebView
// //         onLoadEnd={() => SplashScreen.hideAsync()}
// //         source={{ 
// //           uri: "https://dimi.monster",
// //         }}
// //         userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
// //       />
// //     </SafeAreaView>
// //     );
// //   }
// // }

// // async function delay_splash() {
// //   await SplashScreen.preventAutoHideAsync();
// // }



import * as SplashScreen from "expo-splash-screen";

import React, { useEffect, useState, useRef } from "react";
import {
  BackHandler,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { StatusBar } from 'expo-status-bar';

import { WebView, WebViewNavigation } from "react-native-webview";

async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default function App() {
   
    const webview = useRef<WebView>(null)
    
    const [backButtonEnabled, setBackButtonEnabled] = useState(false)
    // const [forceWait, setForceWait] = useState(true)

    // Webview content loaded
    function webViewLoaded() {
      setBackButtonEnabled(true);
    };
   
    // Webview navigation state change
    function onNavigationStateChange(navState: WebViewNavigation) {
      setBackButtonEnabled(navState.canGoBack)
      SplashScreen.hideAsync();
    };
   
    useEffect(() => {
      // Handle back event
      function backHandler() {
        if (backButtonEnabled) {
          if (webview.current) {
            webview.current.goBack();
          }
          return true;
        }
      };
      // Subscribe to back state vent
      BackHandler.addEventListener("hardwareBackPress", backHandler);
   
      // Unsubscribe
      return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
    }, [backButtonEnabled])

    delay_splash();
    return (
      <SafeAreaView
        style={[styles.container]}
      >
        <StatusBar style="auto"/>

          <WebView
            ref={webview}
            javaScriptEnabled={true}
            onNavigationStateChange={onNavigationStateChange}
            onLoadEnd={webViewLoaded}
            source={{ uri: "https://dimi.monster" }}
            userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
          />
        
       </SafeAreaView>
    );
  }