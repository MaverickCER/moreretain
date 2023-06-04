// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  clientId: "ASqHl3g6tveMC8S1X_cTYNitt9Pi_N2KeUEhb1pDxqgQ-jHDYuUIUPYYWHj_DQpkaOLnh-cMcyOux4xU",
  firebase: {
    apiKey: "AIzaSyCa2DE_eSuGoHBkQa5_ESYockxnm14erjo",
    authDomain: "moreretain.firebaseapp.com",
    databaseURL: "https://moreretain-default-rtdb.firebaseio.com",
    projectId: "moreretain",
    storageBucket: "moreretain.appspot.com",
    messagingSenderId: "640493345855",
    appId: "1:640493345855:web:6c332f7e3b9ece952bac8a",
    measurementId: "G-RSEL2QQ2DH"
  }
};

// NOTICE: You have to change these values to Firebase Console > Project > Gear > Project Settings > Config > Firebase Config
// and then set the #####.csb.app as an authorized domain in Authentication > Sign-In Method > Authorized Domains > Add Domain.