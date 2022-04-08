var currentUser_chat;
var ID_friendslist = null;
var youruserIdfrinedslist;
var test_user_name_send
// end
var currentUser;
var currentUserFriendList;
var currentUserID;


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.userID);   //global
        currentUserID = user.uid;

        // the following functions are always called when someone is logged in

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});
function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    // Loop through users collection and get the currentUsers friendlist.
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            var userId = user.id;

            if (currentUserID == userId) {
                currentUserFriendList = user.data().friendlist;
            }
        })
    })

    // Loop through users again and dynamically populate the page with the currentUsers friends from their friendlist.
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            var userId = user.id;

            // This dynamically populates the cards with the users friends.
            if (currentUserFriendList.includes(userId)) {
                var hikeName = user.data().name; //gets the name field
                var hikeID = user.data().userID; //gets the unique ID field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;
                testHikeCard.querySelector('#profile-button').value = user.id;

                testHikeCard.querySelector('#start_chat_function').id = hikeName
                // testHikeCard.querySelector('#start_chat_function').onclick = make_room_friendslist(this);

                hikeCardGroup.appendChild(testHikeCard);

            }
        })
    })
}



// chat creating function
function make_room_friendslist(src) {
    // 추후 저장할수 있게 도와주는 자료
    var counterpartid = src.id
    alert("counterpartid")
    // var ID_friendslist = document.getElementById("send_name_to_chat").innerHTML;
    db.collection("users").where("name", "==", counterpartid)
        .get()
        // 이것도 롤백
        .then(queryHike_chat => {
            var Hikes_chat = queryHike_chat.docs;
            var thisHike_chat = Hikes_chat[0].data();
            youruserIdfrinedslist = thisHike_chat.userID;
        })
    //.where  로컬스토리지에서 같은 ID를 찾아서 가져온다                     id
    db.collection("users")
    //define a document for a user with UID as a document ID
    firebase.auth().onAuthStateChanged(user => {
            var currentUser_chat = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser_chat.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    var mycode = userDoc.data().name;
                    var room_number = db.collection("eachRooms").doc().id

                    db.collection("eachRooms").add({
                        room_number: room_number,
                        members: firebase.firestore.FieldValue.arrayUnion(userID, youruserIdfrinedslist),
                        mycode: mycode,
                        yourcode: ID_friendslist,
                        userID: userID,
                        youruserId: youruserIdfrinedslist,
                        userEmail: userEmail,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        saveBookmark(room_number)
                        saveroomnumber_count(room_number)
                        getroomnb_frinedslist(room_number)
                    })
                    .then(() => {
                        window.location.href = "../chat-changwhi/public/index.html"; //new line added
                    })
                    
                })
    });
}




// Add room number to users collection 
function saveBookmark(hikeID) {
    alert(currentUserID);
    db.collection("users").doc(currentUserID).set({
            group: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("saved this chat room: " + currentUser);
        });

}
function saveroomnumber_count(hikeID) {
    db.collection("users").doc(youruserIdfrinedslist).set({
            group: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Save room number to counterpart's firebase")
        })
}
function getroomnb_frinedslist(id) {
    localStorage.setItem('roomnumber', id);
}
// chat creating function end




populateCardsDynamically();

function setHikeData(id){
    localStorage.setItem ('hikeID', id);
}

function clickProfileButtonOnCard() {
    let clickedCardUserId = $(this).val();
    localStorage.setItem('goToUserIdProfile', clickedCardUserId)
    window.location.href = "/html/user-matched-profile.html";
}

function setup() {
    $("body").on('click', '#profile-button', clickProfileButtonOnCard);
}

$(document).ready(setup);