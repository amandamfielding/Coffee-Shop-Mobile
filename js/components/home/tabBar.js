import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, TouchableOpacity, Image } from 'react-native';
import { Button, Icon, Header } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { openDrawer } from '../../actions/drawer';

const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  render() {
    return <View style={[styles.tabs, this.props.style ]}>
      <Button transparent onPress={() => this.props.open()} style={styles.tab}>
          <Icon name='ios-menu' style={{color:"#fff"}} />
      </Button>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
        <View style={[(tab === 'md-flame' && (this.props.activeTab === 1)) ? styles.iconBtn
          : styles.iconBtn,{backgroundColor: (tab === 'md-flame' && (this.props.activeTab === 1) )
          ? 'lightgrey'
          : (this.props.activeTab === i ? '#E7B220' : 'lightgrey')}]}>
          {( (tab === 'md-cart'))  ?
          <FontAwesome name="shopping-cart"
            style={{fontSize:24}}
             />
          :
          <FontAwesome name="coffee"
            style={{fontSize:24}}
             />
          }
          </View>
        </TouchableOpacity>;
      })}
    </View>;
  }
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  iconBtn: {
    backgroundColor: '#E7B220',
    width: 45,
    height: 45,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuBtn: {
    fontSize: 24,
  },
  tabs: {
    backgroundColor: '#000',
    height: (Platform.OS=='android') ? 55 : 70,
    flexDirection: 'row',
    paddingTop: (Platform.OS=='android') ? 15 : 30,
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
export default TabBar;
