import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Font } from 'exponent';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Title, Text, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import * as firebase from "firebase";
import { firebaseApp } from "../authentication";
import Exponent from 'exponent';

import styles from './styles';

const {
  popRoute,
  pushRoute
} = actions;

const background = require('../../../../images/beans2.jpg');

class SignUp extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = ({
      email: "",
      password: "",
      confirmPassword: "",
      result: "",
      fontLoaded: false
    });
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.pushToRoute('home');
      }
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'veneer': require('../../../../assets/fonts/veneer.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  pushToRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  goBack() {
    this.props.popRoute(this.props.navigation.key);
  }

  signUp() {
    if (this.state.password === this.state.confirmPassword) {
      const { email, password } = this.state;
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => this.setState({ result: error.message }));
    } else {
      this.setState({ result: "Password and confirmation password must match." });
    }
  }

  render() {
    if (!this.state.fontLoaded) {return null;}
    const signup = this.state.fontLoaded ? "Sign Up" : null;
    const login = this.state.fontLoaded ? "Already a member? Log In" : null;
    return (
      <Image source={require('../../../../images/beans2.jpg')} style={styles.container}>
        <Header style={styles.header}>
          <Button transparent onPress={this.goBack.bind(this)}>
            <Icon name='ios-arrow-back' style={{color:"#fff"}} />
          </Button>
          <Title style={styles.headerText}>Sign Up</Title>
        </Header>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={{uri:'https://firebasestorage.googleapis.com/v0/b/coffee-shop-mobile.appspot.com/o/logofritzwhite.png?alt=media&token=1c9f80e9-53ca-42cd-82b9-e6ca72c25d6f'}} />
        </View>
        <View style={styles.buttonContainer}>
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
          <InputGroup style={styles.input}>
            <Icon name="ios-unlock-outline" style={{ color:"white" }} />
            <Input
              style={styles.inputValue}
              placeholder="CONFIRM PASSWORD"
              secureTextEntry
              onChangeText={(text) => this.setState({ confirmPassword: text })}
            />
          </InputGroup>
          <Button style={styles.loginBtn} onPress={() => {this.logIn()}}>
            <Text style={styles.btnText}>{signup}</Text>
          </Button>
        </View>
        <View style={styles.linkContainer}>

          <Button transparent
            onPress={() => {this.replaceRoute('logIn');}}>
            <Text style={styles.links}>{login}</Text>
          </Button>
        </View>
      </Image>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    // setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(SignUp);
