// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_COUNTRIES: 'https://restcountries.eu/rest/v2',
  URL_REST: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyBX7Nb5YV5U27OAp1lt3WZRsxKKVO-opcg",
    authDomain: "countriesapp-d1fb8.firebaseapp.com",
    databaseURL: "https://countriesapp-d1fb8.firebaseio.com",
    projectId: "countriesapp-d1fb8",
    storageBucket: "countriesapp-d1fb8.appspot.com",
    messagingSenderId: "113883755978",
    appId: "1:113883755978:web:20dd28ea54f34d3857cb33",
    measurementId: "G-V845NN2T61"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
