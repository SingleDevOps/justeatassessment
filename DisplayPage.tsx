import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight } from 'react-native';

const DisplayPage = ({ navigation, route }: { navigation: any, route: any }) => {
    useEffect(() => {
        //Show page title
        navigation.setOptions({
            title: `Restaurants at ${route.params.postcode.replace(/\s/g, '')}`,
            //the title should be in the center
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
            },
        }, );
    },[navigation, route, route.params]);

    const { restaurants } = route.params;

    for (let i = 0; i < restaurants.length; i++) {
        console.log(restaurants[i]);
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                renderItem={({ item }) => {
                    const cuisines = item.cuisines.map((cuisine: any) => cuisine.name).join(', ');

                    return (
                        <TouchableHighlight
                            style={styles.restaurantCard}
                            underlayColor={'#f1f1f1'}
                            onPress={() => {
                            }}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: item.logoUrl }}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.cuisines}>{cuisines}</Text>
                                    <Text style={styles.address}>{item.address.firstLine + ' ' + item.address.city}</Text>
                                    <View style={styles.ratingContainer}>
                                        <Image style={styles.ratingImage}
                                            source ={require('./images/golden_star.png')}
                                        />
                                        <Text style={styles.rating}>{item.rating.starRating}</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableHighlight>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefcff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    restaurantCard: {
        width: '90%',
        height: 250,
        backgroundColor: 'white',
        borderRadius: 50,
        margin: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 30, // Add some top margin
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    info: {
        alignItems: 'center',
        marginTop: 10,
    },
    name: {
        // Add some margin to the name text
        marginInlineStart: 5,
        marginInlineEnd: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cuisines: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    ratingContainer:{
        //every element in the ratingContainer should be in a row
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingImage: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    rating: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    address: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
});

export default DisplayPage;
