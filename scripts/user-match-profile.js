
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in



    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function showDetails() {
    // create a URL object

    let params = new URL(window.location.href);
    console.log(params)
    let id = params.searchParams.get("id");
                    console.log(id)//parse "id"
    let hikeName = params.searchParams.get("name");
       console.log(hikeName)//parse "collection"


    db.collection("users").where("userID", '==', id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

                var hikeID = doc.data().userID;
                console.log(doc.id, " => ", doc.data());
                var biog = doc.data().bio;
                var userName = doc.data().name;
                document.getElementById("bio-div").innerHTML = biog;
                 document.getElementById("HikeName").innerHTML = userName;


        });
    })
    .catch((error) => {
        console.log("Error getting data: ", error);
    });

}
showDetails();



function saveBookmark(hikeID) {
    currentUser.set({
            friendlist: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Add a friend: " + currentUser);
            var iconID = 'save-' + hikeID;
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

function setHikeData(userID){
    localStorage.setItem ('hikeID', userID);
}




function addFriend(){
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");
        let params = new URL(window.location.href);
    let id = params.searchParams.get("id");
    db.collection("users").where("userID", '==', id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                var hikeName = doc.data().name; //gets the name field
                var hikeID = doc.data().userID; //gets the unique ID field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('i').id = 'save-' + hikeID;
                // this line will call a function to save the hikes to the user's document
                testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);
                hikeCardGroup.appendChild(testHikeCard);
            })
        })
}

addFriend();

function setup(){

   $("#test2").click(addFriend);
}


$(document).ready(setup);