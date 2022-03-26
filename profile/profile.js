function populateInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {
                // check user
                console.log(user)
                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            var userName = userDoc.data().name;
//                            var userEmail = userDoc.data().email;
                            var userCity = userDoc.data().city;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
//                            if (userEmail != null) {
//                                document.getElementById("emailInput").value = userEmail;
//                            }
                            if (userCity != null) {
                                document.getElementById("cityInput").value = userCity;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it
populateInfo();


function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
//    userEmail = document.getElementById('emailInput').value;     //get the value of the field with id="emailInput"
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"

    currentUser.update({
                    name: userName,
//                    email: userEmail,
                    city: userCity
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
    document.getElementById('personalInfoFields').disabled = true;
}


function insertName() {s
    // check if logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                console.log(currentUser)
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-profile").innerHTML = user_Name;
                // $("#name-main").text(user_Name);
            })
            console.log(user.uid); // give id who user who logged in
        }
    })
}
insertName();