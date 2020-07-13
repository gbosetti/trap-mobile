# REQUIREMENTS #

This application was developed using the following configuration:

Ionic:

   Ionic CLI         : 5.4.16 (/usr/lib/node_modules/ionic)
   Ionic Framework   : ionic1 1.3.4
   @ionic/v1-toolkit : 1.0.22

Cordova:

   Cordova CLI       : 9.0.0 (cordova-lib@9.0.1)
   Cordova Platforms : android 8.1.0
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.2.1, (and 4 other plugins)

Utility:

   cordova-res : not installed
   native-run  : not installed

System:

   Android SDK Tools : 26.1.1 (/home/gabi/Android/Sdk)
   NodeJS            : v10.20.1 (/usr/bin/node)
   npm               : 6.14.4
   OS                : Linux 4.15

npm i @ionic/lab --save-dev


# DEV ENVIRONMENT #

0. Set up the backend https://github.com/gbosetti/trap-backend

1. Clone the project and install dependencies:
```
git clone https://github.com/gbosetti/trap-mobile
cd trap-mobile
npm install
```

2. Run the command to start the Ionic app:
`ionic serve -l`

or:
`ionic cordova run android --device`

or:
`ionic cordova run android -l`
and visit `chrome://inspect/#devices`

3. To deploy:
`ionic cordova build android --prod`