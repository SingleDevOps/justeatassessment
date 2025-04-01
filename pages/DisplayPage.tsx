import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight , StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
    useEffect(() => {
        //Show page title
        navigation.setOptions({
            title: `Restaurants at ${route.params.postcode.replace(/\s/g, '').toUpperCase()}`,
            fontsize: 20,
            //the title should be in the center
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#FF8000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
            },
        },);
    }, [navigation, route, route.params]);

    const { restaurants } = route.params;
    return (
        <SafeAreaView  style={styles.safeArea}>
            <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                renderItem={({ item }) => {
                    const cuisines = item.cuisines.map((cuisine: any) => cuisine.name).join(', ');
                    return (
                        <TouchableHighlight
                            underlayColor={'gray'}
                            onPress={() => {}}
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
                                    <Text style={styles.cuisine}>{item.address.firstLine + ' ' + item.address.city}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      //remove the top bar of the app
      marginTop: -StatusBar.currentHeight,
      backgroundColor: '#F8F8F8', // Light gray background for the entire page
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 12, // Rounded corners for a modern look
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Shadow for Android
      overflow: 'hidden', // Ensures content stays within rounded corners
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
      borderRadius: 30, // Circular image
      backgroundColor: '#F5F5F5', // Placeholder background color
    },
    textContainer: {
      flex: 1,
      marginLeft: 12, // Space between image and text
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333', // Dark gray for better readability
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
}
);


export default DisplayPage;
