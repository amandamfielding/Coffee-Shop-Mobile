
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    padding: 0,
    paddingTop: 30,
    backgroundColor: '#0b0909',
  },
  list: {
  	marginLeft: 0,
  },
  listItem: {
  	marginLeft: 0,
  	padding:9,
  	paddingLeft: 9,
  },
  itemText: {
  color:"#fff",
  },
  profilePic: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center"
  }
});
