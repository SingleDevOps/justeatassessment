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

export async function validatePostcode(text: string): Promise<boolean> {
  text = text.toUpperCase();
  const validationUrl = `https://postcodes.io/postcodes/${text}/validate`;

  try {
    //Call validation API to check the postcode.
    const response = await fetch(validationUrl, { method: 'GET' });
    const data = await response.json();
    console.log('Validation response:', data);
    return data.result === true; // return the validation result of the postcode being valid or not.
  } catch (error) {
    console.error('Error during postcode validation:', error);
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
export async function fetchRestaurantsFromJustEat(text: string): Promise<object[] | null> {
  const justeatUrl = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${text}`;
  try {
    const response = await fetch(justeatUrl, { method: 'GET' }); // Just Eat Endpoint for fetching restaurant data.
    const apiData = await response.json();
    const restaurants = apiData.restaurants;
    if (restaurants) {
      if (restaurants.length >= 10) { // Fault tolerance, if there are ten or more restaurants, do regularly.
        const tenRestaurants = restaurants.slice(0, 10);
        console.log('First 10 restaurants:', tenRestaurants);
        return tenRestaurants;
      } else { // If not then return whatever number of restaurant in the returned data.
        console.log('Restaurants:', restaurants);
        return restaurants;
      }
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
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
 * @returns {Promise<any[] | null>} A promise that resolves to an array of restaurant
 *                                  objects or null if the search was unsuccessful.
 */
export async function handleSearch(text: string): Promise<any[] | boolean | null> {

  const timeoutPromise = new Promise<string>((resolve) =>   // Create a timeout promise that resolves to "TIMEOUT" after 3000ms
    setTimeout(() => resolve('TIMEOUT'), 3000)
  );

  // Race the validation promise against the timeout promise
  const validationResult = await Promise.race([
    validatePostcode(text),
    timeoutPromise,
  ]);

  if (validationResult === 'TIMEOUT') {
    console.log('Validation API request timed out. Sending postcode directly to Just Eat API.');
    return await fetchRestaurantsFromJustEat(text);
  }
  else if(validationResult === true){
    return await fetchRestaurantsFromJustEat(text);
  }
  else{
    return false;
  }
}
