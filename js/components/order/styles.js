
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#0b0909',
    flex: 1,
  },
  body: {
    flex: 24,
    justifyContent: "center"
  },
  list: {
    flex: 1
  },
  rowTitle: {
    color: "white",
  },
  row: {
    backgroundColor: "#0b0909",
    borderColor: "grey",
    borderRadius: 5,
  },
  menuCategory: {
    color: "white",
    backgroundColor: "#E7B220",
    margin: 0,
    padding: 8,
    fontFamily: 'veneer',
    fontSize: 18,
  },
  links: {
    textAlign: "center",
    color: "black"
  },
  header: {
    backgroundColor: "gray",
    marginTop: 30,
    height: 40,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
});
