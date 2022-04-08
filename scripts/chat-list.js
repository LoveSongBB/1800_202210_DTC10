var currentUser;
var ID;
var youruserId;



firebase.auth().onAuthStateChanged(user => {
    if (user) {

        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        read_display_Quote();
        insertName();
        getBookmarks(user)

        // populateCardsDynamically()

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "/login.html";
    }
});


// demo 09
function read_display_Quote() {
    //console.log("inside the function")
    db.collection("quotes").doc("tuesday")
        .onSnapshot(function (abcdefg) {
            //console.log(tuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML = abcdefg.data().quote;
        })
}

read_display_Quote();

// Insert name function using the global variable "currentUser"

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

insertName();


function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var members = userDoc.data().group;

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
                    newCard.querySelector('.card-title').innerHTML = room_number;
                    newCard.querySelector('.Counterpart').innerHTML = "Member 1 : " + youruserId;
                    newCard.querySelector('.userID').innerHTML = "Member 2 : " + userID;
                    newCard.querySelector('.link-primary').id = room_number
                    newCard.querySelector('a').onclick = () => getroomnb(room_number);


                    // newCard.querySelector('a').onclick = () => setHikeData(hikeID); 채팅창으로 이동하면서 채팅창 값 넘기기
                    // newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                    hikeCardGroup.appendChild(newCard);


                })

            });
        })
}


function make_room() {
    ID = document.getElementById("make_chat_input").value;
    db.collection("users").where("name", "==", ID)
        .get()
        .then(queryHike => {
            Hikes = queryHike.docs;
            var thisHike = Hikes[0].data();
            youruserId = thisHike.userID;
            document.getElementById("counter").innerHTML = `<h1 id="title">제목${youruserId}</h1>`;
        })
    db.collection("users")
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    var mycode = userDoc.data().name;
                    var room_number = db.collection("eachRooms").doc().id

                    db.collection("eachRooms").add({
                            room_number: room_number,
                            members: firebase.firestore.FieldValue.arrayUnion(userID, youruserId),
                            mycode: mycode,
                            yourcode: ID,
                            userID: userID,
                            youruserId: youruserId,
                            userEmail: userEmail,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            saveroomnumber_my(room_number)
                            saveroomnumber_count(room_number)
                        })
                        .then(() => {
                            console.log("여기까지는 옴")
                            window.location.href = "../chat-changwhi/public/index.html"; //new line added
                        })
                })
        } else {
        }
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





function passroomnumber(expectedID) {
    console.log("실행됨");
    console.log(expectedID);
    $('.hiddenroomnumbertransfer').append(`${expectedID}`)

}


var make_chat = document.getElementById('make_chat');



$("#CardTemplate").on(".card-title", passroomnumber)

// changwhi localsotrage to chat function

function getroomnb(id) {
    localStorage.setItem('roomnumber', id);
}