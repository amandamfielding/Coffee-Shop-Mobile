import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem } from 'native-base';
import { firebaseApp } from "../auth/authentication"

import { actions } from 'react-native-navigation-redux-helpers';
import { setIndex } from '../../actions/list';
import { closeDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'order');
  }

  signOut() {
    firebaseApp.auth().signOut()
      .then(() => {
        this.props.reset(this.props.navigation.key)
      }, (error) => {
        console.log(error)
      })
    this.props.closeDrawer();
  }

  render() {
    return (
      <Content theme={myTheme} style={styles.sidebar} >
        <List>
          <ListItem button onPress={() => this.navigateTo('order')} >
            <Text>Order</Text>
          </ListItem>
          <ListItem button onPress={() => this.navigateTo('locations')} >
            <Text>Locations</Text>
          </ListItem>
          <ListItem button onPress={() => this.navigateTo('cart')} >
            <Text>Cart</Text>
          </ListItem>
          <ListItem button onPress={() => this.signOut()} >
            <Text>Sign Out</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
