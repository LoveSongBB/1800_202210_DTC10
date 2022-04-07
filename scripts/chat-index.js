//var currentUser;
//
//
//
//
//
//// Test javascript
//
////function sum(a, b) {
////  return a + b;
////}
////console.log(sum(2, 2));
////console.log(sum(1, 5));
//
//
//firebase.auth().onAuthStateChanged(user => {
//    if (user) {
//
//        currentUser = db.collection("users").doc(user.uid); //global
//        console.log(currentUser);
//
//        // the following functions are always called when someone is logged in
////        read_display_Quote();
////        insertName();
//        getBookmarks(user)
//
//        // populateCardsDynamically()
//
//    } else {
//        // No user is signed in.
//        console.log("No user is signed in");
//        window.location.href = "login.html";
//    }
//});
//
//
//
//function getBookmarks(user) {
//    db.collection("users").doc(user.uid).get()
//        .then(userDoc => {
//            var members = userDoc.data().group;
//            let CardTemplate = document.getElementById("CardTemplate");
//            members.forEach(thisID => {
//                console.log(thisID);
//                db.collection("eachRooms").where("room_number", "==", thisID).get().then(snap => {
//                    size = snap.size;
//                    queryData = snap.docs;
//                    var doc = queryData[0].data();
//                    var userID = doc.yourcode; //gets the length field
//                    let newCard = CardTemplate.content.cloneNode(true);
//                    newCard.querySelector('.userID').innerHTML = "Member 2 : " + userID;
//
//                    hikeCardGroup.appendChild(newCard);
//
//
//                })
//
//            });
//        })
//}
