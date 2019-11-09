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

$(".google-signin").on("click", function (event) {
    console.log("is working?");
    firebase.auth().signInWithRedirect(provider);
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        console.log(displayName);
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // console.log(user);

        // user image
        // var userImage = $("<img>").attr("src", photoURL);

        $("#user-name-display").text(user.displayName);
        $(".welcome-button-username").empty();
        var userNameDisplay = $("<p>")
            .text(user.displayName)
            .attr("class", "welcome");
        $(".welcome-button-username").append(userNameDisplay);

        $("#user-image").attr("src", photoURL);
        $("#user-image2").attr("src", photoURL);
        // ...our-
    } else {
        // User is signed out.
        // This if statement checks if an element with the class of `google-signin` is on the page
        if (!$(".google-signin")) {
            // empty the welcome-button-display div
            $(".welcome-button-username").empty();
            // Create an img element with the src "assets/images/btn_google_signin_light_normal_web.png"
            $(".profile-pic").attr(
                "src",
                "assets/images/btn_google_signin_light_normal_web.png"
            );
        }
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
