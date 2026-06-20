# Just Eat Takeaway Takehome Assignment

This project is made for just eat takeaway take-home assignment for the role of Early Career Program - Software Engineer.

Its purpose is to search the restaurants by given UK postcodes and display the first ten restaurants from the searching result in a user-friendly format.

It is a mobile application for Android system, and potentially for iOS system for that it is built with React Native.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This application includes two pages:

1. MainPage
2. DisplayPage

This application does two things:

1. On **MainPage**, it validates the postcode, searches it and returns the first 10 restaurants for any valid UK postcode, with error handling (Validation API Fails, Request Timeout, No Internet, Just Eat API Fails). This is done through two APIs:
   - postcode.io validation api: https://postcodes.io/postcodes/${postcode}/validate
   - Just Eat Takeaway Endpoint API: https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}

   ***If searching L4 0TH, or empty string, the local sample data will be used for display purpose***

2. On **DisplayPage**, it can display the restaurant in the order of the returning data, or it can display the same restaurants by multiple sorting options: ***Rating***, ***RatingCount***, ***Alphabetical Order of Restaurant Names***. It can refresh the restaurant list by swiping down the screen.

Besides, this application has dark mode design, for the night usage.

## Code Structure

### `main` Branch

```
├── App.tsx                     # Main application container with navigation setup
└── src/
    ├── pages/                  # Screen components
    │   ├── MainPage.tsx        # Initial screen with search bar and logo
    │   └── DisplayPage.tsx     # Screen to display the list of restaurants
    │
    ├── components/             # Reusable UI components
    │   ├── RestaurantCard.tsx  # Card component to display a single restaurant's details
    │   ├── SelectList.tsx      # Dropdown component for sorting options
    │   └── SearchBar.tsx       # Search bar component for postcode input
    │
    ├── types/                  # Types for component props and data structures
    │   ├── restaurant.ts
    │   ├── restaurantCard.ts
    │   ├── searchBar.ts
    │   ├── selectList.ts
    │   ├── selectListOption.ts
    │   └── navigation.ts
    │
    ├── functions/              # Utility and logic functions
    │   ├── api/
    │   │   └── apiRequest.ts   # Functions for API calls (validatePostcode, fetchRestaurantsFromJustEat, handleSearch)
    │   ├── filtering/
    │   │   └── filter.ts       # Function to format cuisine names with emojis
    │   └── sorting/
    │       └── sortRestaurantData.ts # Function to sort restaurant data based on selected options
    │
    ├── hooks/
    │   ├── useKeyboardVisible.ts     # Hook to track keyboard visibility
    │   └── useRestaurantSorting.ts   # Hook to track selected sorting options and to sort restaurants
    │
    ├── configs/                # Static data files for configuration
    │   ├── api.ts              # URL Constants and timeout settings
    │   ├── sortingOptions.ts   # Sorting options for the sorting dropdown
    │   └── cuisineEmojiMatch.ts # Data mapping cuisine keywords/names to emoji strings
    │
    ├── stylesheets/            # Style definitions
    │   ├── pages/
    │   │   ├── mainPage.ts     # Styles used by MainPage.tsx
    │   │   └── displayPage.ts  # Styles used by DisplayPage.tsx
    │   └── props/
    │       ├── restaurantCard.ts # Styles for RestaurantCard component
    │       ├── searchBar.ts     # Styles for SearchBar component
    │       └── selectList.ts    # Styles for SelectList component
    │
    ├── assets/                 # Static assets
    │   ├── data/
    │   │   └── L40TH.json      # Sample restaurant data for display purpose
    │   ├── fonts/              # OpenSans font files
    │   └── icon/
    │       └── search_icon.png
    │
    ├── images/                 # Static image assets
    │   ├── just-eat-logo.png
    │   ├── Just-Eat-Star.png
    │   └── downarrow.png
    │
    ├── __mocks__/              # Test mocks
    │   └── @react-native-community/
    │       └── netinfo.js
    │
    ├── __tests__/              # Test files
    │   ├── MainPage.test.tsx
    │   ├── CustomSorting.test.tsx
    │   └── apiRequest.test.ts
    │
    └── apk/
        └── just-eat.apk        # Pre-built Android APK
```

### `Full-Info-Display` Branch

Extends the `main` branch structure with the following additions:

```
├── App.tsx                     # Main application container with navigation setup
└── src/
    ├── pages/
    │   ├── MainPage.tsx
    │   ├── DisplayPage.tsx
    │   └── RestaurantDetailPage.tsx  # Full restaurant details view [NEW]
    │
    ├── components/
    │   ├── RestaurantCard.tsx
    │   ├── SelectList.tsx
    │   ├── SearchBar.tsx
    │   ├── FilterModal.tsx           # Advanced filtering modal [NEW]
    │   └── FilterSearchBar.tsx       # Search with filter integration [NEW]
    │
    ├── types/
    │   ├── restaurant.ts
    │   ├── restaurantCard.ts
    │   ├── searchBar.ts
    │   ├── selectList.ts
    │   ├── selectListOption.ts
    │   ├── navigation.ts
    │   └── filterOptions.ts          # Filter state and option types [NEW]
    │
    ├── functions/
    │   ├── api/
    │   │   └── apiRequest.ts
    │   ├── filtering/
    │   │   ├── filter.ts
    │   │   └── searchRestaurants.ts  # Multi-keyword search logic [NEW]
    │   └── sorting/
    │       └── sortRestaurantData.ts
    │
    ├── hooks/
    │   ├── useKeyboardVisible.ts
    │   └── useRestaurantSorting.ts
    │
    ├── configs/
    │   ├── api.ts
    │   ├── sortingOptions.ts
    │   ├── cuisineEmojiMatch.ts
    │   └── filterDefaults.ts         # Default filter options and values [NEW]
    │
    ├── stylesheets/
    │   ├── pages/
    │   │   ├── mainPage.ts
    │   │   ├── displayPage.ts
    │   │   └── restaurantDetailPage.ts # Styles for RestaurantDetailPage [NEW]
    │   └── props/
    │       ├── restaurantCard.ts
    │       ├── searchBar.ts
    │       ├── selectList.ts
    │       ├── filterModal.ts         # Styles for FilterModal [NEW]
    │       └── filterSearchBar.ts     # Styles for FilterSearchBar [NEW]
    │
    ├── assets/
    │   ├── data/
    │   │   └── L40TH.json
    │   ├── fonts/
    │   └── icon/
    │       └── search_icon.png
    │
    ├── images/
    │   ├── just-eat-logo.png
    │   ├── Just-Eat-Star.png
    │   └── downarrow.png
    │
    ├── __mocks__/
    │   └── @react-native-community/
    │       └── netinfo.js
    │
    ├── __tests__/
    │   ├── MainPage.test.tsx
    │   ├── CustomSorting.test.tsx
    │   └── apiRequest.test.ts
    │
    └── apk/
        └── just-eat.apk
```

## Design Principles

### Centralized Configuration

Key settings and values in configuration files.

You can modify key settings without changing the code logic, which improves flexibility and reduces errors.

- **API Configuration (`src/configs/api.ts`)**: All external API URLs and timeout settings are centralized in this file. When API endpoint changes, update it here.
- **Sorting Options (`src/configs/sortingOptions.ts`)**: All sorting options in one place. When changing sorting list options, update this file.
- **Cuisine Emoji Mapping (`src/configs/cuisineEmojiMatch.ts`)**: maps cuisine names to emojis, making it easier to manage visual elements across the app.

---

### Modularity and Separation of Concerns

- **Functions (`src/functions/`)**: Functions organized by domain (`api/`, `filtering/`, `sorting/`), each with a single, clear responsibility.
- **Components (`src/components/`)**: Reusable visual components with PascalCase naming.
- **Hooks (`src/hooks/`)**: Custom hooks for tracking selected sorting options and keyboard visibility.
- **Pages (`src/pages/`)**: Separate page files of the app.
- **Configuration Files (`src/configs/`)**: All configuration values are in the `configs` directory, making them easy to find and update.
- **Types (`src/types/`)**: Custom types to help define the shape of data.
- **StyleSheets (`src/stylesheets/`)**: Separate stylesheets for pages and components.

---

### Error Handling

This app handles problems gracefully.

- **Postcode Validation**: The `validatePostcode` function checks if the user entered a valid UK postcode before making a request. This prevents unnecessary API calls when the input is invalid.
- **Validation Timeout**: The `handleSearch` function has a timeout built-in. If postcode validation takes too long (e.g., due to network issues), the app doesn't hang; it moves on and tries fetching restaurant data from Just Eat.
- **Fallback Data**: If no postcode is entered (or if the default `L40TH` postcode is used), the app loads sample data instead of showing an error. The user can explore the app even if the API isn't available (useful for demos or testing).
- **No Internet Error**: The application shows "No Internet" error when the user searches postcode with no Internet connection.
- **Restaurant API Error**: If the user is not having an European IP address or if the restaurant api endpoint is down.
- **Emoji-Cuisine Match**: The `cuisineEmojiMatch.ts` has a mapping of cuisine names to emojis, which makes the restaurant list appealing.

---

### Type Safety

- **Explicit Types**: Functions have clearly defined types for their parameters and return values, which helps prevent bugs.
- **Custom Types**: Types like `OptionType` and `RestaurantType` define the structure of data, showing exactly what to expect.
- **Enums**: Enums (like `SortOrder` and `SortOptionValue`) to define constant values for sorting, reducing the risk of typos or mistakes.

## Programming Interface

![Programming-Interface.png](https://i.postimg.cc/WVSm3mL5/Programming-Interface.png)

## Program Flow Chart

![Program-Flow-Chart.png](https://i.postimg.cc/L6qMn014/Flow-Chart.png)

## Getting Started

**If you do not want to set up the project by yourself, you can download the "just-eat.apk" file from src/apk folder and install it on your Android devices.**

**(I do not have a Mac computer to compile the iOS version)**

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

First, open up your project folder in shell/cmd.

Use this line to install all dependency packages.

```
npm install
```

Second, you need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app.

**If the following commands do not work, it is most likely because in Gradle 9.0 ***jcenter()*** is deprecated. You can fix this by removing the ***jcenter()*** from any node modules that are using it. Or you can replace it with ***mavencentral()***.**

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Branches

### `main` Branch
The main branch contains the core restaurant search functionality:
- Search restaurants by UK postcode using postcode.io validation API
- Display first 10 restaurants from Just Eat API
- Basic sorting options (Rating, RatingCount, Alphabetical Order)
- Dark mode support for night usage
- Error handling for API failures, timeouts, and network issues

### `Full-Info-Display` Branch
The Full-Info-Display branch extends the main branch with enhanced features:

#### Restaurant Detail Page
- Click on any restaurant card to view detailed information
- Full address, delivery time estimates, and availability slots
- Restaurant deals and promotions with deduplication
- Responsive design with dark mode support

#### Advanced Filtering System
- **FilterModal Component**: Interactive modal with animated slide-up behavior
  - Filter by rating thresholds (4+, 4.5+, 5 stars)
  - Filter by delivery cost (Free, £0-£2, £2-£4, £4+)
  - Filter by top cuisines (Pizza, Burgers, Chinese, Indian, Kebab)
  - Pan gesture dismissal with threshold detection
  - Real-time filter state management

- **FilterSearchBar Component**: Enhanced search with filter integration
  - Filter button with badge showing active filter count
  - Integrated search functionality across full restaurant list
  - Multi-keyword AND filtering logic

#### Technical Implementation
- **Filter State Management**: Centralized filter configuration with `FilterState` type
- **Search Algorithm**: Multi-keyword AND filtering across restaurant names and cuisines
- **Deduplication Logic**: Smart deal deduplication using offerType + description keys
- **Performance Optimization**: Memoized filtering and sorting operations

## Visuals

### Video
https://github.com/user-attachments/assets/54e2edad-2954-4e18-8eb8-d6c278cc23c7

### MainPage

#### Light Mode

<img src="https://i.postimg.cc/02Xv0hky/Mainpage-Lightmode.png" alt="alt text" title="MainPage, LightMode">

#### Dark Mode

<img src="https://i.postimg.cc/Hx0H0xxq/Mainpage-Darkmode.png" alt="alt text" title="MainPage, DarkMode">

### Display Page

Four data points are shown: name and rating on the top, lying horizontally with the logo. cuisines and address on the bottom, lying vertically.

#### Light Mode

<img src="https://i.postimg.cc/XJrdXRYB/Display-Page-Lightmode.png" alt="alt text" title="DisplayPage, LightMode">

#### Dark Mode

<img src="https://i.postimg.cc/MTgRB9nP/Display-Page-Darkmode.png" alt="alt text" title="DisplayPage, DarkMode">

#### Custom Sorting Options

<img src="https://i.postimg.cc/tJn6fkQ9/Custom-Sorting-Options.png" alt="alt text" title="Custom Sorting Options">

#### Postcode Validation Failure Alert

<img src="https://i.postimg.cc/MXkz81kS/Main-Page-Invalid-Postcode.png" alt="alt text" title="MainPage, Invalid Postcode">

#### Just Eat API Failure Alert

<img src="https://i.postimg.cc/yNtsVV7v/Alert-Just-Eat-APIFailure.png" alt="alt text" title="MainPage, Just Eat API Failure">

#### No Internet Notification

<img src="https://i.postimg.cc/Kc1LxFXq/Main-Page-No-Internet.png" alt="alt text" title="MainPage, No Internet">

## Assumptions & Things not clear

The definition of "restaurant" is not specified. There are non-restaurants in the "restaurants" list, such as pharmacies and convenience stores. I assume that all entries are "restaurant" by definition.

The definition of "cuisine" is not specified. There are names such as "Local Legends" "Deals" "Freebies" in the cuisine list. By observation, in most scenarios the first two names in "cuisines" are truly cuisines.

## Potential Improvements

1. Better Displaying of Cuisine Items & Better Distinguishability of Restaurants / Non-Restaurants.
2. More custom components to increase modularity. ✅ (`main` branch)
3. Better StyleSheet Design with more dynamic settings. ✅ (`main` branch)
4. Restaurant Details in a full page when each restaurant card is clicked. ✅ (`Full-Info-Display` branch)
5. Tests for checking the returned data and the correct rendering of elements.
   (Can be done by *Jest* and *@testing-library/react-native*: e.g. Restaurant card components with various data inputs, Search input component behavior, Sorting controls and their state changes, Navigation between MainPage and DisplayPage, Data passing between screens, Dark/light mode toggle behavior) ✅ (`main` branch)
6. GeoPoint + Map Integration for navigation to the restaurant.
7. More Restaurant Sorting Options. ✅ (`main` branch)
8. Advanced Filtering by Rating, Delivery Cost, and Cuisine. ✅ (`Full-Info-Display` branch)
