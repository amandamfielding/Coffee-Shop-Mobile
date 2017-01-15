import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Text, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import * as firebase from "firebase";
import { firebaseApp } from "../authentication";

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

  replaceRoute(route) {
    this.props.replaceAt('logIn', { key: route, index: 0 }, this.props.navigation.key);
  }

  constructor(props) {
    super(props);
    this.state = ({
      email: "",
      password: "",
      result: ""
    });
  }

  componentDidMount() {
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
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
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

              </View>
            </Image>
          </Content>
        </View>
      </Container>
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
