
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
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
    color: "black",
  },
  row: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  menuCategory: {
    color: "white",
    backgroundColor: "gold",
    margin: 2,
    padding: 8
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
