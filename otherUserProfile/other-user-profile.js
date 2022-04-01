//function populateDataFields() {
//    // Loop through all users in the users collection.
//    db.collection('users').get().then(querySnapshot => {
//        querySnapshot.forEach(user => {
//            // UserIdToLoad is the user Id that you want to view.
//            userIdToLoad = localStorage.getItem('goToUserIdProfile');
//
//            if (user.id == userIdToLoad) {
//                console.log(userIdToLoad);
//                $('#paragraph-user-id').html(userIdToLoad);
//                $('#h2-name').html(user.data().name);
//                console.log(user.data().name)
//            }
//        })
//    })
//}
//
//function setup() {
//    populateDataFields();
//}
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
//    let testtest = document.getElementById("test");
    let params = new URL(window.location.href);
    let id = params.searchParams.get("id");                   //parse "id"
    let hikeName = params.searchParams.get("hikeName");   //parse "collection"

    let message = "Profile: " + hikeName;        //build message to display
//    message += " &nbsp | Document id is:  " + id;

    document.getElementById("HikeName").innerHTML = hikeName;
    document.getElementById("details-go-here").innerHTML = message;

    db.collection("users").where("userID", '==', id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
//            let testCard = testtest.content.cloneNode(true);
            // doc.data() is never undefined for query doc snapshots
                var hikeID = doc.data().userID;
                console.log(doc.id, " => ", doc.data());
                var biog = doc.data().bio;
                document.getElementById("bio-div").innerHTML = biog;
//                testCard.querySelector('i').id = 'save-' + hikeID;
//                // this line will call a function to save the hikes to the user's document
//                testCard.querySelector('i').onclick = () => saveBookmark(hikeID);

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
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
            //console.log(iconID);
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