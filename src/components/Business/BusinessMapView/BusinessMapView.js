import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import { StyleSheet, Text, Dimensions, View } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import MapView from "react-native-maps";
import store from '@redux/store';
import {
  setSelectedBusiness
} from "@redux"
import { Image } from "react-native";
import storePng from '../../../../assets/store.png';

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

  const goToDetailScreen = (item) => {
    if (item) {
      store.dispatch(setSelectedBusiness(item));
      navigation.navigate('BusinessDetail');
    }
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
            title={business.name.length > 30 ? business.name.substring(0, 30) + "..." : business.name}
            description={business.category}
            onCalloutPress={(e) => goToDetailScreen(business)}
          >
            <View style={{ backgroundColor: "transparent", borderRadius: 8, flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Image style={styles.avatar} source={storePng} />
              <Text style={{ fontSize: 12, fontWeight: "bold" }} >{business.name.length > 10 ? business.name.substring(0, 10) + "..." : business.name}</Text>
            </View>
          </MapView.Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  avatar: {
    width: 30,
    height: 30,
  },
});
