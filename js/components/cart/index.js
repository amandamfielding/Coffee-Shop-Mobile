import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Header, Title, Content, InputGroup, Input, Button, Icon, View, Text, Card, CardItem, Thumbnail } from 'native-base';
import styles from "./styles";
import firebaseApp from '../auth/authentication';

import { connect } from 'react-redux';
import navigateTo from '../../actions/sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';

const {
  reset,
  pushRoute,
  popRoute
} = actions;

class Cart extends Component {

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
    this.state = ({
      points: ""
    });
  }

  goBack() {
    this.props.popRoute(this.props.navigation.key);
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Container style={styles.flexContainer}>
        <Content padder style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.points}>{this.state.points} points</Text>
          <Card foregroundColor="#000" style={styles.card} >
            <CardItem >
              <View style={styles.cardTop}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text style={styles.descText}>
                    Wool Blend Coat {'\n'}Long Cashmere Trench
                  </Text>
                  <Text style={styles.rateText}>INR 400</Text>
                </View>
                <Icon name="ios-close" style={styles.closeIcon} />
              </View>
              <View style={styles.bottomDesc}>
                <View style={styles.counterContainer}>
                  <Icon name="ios-add-circle-outline" style={styles.counterIcon} />
                  <Text style={styles.counterText}>1</Text>
                  <Icon name="ios-remove-circle-outline" style={styles.counterIcon} />
                </View>
                <Text style={{ color: myTheme.brandPrimary }}>Show Details</Text>
              </View>
            </CardItem>
          </Card>
          <Card foregroundColor="#000" style={styles.card}>
            <CardItem >
              <View style={styles.cardTop}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text style={styles.descText}>
                    Party wear Gown {'\n'}Smooth Satin Material
                  </Text>
                  <Text style={styles.rateText}>INR 610</Text>
                </View>
                <Icon name="ios-close" style={styles.closeIcon} />
              </View>
              <View style={styles.bottomDesc}>
                <View style={styles.counterContainer}>
                  <Icon name="ios-add-circle-outline" style={styles.counterIcon} />
                  <Text style={styles.counterText}>1</Text>
                  <Icon name="ios-remove-circle-outline" style={styles.counterIcon} />
                </View>
                <Text style={{ color: myTheme.brandPrimary }}>Show Details</Text>
              </View>
            </CardItem>
          </Card>
          <Card foregroundColor="#000" style={styles.card}>
            <CardItem >
              <View style={styles.cardTop}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text style={styles.descText}>
                    Wool Blend Coat {'\n'}Long Cashmere Trench
                  </Text>
                  <Text style={styles.rateText}>INR 700</Text>
                </View>
                <Icon name="ios-close" style={styles.closeIcon} />
              </View>
              <View style={styles.bottomDesc}>
                <View style={styles.counterContainer}>
                  <Icon name="ios-add-circle-outline" style={styles.counterIcon} />
                  <Text style={styles.counterText}>1</Text>
                  <Icon name="ios-remove-circle-outline" style={styles.counterIcon} />
                </View>
                <Text style={{ color: myTheme.brandPrimary }}>Show Details</Text>
              </View>
            </CardItem>
          </Card>

          <Button
            primary
            block
            textStyle={{ color: myTheme.textColor }}
            onPress={() => this.navigateTo('payment')}
          >
              Check Out
          </Button>
        </Content>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Cart);
