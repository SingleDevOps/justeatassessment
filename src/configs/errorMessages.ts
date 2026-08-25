import { SearchResult } from '../functions/api/apiRequest';

type SearchFailureReason = Exclude<SearchResult, { ok: true }>['reason'];

export const SEARCH_ERROR_MESSAGES: Record<
  SearchFailureReason,
  { title: string; message: string }
> = {
  invalid_postcode: {
    title: 'Invalid Postcode',
    message: 'You may have entered the wrong postal code, or it has been terminated.',
  },
  api_error: {
    title: 'Error fetching restaurant data',
    message: 'The Just Eat API Endpoint is down, or your IP address is not European.',
  },
  network_error: {
    title: 'Connection Problem',
    message: 'We could not reach the postcode service. Please check your internet connection and try again.',
  },
};
