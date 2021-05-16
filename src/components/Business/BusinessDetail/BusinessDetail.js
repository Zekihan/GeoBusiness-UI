import { HeaderBackButton } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Dimensions } from 'react-native';
import StarRating from "react-native-star-rating";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function BusinessDetail({ navigation }) {
  const selectedBusiness = useSelector((state) => state.business.selectedBusiness);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} title="BusinessDetail" />
      ),
    });
  }, [navigation]);

  const onChat = () => {

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.card, styles.profileCard]}>
          <Image style={styles.avatar} source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }} />
          <View style={styles.detailName}>
            <Text style={styles.name} numberOfLines={2}>{selectedBusiness.name}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              emptyStar={'star-outline'}
              fullStar={'star'}
              halfStar={'star-half-full'}
              iconSet={'MaterialCommunityIcons'}
              rating={selectedBusiness.rate}
              fullStarColor={'gold'}
            />
          </View>
        </View>

        {
          selectedBusiness.products.map((category) => {
            return (
              <View style={styles.card}>
                <Text style={styles.cardTittle}>{category.category}</Text>
                {
                  category.items.map((item) => {
                    return (
                      <Text>{item}</Text>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#DCDCDC"
  },
  cardTittle: {
    color: "#808080",
    fontSize: 22,
    marginBottom: 5,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 10,
  },
  profileCard: {
    height: 200,
    marginTop: 20,
    flexDirection: "row"
  },
  detailName: {
    padding: 10,
    width: screenWidth - 180,
  },
  name: {
    fontSize: 22,
    color: "#808080",
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5,
  }
});