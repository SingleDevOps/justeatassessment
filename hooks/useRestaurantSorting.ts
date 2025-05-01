import { useState, useEffect } from 'react';
import { RestaurantType } from '../types/restaurant_type';
import { sortResData } from '../functions/Sorting_Functions/sortRestaurantData';

/**
 * Custom hook to manage sorting of restaurant data.
 * @param restaurants The initial unsorted array of restaurants.
 * @returns An object containing:
 *  - `sortedRestaurants`: The currently sorted array of restaurants.
 *  - `selectedSortOption`: The currently selected sorting option key.
 *  - `setSelectedSortOption`: Function to update the selected sorting option.
 */
export const useRestaurantSorting = (restaurants: RestaurantType[]) => {
  const [selectedSortOption, setSelectedSortOption] = useState<string>(''); // State for the selected sorting option key
  const [sortedRestaurants, setSortedRestaurants] = useState<RestaurantType[]>(restaurants); // State for the sorted restaurant data

  useEffect(() => {
    // When the selected sorting option changes, sort the restaurant data accordingly.
    if (selectedSortOption) {
      let sortedData: RestaurantType[];
      switch (selectedSortOption) {
        case 'Rating (High to Low)':
          sortedData = sortResData(restaurants, 'desc');
          break;
        case 'Rating (Low to High)':
          sortedData = sortResData(restaurants, 'asc');
          break;
        case 'Rating Count (More to Less)':
          sortedData = sortResData(restaurants, 'moreToLessRatingCount');
          break;
        case 'Rating Count (Less to More)':
          sortedData = sortResData(restaurants, 'lessToMoreRatingCount');
          break;
        case 'Name (A-Z)':
          sortedData = sortResData(restaurants, 'A-Z');
          break;
        case 'Name (Z-A)':
          sortedData = sortResData(restaurants, 'Z-A');
          break;
        default:
          sortedData = [...restaurants]; // original order if no option selected
      }
      setSortedRestaurants(sortedData);
    } else {
      setSortedRestaurants([...restaurants]); // Reset to original order if no option is selected
    }
  }, [selectedSortOption, restaurants]);

  return { sortedRestaurants, selectedSortOption, setSelectedSortOption };
};
