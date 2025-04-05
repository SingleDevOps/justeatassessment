## Just Eat Takeaway Takehome Assignment
This project is for just eat takeaway take-home assessment for the role of Early Career Program - Software Engineer. Its purpose is to search the restaurants by given UK postcodes and display the first ten restaurants from the searching result.

It is a mobile application for Android system, and potentially for iOS system for that it is built with React Native.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This application includes two pages:

> 1. MainPage
> 2. DisplayPage

This application does two things:

>  1. On **MainPage**, it validates the postcode, searches it and returns the first 10 restaurants for any valid UK postcode. This is done through two APIs: 

 - postcode.io validation api: https://postcodes.io/postcodes/${postcode}/validate
 
 - Just Eat Takeaway Endpoint API: 
 https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}

> 2. On **DisplayPage**, it can display the restaurant in the order of the returning data, or it can display the same restaurants by the sorting order of their ratings, from high to low, and from low to high.

Besides, this application has dark mode design, for the night usage.

# Getting Started

**If you do not want to set up the project by yourself, you can download the "just-eat-assessment.apk" file from this link and install it on your phone.**

File URL: **https://1drv.ms/u/c/bd222029f4f1d186/EZ_7mW2ID_9DvSmG2tnYHjMBMN1zQFAGWte0u17bvDLStA?e=kjjWcy**

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

  

## Step 1: Start Metro

**TO RUN THIS PROJECT, YOU MUST HAVE THE ANDROID EMULATOR ON YOUR COMPUTER OR ANDROID DEVICE CONNECTED TO THE COMPUTER**

First, open up your project folder in shell/cmd. 

Use this line to install all dependency packages.

    npm install

  

Second, you need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:
  

```sh

# Using npm

npm  start

  

# OR using Yarn

yarn  start

```

  

## Step 2: Build and run your app

  

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

**You need to connect you android/iOS Device to the computer, or your computer must have android/iOS emulator to run the following commands.** 
  
***(I do not have a Mac computer to compile the iOS version)***

### Android

  

```sh

# Using npm

npm  run  android

  

# OR using Yarn

yarn  android

```

  

### iOS

  

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

  

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

  

```sh

bundle  install

```

  

Then, and every time you update your native dependencies, run:

  

```sh

bundle  exec  pod  install

```

  

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

  

```sh

# Using npm

npm  run  ios

  

# OR using Yarn

yarn  ios

```

  



  

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

# Application Interface

## MainPage

### Light Mode
<img src="https://i.postimg.cc/vTsCzNKT/Main-Page-Lightmode.png" alt="alt text" title="MainPage, LightMode">

### Dark Mode
<img src="https://i.postimg.cc/RZZ5y2Zn/Main-Page-Darkmode.png" alt="alt text" title="MainPage, DarkMode">

## DisplayPage

### Light Mode
<img src="https://i.postimg.cc/3JW0rY7F/Display-Page-Lightmode.png" alt="alt text" title="DisplayPage, LightMode">

### Dark Mode
<img src="https://i.postimg.cc/wvVRMB70/Display-Page-Darkmode.png" alt="alt text" title="DisplayPage, DarkMode">

# Assumptions & Things not clear
The definition of "restaurant" is not specified. There are non-restaurants in the “restaurants” list, such as pharmacies and convenience stores. I assume that all entries are "restaurant" by definition.

The definition of "cuisine" is not specified. There are names such as "Local Legends" "Deals" "Freebies" in the cuisine list. By observation, in most scenarios the first two names in "cuisines" are truly cuisines.

# Potential Improvements

1. Better Displaying of Cuisine Items & Better Distinguishability of Restaurants / Non-Restaurants.
2. More components for each part of the **\<View>** to increase modularity.
3. Better StyleSheet Design.
4. Restaurant Details in a full page when each restaurant card is clicked.
5. Tests for checking the returned data and the correct rendering of elements.



  
  










