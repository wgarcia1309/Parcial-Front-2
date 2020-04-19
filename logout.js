$("#log-out").click(function() {
    localStorage.clear();
    firebase.auth().signOut();
});