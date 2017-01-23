'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, Dimensions } from 'react-native';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import { actions } from 'react-native-navigation-redux-helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Icon, Button, Tabs } from 'native-base';
import Cart from '../cart';
import News from '../news';
import Spinner from '../loaders/Spinner';
import CustomTabBar from './tabBar';
import { openDrawer } from '../../actions/drawer';

const { width, height }=Dimensions.get('window');

class Home extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props){
    super(props);
    this.state = {
      page:'md-flame',
      show: false
    };
  }

  componentWillMount () {
    const navigator = this.props.navigator;
  }

  componentDidMount() {
    setTimeout(() => {this.setState({show: true});}, 1000);
  }

  navigateTo (el) {
    console.log(el.props.name);
    this.setState({page: el.props.name});
  }

  open() {
    this.props.openDrawer()
  }

  render() {
    if(!this.state.show) {
      return (
        <View style={{flex: 1}}>
          <Spinner color='#E7B220' style={{top: height/2.2}} />
        </View>
      );
    }
    else {
      return (
        <Tabs
          locked={true}
          initialPage={0}
          style={{backgroundColor: '#F5F7FB'}}
          renderTabBar={() => <CustomTabBar open={this.open.bind(this)}/>}
          >
          <News tabLabel="md-flame" />
          <Cart tabLabel="md-chatboxes" />
        </Tabs>
      );
    }
  }
}

  function bindActions(dispatch){
      return {
          openDrawer: () => dispatch(openDrawer()),
          replaceRoute:(route)=>dispatch(replaceRoute(route)),
          pushNewRoute:(route)=>dispatch(pushNewRoute(route))
      };
  }

  const mapStateToProps = state => ({
    navigation: state.cardNavigation,
  });

export default connect(mapStateToProps,bindActions)(Home);
