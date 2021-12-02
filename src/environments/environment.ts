// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBHjt1Mo-ASg8LhisrPlVT5JVYdEgoal1s",
    authDomain: "fbpolyglot.firebaseapp.com",
    databaseURL: "https://fbpolyglot-default-rtdb.firebaseio.com",
    projectId: "fbpolyglot",
    storageBucket: "fbpolyglot.appspot.com",
    messagingSenderId: "949810962627",
    appId: "1:949810962627:web:5b7b5e000c4ef0b5010276"
  }
};

// NOTICE: You have to change these values to Firebase Console > Project > Gear > Project Settings > Config > Firebase Config
// and then set the #####.csb.app as an authorized domain in Authentication > Sign-In Method > Authorized Domains > Add Domain.