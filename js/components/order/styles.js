
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
    borderColor: "#000",
    borderRadius: 0,
  },
  menuCategory: {
    color: "white",
    backgroundColor: "#E7B220",
    margin: 0,
    padding: 8,
    paddingTop: 12,
    fontFamily: 'veneer',
    fontSize: 20,
    marginTop: -1,
  },
  links: {
    textAlign: "center",
    color: "#0b0909"
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
