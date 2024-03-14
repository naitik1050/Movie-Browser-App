import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AppNavigation} from './navigators';
import {navigationRef, isReadyRef} from './navigators';
import ErrorBoundary from './components/ErrorBoundary ';
import styles from './helper/styles';

LogBox.ignoreAllLogs();

const Root = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ErrorBoundary>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <AppNavigation />
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaView>
  </SafeAreaProvider>
);

export default Root;
