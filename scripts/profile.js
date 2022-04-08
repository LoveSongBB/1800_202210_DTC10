


function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userEmail = document.getElementById('emailInput').value;     //get the value of the field with id="emailInput"
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
    userBio = document.getElementById('bioInput').value;        //get the value of the field with id="bioInput"
        userOcc = document.getElementById('occInput').value;

    currentUser.update({
                    name: userName,
                    bio: userBio,
                    email: userEmail,
                    city: userCity,
                    occupation: userOcc
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
    document.getElementById('personalInfoFields').disabled = true;
}

function insertName() {
    // check if logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                console.log(currentUser)
                var user_Name = userDoc.data().name;
                var bio_Text= userDoc.data().bio;
                var userOcc = userDoc.data().occupation;
                console.log(user_Name);
                document.getElementById("name-profile").innerHTML = user_Name;
                document.getElementById("bio-profile").innerHTML = bio_Text;
                document.getElementById("occ-profile").innerHTML = userOcc;

                // $("#name-main").text(user_Name);
            })
            console.log(user.uid); // give id who user who logged in
        }
    })
}
insertName();