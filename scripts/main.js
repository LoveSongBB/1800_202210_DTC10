function insertName() {
    // check if logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                
                var user_Name = userDoc.data().name;
               
                document.getElementById("name-main").innerHTML = user_Name;
               
            })
            
        }
    })
}
insertName();  // Commenting this line out breaks the code so watch out.

