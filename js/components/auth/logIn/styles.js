
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
  },
  logoImage: {
    alignSelf: "flex-end",
    width: deviceWidth / 1.5 ,
    height: deviceHeight / 3,
    resizeMode: "contain",
  },
  input: {
    marginBottom: 15,
    width: deviceWidth / 1.5,
  },
  inputValue: {
    color: "white",
    fontWeight: "600",
  },
  loginBtn: {
    marginVertical: 15,
    alignSelf: 'center',
    width: deviceWidth / 1.5,
    backgroundColor: "#E7B220",
    borderRadius: 0,
  },
  btnText: {
    color: "white",
    fontFamily: 'veneer',
    fontSize: 18,
  },
  feedback: {
    textAlign: "center",
    color: "white",
    backgroundColor: "transparent",
    width: deviceWidth / 1.5,
  },
  logoContainer: {
    flex: 6,
    justifyContent: "flex-end",
    marginBottom:5,
  },
  buttonContainer: {
    flex: 6,
    justifyContent: "flex-start"
  },
  linkContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center"
  },
  links: {
    color: "white",
    fontFamily: 'veneer',
    fontSize: 16,
  },
  FBimage: {
    width: 36,
    height: 36,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  FBbutton: {
    width: deviceWidth / 1.5,
    height: 40,
    borderColor: "#2d5073",
    backgroundColor: "#3b5998",
    marginBottom: 15,
    alignSelf: "center",
    position: "relative",
    borderRadius: 0,
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
    marginHorizontal: 12,
    fontFamily: 'veneer',
    fontSize: 16,
  },
  FBflex: {
    flex: 1,
    flexDirection: "row",
  }
});
