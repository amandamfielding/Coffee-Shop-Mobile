import React, { Component } from 'react';
import { TouchableHighlight, View, ScrollView, ListView, Image } from 'react-native';
import { Font } from 'exponent';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, List, ListItem, Title, Content, Text, Button, Icon, Card, CardItem } from 'native-base';
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

  static propTypes = {
    setDrink: React.PropTypes.func,
  }

	constructor(props) {
		super(props);
	}

  goBack () {
    this.props.popRoute(this.props.navigation.key);
  }

	render() {
    let sizesAndPrices = [];
    this.props.drink.sizes.forEach(size => {
      sizesAndPrices.push([Object.keys(size)[0],Object.values(size)[0].price]);
    });
    console.log(sizesAndPrices);
		return (
			<Container style={styles.container}>
			<Header style={styles.header}>
          <Button transparent onPress={() => this.goBack()}>
            <Icon name='ios-arrow-back' style={{color:"#fff"}} />
          </Button>
          <Title style={styles.headerText}>{this.props.drink.title}</Title>
      </Header>
      <Content>
        <Image style={styles.itemImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coffee-shop-mobile.appspot.com/o/latte.jpg?alt=media&token=faee647b-3198-4214-bc24-35d4ab86974b"}} />
          <List dataArray={sizesAndPrices}
            renderRow={(item) =>

              <ListItem
                >
                <TouchableHighlight
                  underlayColor={'red'}
                  >
                  <View style={{ marginRight: 15, flex:1,flexDirection:"row",justifyContent:"space-between", paddingHorizontal: 10}}>
                    <Text style={{color:"white"}}>{item[0]}</Text>
                    <Text style={{color:"white"}}>${item[1]}</Text>
                  </View>
                  </TouchableHighlight>
              </ListItem>

            }>
          </List>
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
  drink: state.drink.drink
});

export default connect(mapStateToProps, bindAction)(Options);
