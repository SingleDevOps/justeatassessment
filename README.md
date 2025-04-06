# Just Eat Takeaway Takehome Assignment

This project is made for just eat takeaway take-home assignment for the role of Early Career Program - Software Engineer. 

Its purpose is to search the restaurants by given UK postcodes and display the first ten restaurants from the searching result in a user-friendly format.

It is a mobile application for Android system, and potentially for iOS system for that it is built with React Native.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This application includes two pages:

1. MainPage
2. DisplayPage

This application does two things:

1. On **MainPage**, it validates the postcode, searches it and returns the first 10 restaurants for any valid UK postcode, with error handling (e.g. Validation API Fails, Request Timeout). This is done through two APIs: 

   - postcode.io validation api: https://postcodes.io/postcodes/${postcode}/validate
   
   - Just Eat Takeaway Endpoint API: 
   https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}

2. On **DisplayPage**, it can display the restaurant in the order of the returning data, or it can display the same restaurants by the sorting order of their ratings, from high to low, and from low to high.

Besides, this application has dark mode design, for the night usage.

## Code Structure

```
App.tsx
├── Navigation Setup
│   ├── MainPage
│   └── DisplayPage
│
pages/
├── MainPage.tsx
│   ├── Imports
│   │   ├── stylesheets/MainPage_StyleSheet.tsx
│   │   └── functions/API_Functions/apiRequest.ts (handleSearch)
│   └── Features
│       ├── Postcode Search
│       ├── Dark/Light Mode
│       └── Keyboard Handling
│
├── DisplayPage.tsx
│   ├── Imports
│   │   ├── stylesheets/DisplayPage_StyleSheet.tsx
│   │   ├── functions/Sorting_Functions/sortRestaurantData.ts
│   │   └── functions/Filtering_Functions/filter.ts
│   └── Features
│       ├── Restaurant List Display
│       ├── Sorting Functionality
│       └── Cuisine Filtering
│
functions/
├── API_Functions/
│   └── apiRequest.ts (handles restaurant data fetching)
├── Sorting_Functions/
│   └── sortRestaurantData.ts (handles restaurant sorting)
└── Filtering_Functions/
    └── filter.ts (handles cuisine filtering)
```

![UML-Diagram.png](https://i.postimg.cc/t4d8sPVH/UML-Diagram.png)

### Programming Interface
![Programming-Interface.png](https://i.postimg.cc/mrfM5zdh/Programming-Interface.png)

## Getting Started

**If you do not want to set up the project by yourself, you can download the "just-eat-assessment.apk" file from this link and install it on your Android devices.**

File URL: **https://1drv.ms/u/c/bd222029f4f1d186/EW7Dsus6IP9GoEl6OTqNcQwBfZCNtZq7gpMBjTHw5krYEg?e=1EiUmy**

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

**TO RUN THIS PROJECT, YOU MUST HAVE THE ANDROID EMULATOR ON YOUR COMPUTER OR ANDROID DEVICE CONNECTED TO THE COMPUTER**

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

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

**You need to connect you android/iOS Device to the computer, or your computer must have android/iOS emulator to run the following commands.**
  
***(I do not have a Mac computer to compile the iOS version)***

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

## Visuals

### MainPage

#### Light Mode
<img src="https://i.postimg.cc/28L79Dzc/Main-Page-Lightmode.png" alt="alt text" title="MainPage, LightMode">

#### Dark Mode
<img src="https://i.postimg.cc/kMpyy4dR/Main-Page-Darkmode.png" alt="alt text" title="MainPage, DarkMode">

### Display Page

Four data points are shown: name and rating on the top, laying horizontally with the logo. cuisines and address on the bottom, laying vertically.

#### Light Mode
<img src="https://i.postimg.cc/90RZkdjR/Display-Page-Lightmode.png" alt="alt text" title="DisplayPage, LightMode">

#### Dark Mode
<img src="https://i.postimg.cc/3NsmQkKL/Display-Page-Darkmode.png" alt="alt text" title="DisplayPage, DarkMode">

## Assumptions & Things not clear
The definition of "restaurant" is not specified. There are non-restaurants in the "restaurants" list, such as pharmacies and convenience stores. I assume that all entries are "restaurant" by definition.

The definition of "cuisine" is not specified. There are names such as "Local Legends" "Deals" "Freebies" in the cuisine list. By observation, in most scenarios the first two names in "cuisines" are truly cuisines.

## Potential Improvements

1. Better Displaying of Cuisine Items & Better Distinguishability of Restaurants / Non-Restaurants.
2. More custom components to increase modularity.
3. Better StyleSheet Design.
4. Restaurant Details in a full page when each restaurant card is clicked.
5. Tests for checking the returned data and the correct rendering of elements.
(Can be done by *Jest* and *@testing-library/react-native*: Restaurant card components with various data inputs, Search input component behavior, Sorting controls and their state changes, Navigation between MainPage and DisplayPage, Data passing between screens, Dark/light mode toggle behavior)
6. GeoPoint + Map Integration for navigation to the restaurant.