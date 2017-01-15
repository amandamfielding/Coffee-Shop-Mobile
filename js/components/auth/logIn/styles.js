
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
    marginTop: deviceHeight / 2.55,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20
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
  },
  FBimage: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  FBbutton: {
    width: 225,
    height: 50,
    borderColor: "#2d5073",
    backgroundColor: "#3b5998",
    marginBottom: 15,
    alignSelf: "center",
    position: "relative",
    borderRadius: 2,
    shadowColor: "gray",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  FBtext: {
    color: "white",
    alignSelf: "center",
    marginRight: 15,
    marginLeft: 15
  },
  FBflex: {
    flex: 1,
    flexDirection: "row",
  },
  GPimage: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  GPbutton: {
    width: 225,
    height: 50,
    borderColor: "#111",
    backgroundColor: "#222",
    marginBottom: 15,
    alignSelf: "center",
    position: "relative",
    borderRadius: 2,
    shadowColor: "gray",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  GPtext: {
    color: "white",
    alignSelf: "center",
    marginRight: 15,
    marginLeft: 15
  },
  GPflex: {
    flex: 1,
    flexDirection: "row",
  }
});
