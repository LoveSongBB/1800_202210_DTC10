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

function showDetails() {
    // create a URL object
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
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
                var biog = doc.data().bio;
    document.getElementById("bio-div").innerHTML = biog;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}
showDetails();







function saveBookmark(hikeID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + hikeID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

function setHikeData(userID){
    localStorage.setItem ('hikeID', userID);
}


//$(document).ready(setup);