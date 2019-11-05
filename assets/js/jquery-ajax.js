<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
login(form) {
    var un = form.Username.value;
    var pw = form.Password.value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", "Login", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            loginResults();:exploding_head:
//Here is the event listener
window.addEventListener(window,"load", function() {
var loginForm = document.getElementById("LoginForm");
window.addEventListener(loginForm, "submit", function() {
     login(loginForm);
 });
});