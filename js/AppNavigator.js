import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { closeDrawer } from './actions/drawer';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';
import LogIn from './components/auth/logIn/';
import SignUp from './components/auth/signUp/';
import ForgotPassword from './components/auth/forgotPassword';
import Order from './components/order/';
import Options from './components/options/';
import Cart from './components/cart/';
import News from './components/news/';
import Locations from './components/locations/';
import Payment from './components/payment';
import Home from './components/home';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
  // StateUtils: NavigationStateUtils,
} = NavigationExperimental;


class AppNavigator extends Component {
  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'order' || routes[routes.length - 1].key === 'logIn') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) {
    switch (props.scene.route.key) {
      case 'home':
        return <Home />
      case 'splashscreen':
        return <SplashPage />;
      case 'logIn':
        return <LogIn />;
      case 'signUp':
        return <SignUp />;
      case 'forgotPassword':
        return <ForgotPassword />;
      case 'order':
        return <Order />;
      case 'news':
        return <News />;
      case 'locations':
        return <Locations />;
      case 'cart':
        return <Cart />;
      case 'payment':
        return <Payment />;
      case 'options':
        return <Options />;
      default :
        return <LogIn />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
