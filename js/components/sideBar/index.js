import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { Content, Text, List, ListItem, ProgressBar } from 'native-base';
import { firebaseApp } from "../auth/authentication";
import { Font } from 'exponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { actions } from 'react-native-navigation-redux-helpers';
import { setIndex } from '../../actions/list';
import { closeDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import Exponent from 'exponent';

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
    super(props);
    this.state = {
      fontLoaded: false,
      progress: 30
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  goToNews() {
    this.props.pushRoute({ key: 'news', index: 1 }, this.props.navigation.key);
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

  async componentDidMount() {
    await Font.loadAsync({
      'veneer': require('../../../assets/fonts/veneer.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {return null;}
    const news = this.state.fontLoaded ? "What's new?" : null;
    const locations = this.state.fontLoaded ? "Find A Store" : null;
    const signout = this.state.fontLoaded ? "Sign Out" : null;
    let pic;
    let name = "";
    if (firebaseApp.auth().currentUser != null && this.props.user.picture != null) {
      pic = this.props.user.picture.data.url
      name = firebaseApp.auth().currentUser.displayName
    }

    let profilePic = (pic != null) ? (<Image style={styles.profilePic} source={{uri: this.props.user.picture.data.url}}/>) : (<Image style={styles.profilePic} source={require('../../../images/profilePicDefault.png')}/>)

    return (
      <Content style={styles.sidebar} >
        <View style={styles.profile}>
          {profilePic}
          <Text style={{color:"white", alignSelf: "center", fontFamily: "veneer", fontSize: 24, paddingTop: 12 }}>{name}</Text>
        </View>

        <List style={styles.list}>
          <ListItem style={styles.listItem} button onPress={this.goToNews.bind(this)} >
            <Text style={styles.itemText} >{news}</Text>
          </ListItem>
          <ListItem style={styles.listItem} button onPress={this.goToLocations.bind(this)} >
            <Text style={styles.itemText}>{locations}</Text>
          </ListItem>
          <ListItem style={styles.listItem} button onPress={() => this.signOut()} >
            <Text style={styles.itemText}>{signout}</Text>
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
  user: state.user.user
});

export default connect(mapStateToProps, bindAction)(SideBar);
