import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import MapView from "react-native-maps";
import { FontAwesome } from '@expo/vector-icons';

export default function BusinessMapView({ navigation }) {
  const businessList = useSelector((state) => state.business.businessList);
  const [loc, setLoc] = useState({
    mapRegion: {
      latitude: 30.4237,
      longitude: 20.1428,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    locationResult: null,
    location: {
      coords: {
        latitude: 30.4237,
        longitude: 20.1428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    },
  });

  useEffect(() => {
    _getLocationAsync();
  }, []);

  const _handleMapRegionChange = (mapRegion) => {
    setLoc({ mapRegion });
  };

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLoc({
        locationResult: "Permission to access location was denied",
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLoc({
      locationResult: JSON.stringify(location),
      location: {
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        },
      },
    });
  };

  const switchView = () => {
    navigation.navigate('BusinessListView')
  }

  return (
    <View>
      <MapView
        style={styles.map}
        region={loc.location.coords}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {businessList.map((business) => (
          <MapView.Marker
            key={business.id}
            coordinate={business.location}
            title={business.name}
            description={business.category}
          >
            <View style={{ backgroundColor: "#f0ffff", padding: 10, borderRadius: 8 }}>
              <Text style={{ fontSize: 9 }} >{business.name}</Text>
            </View>
          </MapView.Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.overlay} onPress={() => switchView()}>
        <FontAwesome name="exchange" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});