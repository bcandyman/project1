// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyADKbhE6aoHk09vkJuHxIZ1ntqD0ND4lLA",
  authDomain: "waye-t.firebaseapp.com",
  databaseURL: "https://waye-t.firebaseio.com",
  projectId: "waye-t",
  storageBucket: "waye-t.appspot.com",
  messagingSenderId: "346428803689",
  appId: "1:346428803689:web:bd8036633443512c56f0f8",
  measurementId: "G-KLHSX37FDS"
};

firebase.initializeApp(firebaseConfig);
//Need functionality to be enabled we navigate to Firebase console

var provider = new firebase.auth.GoogleAuthProvider();

$(".google-signin").on("click", function(event) {
  console.log("is working?");
  firebase.auth().signInWithRedirect(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(user);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

// firebase
//   .auth()
//   .getRedirectResult()

//   .then(function(result) {
//     console.log(results);
//     if (result.credential) {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = result.credential.accessToken;
//       // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
//   })
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

console.log(firebase.auth().currentUser);
