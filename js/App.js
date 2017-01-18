import Exponent from 'exponent';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';

import theme from './themes/base-theme';
import cacheAssetsAsync from '../utilities/cacheAssetsAsync';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      appIsReady: true
    };
  }

  componentWillMount() {
        this._loadAssetsAsync();
    }

  async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                // images: [
                //     require('./assets/images/exponent-wordmark.png'),
                // ],
                fonts: [
                    // FontAwesome.font,
                    // {'Arial': require('../assets/fonts/Arial.ttf')},
                    // {'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf')},
                ],
            });
        } catch(e) {
            console.warn(
                'There was an error caching assets (see: main.js), perhaps due to a ' +
                'network timeout, so we skipped caching. Reload the app to try again.'
            );
            console.log(e.message);
        } finally {
            this.setState({appIsReady: true});
        }
    }

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={(c) => { this._modal = c; }}
              swipeToClose={false}
            >
              <View
                style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}
              >
                {this.state.showInstalling ?
                  <Text
                    style={{
                      color: theme.brandPrimary,
                      textAlign: 'center',
                      marginBottom: 15,
                      fontSize: 15,
                    }}
                  >
                    Installing update...
                  </Text> :
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 15,
                      }}
                    >
                    </Text>
                  </View>
                }
              </View>
            </Modal>
          </Content>
        </Container>
      );
    } else {
            if (this.state.appIsReady) {
                return(
                    <AppNavigator store={this.props.store} />
                );
            } else {
                return (
                    <Exponent.Components.AppLoading />
                );
            }
    }


  }
}

export default App;
