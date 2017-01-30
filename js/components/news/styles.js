const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  wrapper: {
    flex: 1,
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
