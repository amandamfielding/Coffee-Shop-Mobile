import React, { Component } from "react";
import { ListView } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import { locations } from "../auth/authentication";
import { Container, Header, Title, Content, InputGroup, Input, Button, Icon, View, Text } from 'native-base';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';

const {
  popRoute
} = actions;



const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Locations extends Component {

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
      dataSource: ds,
      currentRegion: {},
      region: {
        latitude: 37.893,
        longitude: -122.08,
        latitudeDelta: 0.22,
        longitudeDelta: 0.13
      }
    });
  }

  componentDidMount() {
    locations.on("value", (snap) => {
      const locationList = [];
      snap.forEach(item => {
        locationList.push({
          title: item.val().title,
          address: item.val().address,
          phone: item.val().phone,
          hours: item.val().hours
        });
      });
      this.setState({ dataSource: ds.cloneWithRows(locationList) });
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
       console.log(position);
        this.setState({ currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.22,
          longitudeDelta: 0.13
        } });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
       console.log(position);
      this.setState({ currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.16,
          longitudeDelta: 0.11
        } });
    });
  }

  // onRegionChange(currentRegion) {
  //   // this.setState({ currentRegion })
  // }

  goBack () {
    this.props.popRoute(this.props.navigation.key);
  }

  renderRow(rowData) {
    return (
    <View style={styles.location}>
      <Text style={styles.locationTitle}>{rowData.title}</Text>
      <Text>{rowData.address}</Text>
      <Text>{rowData.phone}</Text>
      <Text>{rowData.hours}</Text>
    </View>
  );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header sytle={styles.header}>
          <Button transparent onPress={() => this.goBack()}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>Locations</Title>
          <Button transparent onPress={this.props.openDrawer}>
              <Icon name='ios-menu' />
          </Button>
        </Header>
        <View
          style={styles.mapContainer}
        >
          <MapView
            style={styles.map}
            region={this.state.region}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            zoomEnabled={true}
          >
            <MapView.Marker
              coordinate={{
                latitude: 37.897735,
                longitude: -122.061793
              }}
              title="Walnut Creek Coffee Shop"
            />
            <MapView.Marker
              coordinate={{
                latitude: 37.890723,
                longitude: -122.120401
              }}
              title="Lafayette Coffee Shop"
            />
          </MapView>
        </View>
        <ListView
          style={styles.locations}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
    </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Locations);
