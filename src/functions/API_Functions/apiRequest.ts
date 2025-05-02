import * as sampleData from '../../assets/data/L40TH.json';
import { RestaurantType } from '../../types/restaurant_type'; // Import RestaurantType
import { API_URLS } from '../../configs/api';
//Functions for API Requests.
/**
 * Validates if a string is a valid UK postcode using the postcodes.io API.
 *
 * Makes a GET request to the postcodes.io validation endpoint and checks
 * if the provided postcode exists in the UK postal system.
 *
 * @param {string} text - The postcode to validate (should be pre-formatted without spaces).
 * @returns {Promise<boolean>} A promise that resolves to true if the postcode is valid,
 *                             or false if invalid or if an error occurs during validation.
 */

export async function validatePostcode(postcode: string): Promise<boolean> {

  try {
    const response = await fetch(API_URLS.POSTCODE_VALIDATION_URL(postcode), { method: 'GET' });
    const data = await response.json();
    // console.log('Validation response:', data);

    return data.result === true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}


/**
 * Fetches restaurant data from the Just Eat API based on a UK postcode.
 *
 * Makes a GET request to Just Eat's discovery endpoint and processes the response,
 * limiting results to a maximum of 10 restaurants if more are available.
 *
 * @param {string} text - The validated postcode to search with.
 * @returns {Promise<object[] | null>} A promise that resolves to an array of restaurant
 *                                     objects (limited to 10) or null if no restaurants
 *                                     are found or if an error occurs.
 */
export async function fetchRestaurantsFromJustEat(postcode: string): Promise<object[] | null> {

  try {
    const response = await fetch(API_URLS.JUST_EAT_API_URL(postcode), { method: 'GET' });
    const apiData = await response.json();
    const restaurants = apiData.restaurants;
    if (restaurants) {
      if (restaurants.length >= 10) { // Fault tolerance, if there are ten or more restaurants, take the first ten restaurants.
        const tenRestaurants = restaurants.slice(0, 10);
        // console.log('First 10 restaurants:', tenRestaurants);
        return tenRestaurants;
      } else { // If not then return whatever number of restaurant in the returned data. This may happen for postcal codes of Wales, e.g. SA44 4PD
        // console.log('Restaurants:', restaurants);
        return restaurants;
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}


/**
 * Manages the restaurant search workflow with timeout handling for postcode validation.
 *
 * Implements a race condition between postcode validation and a timeout promise.
 * If validation completes successfully, proceeds to fetch restaurants.
 * If validation times out after 3 seconds, bypasses validation and directly
 * attempts to fetch restaurants from Just Eat API.
 *
 * @param {string} text - The postcode to search with.
 * @returns {Promise<any[] | boolean | null>} A promise that resolves to an array of restaurant
 *                                  objects or null if the search was unsuccessful.
 */
export async function handleSearch(text: string): Promise<RestaurantType[] | boolean | null> {

  if (!text || text === 'L40TH') {  // Using sample data for users having trouble with the API.
    const restaurants = await new Promise((resolve) => { // Return a promise that resolves after the delay
      setTimeout(() => {
        resolve(sampleData.restaurants.slice(0, 10) as RestaurantType[]);
      }, 1000); // Simulate loading for 1 second.
    });
    return restaurants as RestaurantType[];
  }


  const POSTCODE_VALIDATION_TIMEOUT = new Promise<string>((resolve) =>
    setTimeout(() => resolve('TIMEOUT'), 3000)
  );


  const validationResult = await Promise.race([ // Race the validation promise against the timeout promise
    validatePostcode(text), //Returns true or false
    POSTCODE_VALIDATION_TIMEOUT,
  ]);


  if (validationResult === 'TIMEOUT' || validationResult === true) {
    const restaurants = await fetchRestaurantsFromJustEat(text);
    // console.log('Restaurants:', restaurants);
    if (restaurants === null) {
      return null;
    }
    return restaurants as RestaurantType[];
  } else { // validationResult === false
    return false;
  }
}
