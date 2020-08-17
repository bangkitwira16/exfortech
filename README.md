# MrCashback

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "C:\\Users\\Bangkit Wira\\Documents\\framework7\\MrCashback",
  "type": [
    "web",
    "cordova"
  ],
  "name": "MrCashback",
  "pkg": "com.exfortech.mrcashback",
  "framework": "vue",
  "template": "split-view",
  "cssPreProcessor": "scss",
  "bundler": "webpack",
  "cordova": {
    "folder": "cordova",
    "platforms": [
      "ios",
      "android"
    ],
    "plugins": [
      "cordova-plugin-statusbar",
      "cordova-plugin-keyboard",
      "cordova-plugin-splashscreen"
    ]
  },
  "webpack": {
    "developmentSourceMap": true,
    "productionSourceMap": true,
    "hashAssets": false,
    "preserveAssetsPaths": false,
    "inlineAssets": true
  },
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false
}
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build-dev` - build web app using development mode (faster build without minification and optimization)
* 🔧 `build-prod` - build web app for production
* 📱 `build-dev-cordova` - build cordova app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova` - build cordova app
* 📱 `build-dev-cordova-ios` - build cordova iOS app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova-ios` - build cordova iOS app
* 📱 `build-dev-cordova-android` - build cordova Android app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova-android` - build cordova Android app

## DEMO Purpose
This app contain two user role admin and author, where two of user roles could post a photo using camera. And for extra admin roles it could remove photo from photo list. All of user and photo data stored using localStorage. To test app using camera it needs to build using `build-dev-cordova-android` or you culd use apk from `cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk` directories.

*  `admin` - for admin use admin@mail.com for username and admin123 for password
*  `user/author` - for user or author please register first