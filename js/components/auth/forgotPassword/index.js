import React from "react";
import { connect } from 'react-redux';
import { Font } from 'exponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Image, Alert } from "react-native";
import { Container, Header, Title, Button, Content, View, Text, Input, InputGroup, Icon } from "native-base";
import { actions } from 'react-native-navigation-redux-helpers';
import styles from "./styles";
import Exponent from 'exponent';
import { firebaseApp } from "../authentication";

const {
  popRoute
} = actions;

class ForgotPassword extends React.Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
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
      email: "",
      fontLoaded: false
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

  goBack () {
    this.props.popRoute(this.props.navigation.key);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'veneer': require('../../../../assets/fonts/veneer.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {return null;}
    const reset = this.state.fontLoaded ? "Send Reset Email" : null;
    return (
      <Image source={require('../../../../images/beans2.jpg')} style={styles.container}>
      <Header style={styles.header}>
          <Button transparent onPress={this.goBack.bind(this)}>
            <Icon name='ios-arrow-back' style={{color:"#fff"}} />
          </Button>
          <Title style={styles.headerText}>Reset Password</Title>
        </Header>
        <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={{uri:'https://firebasestorage.googleapis.com/v0/b/coffee-shop-mobile.appspot.com/o/logofritzwhite.png?alt=media&token=1c9f80e9-53ca-42cd-82b9-e6ca72c25d6f'}} />
        </View>
        <View style={styles.buttonContainer}>
          <InputGroup style={styles.input}>
            <Icon name="ios-person" style={{ color:"white" }} />
            <Input
              style={styles.inputValue}
              placeholder="EMAIL"
              onChangeText={(text) => {this.setState({ email: text })}} />
          </InputGroup>
        </View>
        <View style={styles.linkContainer}>
          <Button transparent
            onPress={() => this.changePassword()}>
            <Text style={styles.links}>{reset}</Text>
          </Button>
        </View>
        </Image>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(ForgotPassword);
