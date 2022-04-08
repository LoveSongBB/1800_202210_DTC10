var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
//        console.log(currentUser);

        // the following functions are always called when someone is logged in
//        populateCardsDynamically();
//        displaySearchValue();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../html/login.html";
    }
});


function displaySearchValue(){
    let userCardTemplate = document.getElementById("hikeCardTemplate");
    let userCardGroup = document.getElementById("hikeCardGroup");
//    console.log(document.getElementById("mySearch"));
    var x = document.getElementById("mySearch").value;



db.collection("users").where("name", ">=", x).limit(5)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var userName = doc.data().name;
            var hikeID = doc.data().userID;
            console.log(doc.userID, " => ", doc.data());
                let userCard = userCardTemplate.content.cloneNode(true);
                userCard.querySelector('.card-title').innerHTML = userName;
                 //gets the unique ID field
              userCard.querySelector('a').onclick = () => setHikeData(hikeID);
              userCard.querySelector('.read-more').href = "../html/other-user-profile.html?hikeName="+userName +"&id=" + hikeID;

                userCardGroup.appendChild(userCard);
        });
    });
}


function setup(){

   $("#mySearch").click(displaySearchValue);
}

function setHikeData(userID){
    localStorage.setItem ('hikeID', userID);
}

jQuery(document).ready(setup)
