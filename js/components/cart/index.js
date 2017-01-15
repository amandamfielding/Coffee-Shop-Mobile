import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Content, InputGroup, Input, Button, Icon, View, Text } from 'native-base';
import styles from "./styles";
import firebaseApp from '../auth/authentication';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';

const {
  reset,
  pushRoute,
} = actions;

class Cart extends Component {
  constructor() {
    super();
    this.state = ({
      points: ""
    });
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <Header navigator={this.props.navigator} />

        <Text style={styles.points}>{this.state.points} points</Text>
      </View>
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

export default connect(mapStateToProps, bindAction)(Cart);
