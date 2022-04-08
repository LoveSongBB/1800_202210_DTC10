var currentUser;
var ID;
var youruserId;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);
        // the following functions are always called when someone is logged in
        read_display_Quote();
        getBookmarks(user)
        // populateCardsDynamically()
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "/login.html";
    }
});

function read_display_Quote() {
    db.collection("quotes").doc("tuesday")
        .onSnapshot(function (abcdefg) {
            //console.log(tuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML = abcdefg.data().quote;
        })
}


// Insert name function using the global variable "currentUser"
function insertName() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
    })
}


function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var members = userDoc.data().group;
            var logged_in_user_name = userDoc.data().name
            let CardTemplate = document.getElementById("CardTemplate");
            members.forEach(thisID => {
                console.log(thisID);
                db.collection("eachRooms").where("room_number", "==", thisID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    var doc = queryData[0].data();
                    var room_number = doc.room_number; //gets the name field
            
                    // var hikeID = doc.id; //gets the unique ID field
                    var userID = doc.yourcode; //gets the length field
                    var youruserId = doc.mycode; //gets the length field
                    let newCard = CardTemplate.content.cloneNode(true);
                    newCard.querySelector('.Counterpart').innerHTML = "Chat with " + youruserId;
                    if (logged_in_user_name == doc.mycode){
                        newCard.querySelector('.Counterpart').innerHTML = "Chat with " + userID;
                        name_send_to_chat = userID;
                    }
                    else{
                        newCard.querySelector('.Counterpart').innerHTML = "Chat with " + youruserId;
                        name_send_to_chat = youruserId;
                    }
                    newCard.querySelector('a').onclick = () => getroomnb(room_number, name_send_to_chat)

                    


                    hikeCardGroup.appendChild(newCard);
                })
            });
        })
}



function make_room_phase_1_get_counterpart() {
    ID = document.getElementById("make_chat_input").value;
    db.collection("users").where("name", "==", ID)
        .get()
        .then(queryHike => {
            Hikes = queryHike.docs;
            var thisHike = Hikes[0].data();
            youruserId = thisHike.userID;
        })
        .then(() => {
            make_room_phase_2_save_room_info_onthefirebase()   
        })
    }

function make_room_phase_2_save_room_info_onthefirebase(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    var mycode = userDoc.data().name;
                    var room_number_create = db.collection("eachRooms").doc().id
                    db.collection("eachRooms").add({
                            room_number: room_number_create,
                            members: firebase.firestore.FieldValue.arrayUnion(userID, youruserId),
                            mycode: mycode,
                            yourcode: ID,
                            userID: userID,
                            youruserId: youruserId,
                            userEmail: userEmail,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            saveroomnumber_my(room_number_create)
                            saveroomnumber_count(room_number_create)
                        })
                        .then(() => {
                            getroomnb(room_number_create)
                            window.location.href = "../chat-changwhi/public/index.html"; 
                        })
                })
        } else {}
    });
}

// Add room number to users collection 
function saveroomnumber_my(hikeID) {
    currentUser.set({
            group: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
        });
}

function saveroomnumber_count(hikeID) {
    console.log(youruserId)
    db.collection("users").doc(youruserId).set({
            group: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Save room number to counterpart's firebase")
        })
}

// changwhi localsotrage to chat function
function getroomnb(id, name) {
    localStorage.setItem('roomnumber', id);
    localStorage.setItem('name', name);

}
