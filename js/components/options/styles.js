const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

itemImage: {
  height: deviceHeight / 2.5
},
container: {
	flex: 1,
	backgroundColor: "#0b0909",
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