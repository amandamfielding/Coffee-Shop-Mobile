
import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, View, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { coffee, tea, smoothies, juice, localFavorites } from "../auth/authentication"

const ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const ds3 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const ds4 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const ds5 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const {
  reset,
  pushRoute,
} = actions;

class Order extends Component {

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
    super(props)
    this.state = ({
      dataSource1: ds1,
      dataSource2: ds2,
      dataSource3: ds3,
      dataSource4: ds4,
      dataSource5: ds5
    })
  }

  componentDidMount() {
    coffee.on("value", (snap) => {
      const coffees = []
      snap.forEach(item => {
        coffees.push({
          title: item.val().title
        })
      })
      this.setState({ dataSource1: ds1.cloneWithRows(coffees) })
    })
    tea.on("value", (snap) => {
      const teas = []
      snap.forEach(item => {
        teas.push({
          title: item.val().title
        })
      })
      this.setState({ dataSource2: ds2.cloneWithRows(teas) })
    })
    localFavorites.on("value", (snap) => {
      const favorites = []
      snap.forEach(item => {
        favorites.push({
          title: item.val().title
        })
      })
      this.setState({ dataSource3: ds3.cloneWithRows(favorites) })
    })
    smoothies.on("value", (snap) => {
      const smoothiesList = []
      snap.forEach(item => {
        smoothiesList.push({
          title: item.val().title
        })
      })
      this.setState({ dataSource4: ds4.cloneWithRows(smoothiesList) })
    })
    juice.on("value", (snap) => {
      const juices = []
      snap.forEach(item => {
        juices.push({
          title: item.val().title
        })
      })
      this.setState({ dataSource5: ds5.cloneWithRows(juices) })
    })
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
          <Text style={styles.rowTitle}>{rowData.title}</Text>
      </View>
    )
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header sytle={styles.header}>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>Place an Order</Title>
          <Button transparent onPress={this.props.openDrawer}>
              <Icon name='ios-menu' />
          </Button>
        </Header>

        <View contentContainerStyle={{flex:1}}>
          <ScrollView>
            <Text style={styles.menuCategory}>Your Drinks</Text>
          <Text style={styles.menuCategory}>Local Favorites</Text>
            <ListView
              scrollEnabled={false}
              style={styles.list}
              enableEmptySections={true}
              dataSource={this.state.dataSource3}
              renderRow={(rowData) => this.renderRow(rowData)}
            />
          <Text style={styles.menuCategory}>Coffee</Text>
            <ListView
              scrollEnabled={false}
              style={styles.list}
              enableEmptySections={true}
              dataSource={this.state.dataSource1}
              renderRow={(rowData) => this.renderRow(rowData)}
            />
          <Text style={styles.menuCategory}>Tea</Text>
            <ListView
              scrollEnabled={false}
              style={styles.list}
              enableEmptySections={true}
              dataSource={this.state.dataSource2}
              renderRow={(rowData) => this.renderRow(rowData)}
            />
          <Text style={styles.menuCategory}>Smoothies</Text>
            <ListView
              scrollEnabled={false}
              style={styles.list}
              enableEmptySections={true}
              dataSource={this.state.dataSource4}
              renderRow={(rowData) => this.renderRow(rowData)}
            />
          <Text style={styles.menuCategory}>Juice</Text>
            <ListView
              scrollEnabled={false}
              style={styles.list}
              enableEmptySections={true}
              dataSource={this.state.dataSource5}
              renderRow={(rowData) => this.renderRow(rowData)}
            />

          </ScrollView>
          </View>

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
  };
}

const mapStateToProps = state => ({
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Order);
