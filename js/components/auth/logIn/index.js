import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Font } from 'exponent';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Text, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import * as firebase from "firebase";
import { firebaseApp } from "../authentication";
import Exponent from 'exponent';

import { setUser } from '../../../actions/user';
import styles from './styles';

const {
  replaceAt,
  pushRoute
} = actions;

const background = require('../../../../images/beans2.jpg');

class Login extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = ({
      email: "",
      password: "",
      result: "",
      FBloggedIn: false,
      fontLoaded: false
    });
  }

  async FBlogIn() {
    const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
      '1831068953774364', {
        permissions: ['public_profile', 'email', 'user_friends'],
      });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(() => {this.setState({FBloggedIn: true})})
        .catch((error) => {
          alert("error");
      });
      const response = await fetch(`https://graph.facebook.com/me?fields=gender,name,locale,age_range,first_name,picture.width(200).height(200),link,cover&access_token=${token}`);
      const user = await response.json();
      this.props.setUser(user)
      Alert.alert(
        'Logged in!',
        `Hi ${user.name}!`,
      );

    }
  }

  pushToRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  replaceRoute(route) {
    this.props.replaceAt('logIn', { key: route }, this.props.navigation.key);
  }

  componentDidUpdate() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.replaceRoute('home');
      }
    });
  }

  logIn() {
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.setState({ result: error.message });
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'veneer': require('../../../../assets/fonts/veneer.ttf'),
    });
    this.setState({ fontLoaded: true });
  }


  render() {
    if (!this.state.fontLoaded) {return null;}
    const fb = this.state.fontLoaded ? "Sign in with Facebook" : null;
    const login = this.state.fontLoaded ? "Login" : null;
    const signup = this.state.fontLoaded ? "Sign Up" : null;
    const forgot = this.state.fontLoaded ? "Forgot Password?" : null;
    return (
      <Image source={require('../../../../images/beans2.jpg')} style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={{uri:'https://firebasestorage.googleapis.com/v0/b/coffee-shop-mobile.appspot.com/o/logofritzwhite.png?alt=media&token=1c9f80e9-53ca-42cd-82b9-e6ca72c25d6f'}} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => {this.FBlogIn()}} style={styles.FBbutton}>
              <View style={styles.FBflex}>
                <Text style={styles.FBtext}>{fb}</Text>
                <FontAwesome name="facebook-f" size={24} color="#ffffff" />
              </View>
          </Button>
          <Text style={styles.feedback}>{this.state.result}</Text>
          <InputGroup style={styles.input}>
            <Icon name="ios-person" style={{ color:"white" }} />
            <Input
              style={styles.inputValue}
              placeholder="EMAIL"
              onChangeText={(text) => {this.setState({ email: text })}} />
          </InputGroup>
          <InputGroup style={styles.input}>
            <Icon name="ios-unlock-outline" style={{ color:"white" }}/>
            <Input
              style={styles.inputValue}
              placeholder="PASSWORD"
              secureTextEntry
              onChangeText={(text) => {this.setState({ password: text })}}
            />
          </InputGroup>
          <Button style={styles.loginBtn} onPress={() => {this.logIn()}}>
            <Text style={styles.btnText}>{login}</Text>
          </Button>
        </View>
        <View style={styles.linkContainer}>
            <Button transparent
              onPress={() => {this.pushToRoute('signUp');}}>
              <Text style={styles.links}>{signup}</Text>
            </Button>
            <Button transparent
              onPress={() => {this.pushToRoute('forgotPassword');}}>
              <Text style={styles.links}>{forgot}</Text>
            </Button>
          </View>
      </Image>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setUser: token => dispatch(setUser(token)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
