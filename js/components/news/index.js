'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View, StyleSheet, PanResponder, Animated, TouchableOpacity,Platform} from 'react-native'
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { Container, Header, Title, Content , Text, Card, CardItem, DeckSwiper, Thumbnail, Grid ,Row, Icon, Button} from 'native-base';
import styles from './styles';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

const {
  reset,
  pushRoute,
  popRoute
} = actions;

class News extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props){
    super(props);
  }

   componentWillMount () {
      var navigator = this.props.navigator;
  }

  goBack () {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.wrapper}>
        <Header style={styles.header}>
          <Button transparent onPress={() => {
              this.goBack();
              this.props.openDrawer();
            }}>
            <Icon name='ios-arrow-back' style={{color:"#fff"}} />
          </Button>
          <Title style={styles.headerText}>Coffee Shop News</Title>
        </Header>
        <Content>
          <Text>news</Text>
        </Content>
      </Container>

    );
  }
}

function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(News)
