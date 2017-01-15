
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

module.exports = StyleSheet.create({
container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center"
  },
  mapContainer: {
    flex: 2
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  locations: {
    flex: 4
  },
  location: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 5,
    margin: 2,
    padding: 10
  },
  locationTitle: {
    fontWeight: "bold"
  },
});
