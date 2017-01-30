
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    padding: 0,
    paddingTop: 30,
    backgroundColor: '#0b0909',
  },
  list: {
  	//marginLeft: 0,
    flex: 3,
    flexDirection: "column",
    //marginVertical: 15,
  },
  listItem: {
  	//marginLeft: 0,
  	//padding:9,
  	//paddingLeft: 9,
    width: deviceWidth / 1.5
  },
  itemText: {
  color:"#fff",
  //textAlign: "center",
  fontFamily: 'veneer',
  fontSize: 18,
  paddingTop: 12,
  },
  profile: {
    flex: 1,
    flexDirection: "column",
  },
  profilePic: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    borderRadius: 100
  }
});
