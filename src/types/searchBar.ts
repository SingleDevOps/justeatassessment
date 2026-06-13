export type SearchBarPropType = {
    setPostcode: (text: string) => void;
    loading: boolean;
    onSubmit: (text: string) => Promise<void>;
    isDarkMode: boolean;
    postcode: string;
};
