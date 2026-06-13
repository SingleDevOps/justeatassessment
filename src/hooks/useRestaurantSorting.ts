import { useState, useEffect, useRef } from 'react';
import { RestaurantType } from '../types/restaurant';
import { sortResData } from '../functions/sorting/sortRestaurantData';
import { SortOptionValue, SortOrder } from '../configs/sortingOptions';

export const useRestaurantSorting = (restaurants: RestaurantType[]) => {
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');
  const [sortedRestaurants, setSortedRestaurants] = useState<RestaurantType[]>(restaurants);
  const originalRestaurants = useRef(restaurants);

  useEffect(() => {
    originalRestaurants.current = restaurants;
    setSortedRestaurants([...restaurants]);
    setSelectedSortOption('');
  }, [restaurants]);

  useEffect(() => {
    if (selectedSortOption) {
      let order: SortOrder;
      switch (selectedSortOption) {
        case SortOptionValue.RATING_HIGH_LOW:
          order = SortOrder.DESC;
          break;
        case SortOptionValue.RATING_LOW_HIGH:
          order = SortOrder.ASC;
          break;
        case SortOptionValue.COUNT_MORE_LESS:
          order = SortOrder.MORE_TO_LESS_COUNT;
          break;
        case SortOptionValue.COUNT_LESS_MORE:
          order = SortOrder.LESS_TO_MORE_COUNT;
          break;
        case SortOptionValue.NAME_A_Z:
          order = SortOrder.A_Z;
          break;
        case SortOptionValue.NAME_Z_A:
          order = SortOrder.Z_A;
          break;
        default:
          setSortedRestaurants([...originalRestaurants.current]);
          return;
      }
      setSortedRestaurants(sortResData(originalRestaurants.current, order));
    } else {
      setSortedRestaurants([...originalRestaurants.current]);
    }
  }, [selectedSortOption]);

  return { sortedRestaurants, setSortedRestaurants, selectedSortOption, setSelectedSortOption };
};
