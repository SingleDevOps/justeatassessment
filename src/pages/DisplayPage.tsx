import React, { useEffect, useState } from 'react';
import { useColorScheme, View, FlatList, RefreshControl, Alert } from 'react-native';
import { displayPageStyles } from '../stylesheets/pages/displayPage';
import { filterCuisines } from '../functions/filtering/filter';
import { RestaurantCard } from '../components/RestaurantCard';
import { SelectListComponent } from '../components/SelectList';
import { useRestaurantSorting } from '../hooks/useRestaurantSorting';
import { handleSearch } from '../functions/api/apiRequest';
import { SEARCH_ERROR_MESSAGES } from '../configs/errorMessages';
import type { RestaurantType } from '../types/restaurant';
import type { DisplayPageProps } from '../types/navigation';

const DisplayPage = ({ navigation, route }: DisplayPageProps) => {
  const { restaurants: initialRestaurants, postcode } = route.params;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [restaurants, setRestaurants] = useState<RestaurantType[]>(initialRestaurants);
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownResetKey, setDropdownResetKey] = useState(0);
  const {sortedRestaurants, setSelectedSortOption, selectedSortOption} = useRestaurantSorting(restaurants);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await handleSearch(postcode);
    setRefreshing(false);
    if (result.ok) {
      setRestaurants(result.restaurants);
      setDropdownResetKey((current) => current + 1);
    } else {
      const { title, message } = SEARCH_ERROR_MESSAGES[result.reason];
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Restaurants at ${postcode}`,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: isDarkMode ? '#1A1A18' : '#F8F9FA',
      },
      headerTintColor: '#FF8000',
      headerBackButtonDisplayMode: 'minimal',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF8000',
      },
    });
  }, [navigation, postcode, isDarkMode]);

  return (
    <View style={[displayPageStyles.fullview, isDarkMode && displayPageStyles.darkfullview]}>
      <SelectListComponent
        setSelected={(value: string) => setSelectedSortOption(value)}
        isDarkMode={isDarkMode}
        selected={selectedSortOption}
        key={dropdownResetKey}
      />
      <View style={displayPageStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={sortedRestaurants}
          renderItem={({ item }) => {
            const cuisines = filterCuisines(item);
            return (
              <RestaurantCard
                item={item}
                isDarkMode={isDarkMode}
                cuisines={cuisines} />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={displayPageStyles.listfooterComponent} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF8000']}
              tintColor={isDarkMode ? '#FFFFFF' : '#000000'}
            />
          }
        />
      </View>
    </View>
  );
};

export default DisplayPage;
