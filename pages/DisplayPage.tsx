import React, { useEffect, useState } from 'react';
import { useColorScheme, View, Text, StyleSheet, Image, FlatList, TouchableHighlight, StatusBar } from 'react-native';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const [postcode, setPostcode] = useState('');
  const colorScheme = useColorScheme();
  useEffect(() => {   // Prevents infinite postcode rendering on the header
    if (route.params.postcode && route.params.postcode !== postcode) {
      setPostcode(route.params.postcode);
    }
  }, [route.params.postcode, postcode]);

  useEffect(() => {
    //Show page title, and its style setting
    navigation.setOptions({
      title: `Restaurants at ${postcode}`,
      fontsize: 20,
      headerTitleAlign: 'center', //the title should be in the center
      headerStyle: {
        backgroundColor: '#FF8000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    },);
  }, [navigation, route, postcode, route.params.postcode]);

  const isDarkMode = colorScheme === 'dark';

  const { restaurants } = route.params;
  return (
    <View style={[styles.fullview, isDarkMode && styles.darkfullview]}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false} //Hide Vertical Scrollbar
          showsHorizontalScrollIndicator={false} //Hide Horizontal Scrollbar
          data={restaurants}
          renderItem={({ item }) => {
            const cuisines = item.cuisines.map((cuisine: any) => cuisine.name).join(', ');
            return (
              <TouchableHighlight
                underlayColor={isDarkMode ? '#1A1A1A' : '#F1F1F1'}
                onPress={() => { }}
                style={styles.touchableHighlight}
              >
                <View style={[styles.card, isDarkMode && styles.darkcard]}>
                  <View style={styles.upperPart}>
                    <Image
                      source={{ uri: item.logoUrl }}
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text style={[styles.name, isDarkMode && styles.darkname]}>{item.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Image style={styles.ratingImage} source={require('../images/golden_star.png')} />
                        <Text style={styles.rating}>{item.rating.starRating}</Text>
                        <Text style={[styles.ratingNumbers, isDarkMode && styles.darkratingNumbers]}> ({item.rating.count})</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.lowerPart}>
                    <Text style={[styles.cuisine, isDarkMode && styles.darkcuisine]}>{cuisines}</Text>
                    <Text style={[styles.cuisine, isDarkMode && styles.darkcuisine]}>{item.address.firstLine + ', ' + item.address.city}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={styles.listfooterComponent} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullview: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  darkfullview:{
    backgroundColor: '#1A1A18',
  },
  touchableHighlight: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  darkcard: {
    backgroundColor: '#262626',
  },
  upperPart: {
    flexDirection: 'row', // Align image and text side by side
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 35, // Circular image
    backgroundColor: '#F5F5F5', // Placeholder background color
  },
  textContainer: {
    flex: 1,
    marginLeft: 16, // Space between image and text
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  darkname:{
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingImage: {
    width: 16,
    height: 16,
    marginRight: 4, // Space between star icon and rating text
  },
  rating: {
    fontSize: 14,
    color: '#FF8000', // Just Eat orange for ratings
    fontWeight: 'bold',
  },
  ratingNumbers:{
    fontSize: 13,
    color: '#333333',
  },
  darkratingNumbers:{
    color: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  lowerPart: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  cuisine: {
    fontSize: 14,
    color: '#393939',
    marginBottom: 6,
    textAlign: 'left',
  },
  darkcuisine:{
    color: '#e6e6e6',
  },
  listfooterComponent: {
    height: 50,
  },
}
);


export default DisplayPage;
