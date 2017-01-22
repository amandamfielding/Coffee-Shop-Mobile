
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch'
  },
  bg: {
    flex: 2,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  logoImage: {
    alignSelf: "flex-end",
    marginBottom: 20,
    flex: 1,
    width: deviceWidth / 1.5 ,
        height: deviceHeight / 4,
    resizeMode: "contain",
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
    alignSelf: 'center'
  },
  feedback: {
    textAlign: "center",
    color: "white"
  },
  logoContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center"
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
    marginLeft: 15,
    fontFamily: 'veneer'
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
