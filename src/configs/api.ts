export const API_URLS = {
    POSTCODE_VALIDATION_URL: (postcode: string) => `https://postcodes.io/postcodes/${postcode}/validate`,
    JUST_EAT_API_URL: (postcode: string) => `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
  };

export const API_TIMEOUTS = {
    POSTCODE_VALIDATION: 3000,
};
