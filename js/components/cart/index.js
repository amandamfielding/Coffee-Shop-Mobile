import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Header, Title, Content, InputGroup, Input, Button, Icon, View, Text } from 'native-base';
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

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = ({
      points: ""
    });
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <Header sytle={styles.header}>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>Cart</Title>
          <Button transparent onPress={this.props.openDrawer}>
              <Icon name='ios-menu' />
          </Button>
        </Header>

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
  name: state.user.email,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Cart);
