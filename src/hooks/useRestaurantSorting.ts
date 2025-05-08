import { useState, useEffect } from 'react';
import { RestaurantType } from '../types/restaurant_type';
import { sortResData } from '../functions/Sorting_Functions/sortRestaurantData';
import { SortOptionValue, SortOrder } from '../configs/sortingOptions';
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

  // Update sortedRestaurants when restaurants prop changes
  useEffect(() => {
    setSortedRestaurants([...restaurants]);
  }, [restaurants]);

  // Handle sorting when selectedSortOption changes
  useEffect(() => {
    if (selectedSortOption) {
      let sortedData: RestaurantType[];
      switch (selectedSortOption) {
        case SortOptionValue.RATING_HIGH_LOW:
          sortedData = sortResData(sortedRestaurants, SortOrder.DESC);
          break;
        case SortOptionValue.RATING_LOW_HIGH:
          sortedData = sortResData(sortedRestaurants, SortOrder.ASC);
          break;
        case SortOptionValue.COUNT_MORE_LESS:
          sortedData = sortResData(sortedRestaurants, SortOrder.MORE_TO_LESS_COUNT);
          break;
        case SortOptionValue.COUNT_LESS_MORE:
          sortedData = sortResData(sortedRestaurants, SortOrder.LESS_TO_MORE_COUNT);
          break;
        case SortOptionValue.NAME_A_Z:
          sortedData = sortResData(sortedRestaurants, SortOrder.A_Z);
          break;
        case SortOptionValue.NAME_Z_A:
          sortedData = sortResData(sortedRestaurants, SortOrder.Z_A);
          break;
        default:
          sortedData = [...sortedRestaurants]; // original order if no option selected
      }
      setSortedRestaurants(sortedData);
    } else {
      setSortedRestaurants([...sortedRestaurants]); // Reset to original order if no option is selected
    }
  }, [selectedSortOption]);

  return { sortedRestaurants, setSortedRestaurants, selectedSortOption, setSelectedSortOption };
};
