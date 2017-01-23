import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Text, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import * as firebase from "firebase";
import { firebaseApp } from "../authentication";

import styles from './styles';

const {
  popRoute,
  pushRoute
} = actions;

const background = require('../../../../images/beans2.jpg');

class SignUp extends Component {

  static propTypes = {
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
      result: ""
    });
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.pushToRoute('order');
      }
    });
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
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.goBack.bind(this)}>
            <Icon name="ios-arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
          </Button>
          <Title>Sign Up</Title>
        </Header>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Text style={styles.feedback}>{this.state.result}</Text>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input
                    style={styles.inputValue}
                    placeholder="EMAIL"
                    onChangeText={(text) => this.setState({ email: text })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    style={styles.inputValue}
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    style={styles.inputValue}
                    placeholder="CONFIRM PASSWORD"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                  />
                </InputGroup>
                <Button style={styles.btn} onPress={() => this.signUp()}>
                  <Text>Login</Text>
                </Button>
                <View style={styles.linkContainer}>
                  <Button transparent
                    onPress={() => {this.replaceRoute('logIn');}}>
                    <Text style={styles.links}>Already a member? Log In</Text>
                  </Button>
                </View>
              </View>
            </Image>
          </Content>
      </Container>
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
