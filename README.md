├── App.tsx                     # Main application container with navigation setup
└── src/
    ├── pages/                  # Screen components
    │   ├── MainPage.tsx        # Initial screen with search bar and logo
    │   ├── DisplayPage.tsx     # Screen to display the list of restaurants
    │   └── L40TH.json          # Sample restaurant data (imported by MainPage)
    │
    ├── components/             # Reusable UI components
    │   └── RestaurantCard.tsx  # Card component to display a single restaurant's details
    │
    ├── functions/              # Utility and logic functions
    │   ├── API_Functions/
    │   │   └── apiRequest.ts   # Functions for API calls (validatePostcode, fetchRestaurantsFromJustEat, handleSearch)
    │   │
    │   ├── Filtering_Functions/
    │   │   └── filter.ts       # Function to format cuisine names with emojis (uses cuisine-emoji-match)
    │   │   └── cuisine-emoji-match.ts # Data mapping cuisine keywords/names to emoji strings
    │   │
    │   ├── Sorting_Functions/
    │   │   ├── sortRestaurantData.ts # Function to sort restaurant data based on selected criteria
    │   │   └── sortingOptions.ts     # Data defining the options for the sorting dropdown
    │   
    ├── stylesheets/            # Style definitions
    │   ├── MainPage_StyleSheet.ts   # Styles used by MainPage.tsx
    │   └── DisplayPage_StyleSheet.ts # Styles used by DisplayPage.tsx and passed to RestaurantCard.tsx
    │
    └── images/                 # Static image assets
        ├── just-eat-logo.png
        ├── Just-Eat-Star.png
        └── downarrow.png