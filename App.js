import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, ToastAndroid, PermissionsAndroid } from 'react-native';
import * as RNFS from 'react-native-fs';
import moment from 'moment';

export default class App extends Component {
  state = {
    showDownloadBtn: true,
    showText: false
  }

  requestPermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read external storage');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  makeDownload = async () => {
    const timerBegin = moment().valueOf();
    this.requestPermission();
    downloadDir = RNFS.ExternalStorageDirectoryPath + '/Download/';
    url = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';

    downloadOptions = {
      fromUrl: url,
      toFile: downloadDir + 'downloadReactNative.pdf'
    }

    RNFS.downloadFile(downloadOptions).promise.then(res => {
      this.setState({
        showDownloadBtn: false,
        showText: true
      });
      const timerEnd = moment().valueOf();
      ToastAndroid.show('Finished in ' + (timerEnd - timerBegin) + 'ms', ToastAndroid.LONG);
    }).catch(err => {
      ToastAndroid.show(err.message + ' - ' + err.code, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showDownloadBtn &&
          <Button
          onPress={this.makeDownload}
            title="Make Download"
            color="#841584"
          />
        }

        {this.state.showText &&
          <Text>File downloaded successfully</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
