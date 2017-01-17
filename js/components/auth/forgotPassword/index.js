import React from "react";
import { connect } from 'react-redux';
import { TouchableOpacity } from "react-native";
import { Container, Content, View, Text, Input, InputGroup, Icon } from "native-base";
import { actions } from 'react-native-navigation-redux-helpers';
import styles from "./styles";
import { firebaseApp } from "../authentication";

const {
  replaceAt
} = actions;

class ForgotPassword extends React.Component {

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
    this.state = {
      email: ""
    };
  }

  changePassword() {
    firebaseApp.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ result: "Password reset sent successfully." });
      }, (error) => {
        this.setState({ result: error.message });
      });
  }

  replaceRoute(route) {
    this.props.replaceAt('forgotPassword', { key: route, index: 0 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.bg}>
            <Text style={styles.feedback}>{this.state.result}</Text>
            <InputGroup style={styles.input}>
              <Icon name="ios-person" />
              <Input
                style={styles.inputValue}
                placeholder="EMAIL"
                onChangeText={(text) => {this.setState({ email: text })}} />
            </InputGroup>
            <View style={styles.links}>
              <TouchableOpacity
                onPress={() => this.replaceRoute('login')}
              >
                <Text style={styles.link}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changePassword()}
              >
                <Text style={styles.link}>Send Reset Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
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

export default connect(mapStateToProps, bindActions)(ForgotPassword);
