import type { PieTokens } from '../configs/pieTokens';

export type SearchBarPropType = {
    setPostcode: (text: string) => void;
    loading: boolean;
    onSubmit: (text: string) => Promise<void>;
    theme: PieTokens;
    postcode: string;
};
