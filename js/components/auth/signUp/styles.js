
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 2.1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  inputValue: {
    color: "white"
  },
  btn: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  feedback: {
    textAlign: "center",
    color: "white"
  },
  linkContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  links: {
    color: "white",
  }
});
