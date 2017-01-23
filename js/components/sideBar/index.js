import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image} from 'react-native';
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
    this.props.navigateTo(route, 'home');
  }

  goToOrder() {
    this.props.pushRoute({ key: 'order', index: 1 }, this.props.navigation.key);
    this.props.closeDrawer();
  }

  goToLocations() {
    this.props.pushRoute({ key: 'locations', index: 1 }, this.props.navigation.key);
    this.props.closeDrawer();
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

    const user = firebaseApp.auth().currentUser;
    let pic;
    if (user != null) {
      pic = user.photoURL
    }
    let profilePic = (user && pic) ? (<Image style={styles.profilePic} source={{uri: firebaseApp.auth().currentUser.photoURL}}/>) : (<Image style={styles.profilePic} source={require('../../../images/profilePicDefault.png')}/>)

    return (
      <Content style={styles.sidebar} >
        {profilePic}
        <List style={styles.list}>
          <ListItem style={styles.listItem} button onPress={this.goToOrder.bind(this)} >
            <Text style={styles.itemText} >Place An Order</Text>
          </ListItem>
          <ListItem style={styles.listItem} button onPress={this.goToLocations.bind(this)} >
            <Text style={styles.itemText}>Locations</Text>
          </ListItem>
          <ListItem style={styles.listItem} button onPress={() => this.signOut()} >
            <Text style={styles.itemText}>Sign Out</Text>
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
    reset: key => dispatch(reset([{ key: 'logIn' }], key, 0)),
    closeDrawer: () => dispatch(closeDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
