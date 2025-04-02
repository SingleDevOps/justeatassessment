//Functions for API Requests.

export async function validatePostcode(text: string): Promise<boolean> {
    const validationUrl = `https://postcodes.io/postcodes/${text}/validate`;
    try {
      const response = await fetch(validationUrl, { method: 'GET' });
      const data = await response.json();
      console.log('Validation response:', data);
      return data.result === true;
    } catch (error) {
      console.error('Error during postcode validation:', error);
      return false;
    }
  }

export async function fetchRestaurantsFromJustEat(text: string): Promise<any[] | null> {
    const justeatUrl = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${text}`;
    try {
      const response = await fetch(justeatUrl, { method: 'GET' });
      const apiData = await response.json();
      const restaurants = apiData.restaurants;
      if (restaurants && restaurants.length) {
        if (restaurants.length >= 10) {
          const tenRestaurants = restaurants.slice(0, 10);
          console.log('First 10 restaurants:', tenRestaurants);
          return tenRestaurants;
        } else {
          console.log('Restaurants:', restaurants);
          return restaurants;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return null;
    }
}