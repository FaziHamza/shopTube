// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  defaultauth: 'fake-backend',
  serverApiUrl: "http://localhost:3000/",
  serverBaseUrl: "http://3.111.85.6:3000/",
  nestBaseUrl: "http://localhost:4500/",
  nestImageUrl: "http://localhost:4500",
  scopeUri: ["api://f30bf676-3da2-4b13-97fc-6bafdcc3bb2c/api-access"],
  tenantId: "3d73e268-e9b4-4525-96dc-6739e4b29a69",
  uiClienId: "9b39a661-f988-48a7-b354-a08f53477cb5",
  redirectUrl: "http://localhost:4200",
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
  msalConfig: {
    auth: {
      clientId: 'db563ed3-d364-44de-b47a-dffec066fe03',
      authority: 'https://login.microsoftonline.com/d41fa02a-0301-4b1b-b52c-3322590590ba'
    }
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me'
  }
};

// ng serve --host=0.0.0.0 --disable-host-check

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
