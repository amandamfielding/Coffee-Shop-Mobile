
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
  header: {
    backgroundColor: "#000",
    marginTop: 0,
    height: 60,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
headerText: {
  color: "white"
}
});

