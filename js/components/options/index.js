import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Image } from 'react-native';
import { Font } from 'exponent';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, View, Title, Content, Text, Button, Icon, Card, CardItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  reset,
  pushRoute,
  popRoute
} = actions;

class Options extends Component {

	constructor(props) {
		super(props);
	}

  goBack () {
    this.props.popRoute(this.props.navigation.key);
  }

	render() {
		return (
			<Container style={styles.container}>
			<Header style={styles.header}>
          <Button transparent onPress={() => this.goBack()}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title style={styles.headerText}>Drink Title</Title>
          <Button transparent onPress={this.props.openDrawer}>
              <Icon name='ios-menu' />
          </Button>
      </Header>
      <Content>
      <Image style={styles.itemImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coffee-shop-mobile.appspot.com/o/latte.jpg?alt=media&token=faee647b-3198-4214-bc24-35d4ab86974b"}} />
      </Content>
      </Container>
		);
	}
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Options);
