const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  feedback: {
    textAlign: "center",
    color: "white"
  },
  container: {
  backgroundColor: "black",
  flex: 1,
  justifyContent: "center"
},
  link: {
    color: "white"
  },
  links: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row"
  },
  input: {
    marginBottom: 20
  },
  inputValue: {
    color: "white"
  },

});
