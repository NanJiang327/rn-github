import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

import CodePush from 'react-native-code-push';
import NavButton from '../components/NavButton';
import NavigationBar from '../components/NavigationBar';
import SafeAreaViewPlus from '../components/StyledSafeView';
import { GlobalStyles } from '../constants';

let App = ({ navigation }) => {
  const [restartAllowed, setRestartAllowed] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);
  const [progress, setProgress] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  function codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('Checking for update.');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage('Downloading package.');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('Awaiting user action.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage('Installing update.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setSyncMessage('App up to date.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('Update cancelled by user.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage('Update installed and will be applied on restart.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('An unknown error occurred.');
        setProgress(false);
        break;
    }
  }

  function codePushDownloadDidProgress(isProgress) {
    setProgress(isProgress);
    setSyncMessage('');
  }

  function toggleAllowRestart() {
    restartAllowed ? CodePush.disallowRestart() : CodePush.allowRestart();
    setRestartAllowed(!restartAllowed);
  }

  function getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      (metadata: LocalPackage) => {
        setSyncMessage(
          metadata ? JSON.stringify(metadata) : 'Running binary version'
        );
        setProgress(false);
      },
      (error: any) => {
        setSyncMessage('Error: ' + error);
        setProgress(false);
      }
    );
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  function sync() {
    CodePush.sync({}, codePushStatusDidChange, codePushDownloadDidProgress);
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  function syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
      codePushStatusDidChange,
      codePushDownloadDidProgress
    );
  }

  return (
    <SafeAreaViewPlus
      style={GlobalStyles.root_container}
      head
      headColor={theme}
    >
      <NavigationBar
        style={theme}
        leftButton={
          <NavButton
            style={styles.leftButton}
            color="#fff"
            name="ios-arrow-back"
            onPress={() => navigation.goBack()}
            size={24}
          />
        }
        title={'Code push page'}
      />
      <Text style={styles.welcome}>Welcome to CodePush!</Text>
      <TouchableOpacity onPress={sync}>
        <Text style={styles.syncButton}>Press for background sync</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={syncImmediate}>
        <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
      </TouchableOpacity>
      {progress ? (
        <Text style={styles.messages}>
          {progress.receivedBytes} of {progress.totalBytes} bytes received
        </Text>
      ) : null}
      <TouchableOpacity onPress={toggleAllowRestart}>
        <Text style={styles.restartToggleButton}>
          Restart {restartAllowed ? 'allowed' : 'forbidden'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getUpdateMetadata}>
        <Text style={styles.syncButton}>Press for Update Metadata</Text>
      </TouchableOpacity>
      <Text style={styles.messages}>{syncMessage || ''}</Text>
    </SafeAreaViewPlus>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    margin: 30,
    width: Dimensions.get('window').width - 100,
    height: (365 * (Dimensions.get('window').width - 100)) / 651,
  },
  messages: {
    marginTop: 30,
    textAlign: 'center',
  },
  restartToggleButton: {
    color: 'blue',
    fontSize: 17,
  },
  syncButton: {
    color: 'green',
    fontSize: 17,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

App = CodePush(codePushOptions)(App);

export default App;
