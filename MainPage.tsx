import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';


const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {
  useEffect(() => {
    //Show page title
    navigation.setOptions({
      title: 'Just Eat Postcode Search',
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
    });
  }, [navigation, route]);
  const [postcode, setPostcode] = React.useState('');

  async function handleSearch(text: string) {
    const validation_url = `https://postcodes.io/postcodes/${text}/validate`;
    //Validate the postcode using API of postcodes.io
    var result = await (fetch(validation_url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === true) {
          console.log('Valid postcode');
          text = text.replace(/\s/g, '');
          //Fetch restaurants details using Just Eat API Endpoint
          const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${text}`;
          return fetch(url, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((data) => {
              const restaurants = data.restaurants;
              const ten_restaurants = restaurants.slice(0, 10);
              console.log(ten_restaurants);
              return ten_restaurants;
            });
        } else {
          console.log('Invalid postcode');
          return null;
        }
      }
      ));

    return result;
  }
  const onSubmit = async (text: string) => {
    const ten_restaurants = await handleSearch(text);
    if (ten_restaurants) {
      navigation.navigate('DisplayPage', { postcode: postcode, restaurants: ten_restaurants });
    } else {
      console.log('Invalid postcode');
    }
  };
  return (
    <View>
      <SearchBar style={styles.searchBar}
        placeholder="Enter an UK postcode"
        onChangeText={(text)=>setPostcode(text)}
        onClear={() => console.log('onClear')}
        value={postcode}
        onSubmitEditing={() => onSubmit(postcode)}
        searchIcon={false}
        clearIcon={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    alignSelf: 'center',
    height: 60,
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
  },
});



export default MainPage;
