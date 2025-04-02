import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight , StatusBar} from 'react-native';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
    const [postcode, setPostcode] = useState('');

    useEffect(() => {   // Prevents infinite postcode rendering on the header
      if (route.params.postcode && route.params.postcode !== postcode){
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

    const { restaurants } = route.params;
    return (
        <View style={styles.fullview}>
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
                            underlayColor={'#F1F1F1'}
                            onPress={() => {}}
                            style = {styles.touchableHighlight}
                        >
                            <View style={styles.card}>
                                <View style={styles.upperPart}>
                                    <Image
                                        source={{ uri: item.logoUrl }}
                                        style={styles.image}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <View style={styles.ratingContainer}>
                                            <Image style={styles.ratingImage} source={require('../images/golden_star.png')} />
                                            <Text style={styles.rating}>{item.rating.starRating}</Text>
                                        </View>
                                    </View>
                                </View>
                            <View style= {styles.separator} />
                                <View style={styles.lowerPart}>
                                    <Text style={styles.cuisine}>{cuisines}</Text>
                                    <Text style={styles.cuisine}>{item.address.firstLine + ', ' + item.address.city}</Text>
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
      backgroundColor: '#F1F1F1', // Light gray background for the entire page
    },
    touchableHighlight:{
      borderRadius: 12,
      overflow:'hidden',
      marginTop:5,
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
      color: '#333333', // Dark font for better readability
      marginBottom: 4,
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
    separator: {
      height: 1,
      backgroundColor: '#EEEEEE', // Subtle divider color
      marginHorizontal: 16,
      marginVertical: 8,
    },
    lowerPart: {
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    cuisine: {
      fontSize: 14,
      color: '#666666', // Medium gray for secondary text
      marginBottom: 6,
      textAlign:'left',
  },
  listfooterComponent:{
    height:50,
  },
}
);


export default DisplayPage;
