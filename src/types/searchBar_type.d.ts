export type SearchBarPropType = {
    setPostcode: (text: string) => void;
    loading: boolean;
    onSubmit: (text: string) => Promise<any | null>;
    isDarkMode: boolean;
    postcode: string;
};
