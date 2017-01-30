'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View, StyleSheet, PanResponder, Animated, TouchableOpacity,Platform} from 'react-native'
import { actions } from 'react-native-navigation-redux-helpers'
import { Container ,Content , Text, Card, CardItem, DeckSwiper, Thumbnail, Grid ,Row, Icon,Button} from 'native-base';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
import styles from './styles';

class News extends Component {
  static propTypes = {
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

  render() {
    return (
      <Container style={styles.wrapper}>
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(News)
