import React from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import { setIndex } from '../../actions/list';

import { firebaseApp } from "../auth/authentication";
import styles from "./styles";

const {
  replaceAt
} = actions;

const {
  reset,
  pushRoute,
} = actions;

class Head extends React.Component {
  signOut() {
    firebaseApp.auth().signOut()
      .then(() => {
        this.props.navigator.popToTop();
      }, (error) => {
        console.log(error);
      });
  }

  replaceRoute(route) {
    // this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container>
        <Content style={styles.header}>
          <TouchableOpacity
            onPress={() => this.replaceRoute('order')}
            >Order
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.replaceRoute('locations')}
          >Locations
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.replaceRoute('cart')}
          >Cart
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.signOut()}
          >Sign Out
          </TouchableOpacity>

        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Head);
