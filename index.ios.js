import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

const {width,height} = Dimensions.get("window")

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
export default class steps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0
      },
    }
  }

  watchID: ?number = null

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var lng = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitdude:lat,
        longitude:lng,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout:20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var lng = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitdude:lat,
        longitude:lng,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition:lastRegion})
      this.setState({markerPosition:lastRegion})
    })
  }

  componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView style={styles.maps} initialRegion={this.state.initialPosition}>
        <MapMarker coordinate={this.state.markerPosition}>
          </MapMarker>
          <View style={StyleSheet.radius}>
            <View style={StyleSheet.marker} />
          </View>
        </MapView>
      </View>
  )}}

const styles = StyleSheet.create({
  radius: {
    height:50,
    width:50,
    borderRadius:50/2,
    overflow:'hidden',
    backgroundColor:'#00FFFF',
    borderWidth:1,
    borderColor:'yellow',
  },
  marker: {
    height:20,
    width:20,
    borderRadius:20/2,
    overflow:'hidden',
    backgroundColor:'#007AFF',
    borderWidth:3,
    borderColor:'yellow',
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  maps: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('steps', () => steps);
