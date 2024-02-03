// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  defaultauth: 'fake-backend',
  serverApiUrl:"http://localhost:3000/",
  serverBaseUrl:"http://3.111.85.6:3000/",
  // nestBaseUrl:"https://spectrum.expocitydubai.com:9443/",
  nestBaseUrl:"http://localhost:4600/",
  nestNewBaseUrl:"http://localhost:4600/",
  nestImageUrl:"http://campaigns.expocitydubai.com.s3-website.me-south-1.amazonaws.com/",
  applicationId : '651fa8129ce5925c4c89ced7',
  socketBackUrl: 'http://localhost:3101',
  dbMode:'dev_',
  websocketUrl:'http://192.168.194.232:8080',
  organizationId : '651fa6889ce5925c4c89cecb',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  recaptcha: {
    siteKey: '6LcZ59MnAAAAAEFG5x2mJoJ_ptOFR7O2hSX0HHx3',
  },
};


// ng build --configuration production --base-href https://spectrum.expocitydubai.com/

// ng serve --host=0.0.0.0 --disable-host-check

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
