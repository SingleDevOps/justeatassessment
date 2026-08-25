export const API_URLS = {
    POSTCODE_VALIDATION_URL: (postcode: string) =>
      `https://postcodes.io/postcodes/${encodeURIComponent(postcode)}/validate`,
    JUST_EAT_API_URL: (postcode: string) =>
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${encodeURIComponent(postcode)}`,
  };

export const API_TIMEOUTS = {
    POSTCODE_VALIDATION: 3000,
};

export const SAMPLE_POSTCODE = 'L40TH';
export const SAMPLE_DATA_DELAY_MS = 1000;
