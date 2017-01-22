import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Font } from 'exponent';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Text, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import * as firebase from "firebase";
import { firebaseApp } from "../authentication";
import Exponent from 'exponent';

// import { setUser } from '../../actions/user';
import styles from './styles';

const {
  replaceAt
} = actions;

const background = require('../../../../images/beans2.jpg');

class Login extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  async componentDidMount() {
    await Font.loadAsync({
      'veneer': require('../../../../assets/fonts/veneer.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  replaceRoute(route) {
    this.props.replaceAt('logIn', { key: route, index: 0 }, this.props.navigation.key);
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
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(() => {this.setState({FBloggedIn: true})})
        .catch((error) => {
          alert("error");
      });
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );

    }
  }

  componentWillUpdate() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.replaceRoute('order');
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


  render() {
    if (!this.state.fontLoaded) {return null;}
    return (
      <Image source={require('../../../../images/beans2.jpg')} style={styles.container}>
          <Content>
              <View style={styles.logoContainer}>
              <Image
                style={styles.logoImage}
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/coffee-shop-mobile.appspot.com/o/logofritzwhite.png?alt=media&token=1c9f80e9-53ca-42cd-82b9-e6ca72c25d6f'}} />
              </View>
              <View style={styles.buttonContainer}>
                <Button style={styles.GPbutton}>
                  <View style={styles.GPflex}>
                    <Text style={styles.GPtext}>Sign in with Google</Text>
                    <Image style={styles.GPimage} source={{uri:"http://www.iconsdb.com/icons/preview/white/google-plus-xxl.png"}} />
                  </View>
                </Button>
                  <Button onPress={() => {this.FBlogIn()}} style={styles.FBbutton}>
                    <View style={styles.FBflex}>
                    
                      <Text style={styles.FBtext}>this.state.fontLoaded ? (
                        Sign in with Facebook
                        ) : null
                    </Text>
                      <Image style={styles.FBimage} source={{uri:"http://icons.iconarchive.com/icons/danleech/simple/512/facebook-icon.png"}} />
                    </View>
                </Button>
                <Text style={styles.feedback}>{this.state.result}</Text>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input
                    style={styles.inputValue}
                    placeholder="EMAIL"
                    onChangeText={(text) => {this.setState({ email: text })}} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    style={styles.inputValue}
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={(text) => {this.setState({ password: text })}}
                  />
                </InputGroup>
                <Button style={styles.btn} onPress={() => {this.logIn()}}>
                  <Text>Login</Text>
                </Button>
                </View>
                <View style={styles.linkContainer}>
                  <Button transparent
                    onPress={() => {this.replaceRoute('signUp');}}>
                    <Text style={styles.links}>Sign Up</Text>
                  </Button>
                  <Button transparent
                    onPress={() => {this.replaceRoute('forgotPassword');}}>
                    <Text style={styles.links}>Forgot Password?</Text>
                  </Button>
                </View>
          </Content>
      </Image>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
