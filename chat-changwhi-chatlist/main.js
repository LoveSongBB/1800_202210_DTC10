
var currentUser;
var ID;
var youruserId;


firebase.auth().onAuthStateChanged(user => {
    if (user) {

        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        read_display_Quote();
        insertName();
        getBookmarks(user)

        // populateCardsDynamically()

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


// demo 09
function read_display_Quote(){
    //console.log("inside the function")

    //get into the right collection
    db.collection("quotes").doc("tuesday")
    .onSnapshot(function(abcdefg) {
        //console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML=abcdefg.data().quote;
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

// demo 09 -- 




function make_temp_room() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("chatrooms");

    hikesRef.add({
        id: "room1",
        name: "changwhiTest, someone", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: 10,          //number value
        length_time: 60,     //number value
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hikesRef.add({
        id: "room2",
        name: "changwhiTest", //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: 10.5,      //number value
        length_time: 80,   //number value
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    hikesRef.add({
        id: "room3",
        name: "changwhiTest1", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: 8.2,        //number value
        length_time: 120,   //number value
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2022"))
    });
}


// function populateCardsDynamically(user) {

//     let hikeCardTemplate = document.getElementById("hikeCardTemplate");
//     let hikeCardGroup = document.getElementById("hikeCardGroup");

//     db.collection("chatrooms")
//         // .orderBy("length_time")            //NEW LINE;  what do you want to sort by?
//         // .limit(2)                       //NEW LINE:  how many do you want to get?
//         .get()
//         .then(allchatrooms => {
//             allchatrooms.forEach(doc => {
//                 var hikeName = doc.data().name; //gets the name field
//                 var hikeID = doc.data().id; //gets the unique ID field
//                 // var hikeLength = doc.data().length; //gets the length field
//                 let testHikeCard = hikeCardTemplate.content.cloneNode(true);
//                 testHikeCard.querySelector('.card-title').innerHTML = hikeName;

//                 //NEW LINE: update to display length, duration, last updated
//                 // testHikeCard.querySelector('.card-length').innerHTML = 
//                 // "Length: " + doc.data().length + " km <br>" +
//                 // "Duration: " + doc.data().length_time + "min <br>" +
//                 // "Last updated: " + doc.data().last_updated.toDate(); 

//                 testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);

//                 testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;

//                 //next 2 lines are new for demo#11
//                 //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
//                 //so later we know which hike to bookmark based on which hike was clicked
//                 //ps. this works because we have only one icon.
//                 //if you have other icons, you will need a unique selector
//                 testHikeCard.querySelector('i').id = 'save-' + hikeID;

//                 // this line will call a function to save the hikes to the user's document             
//                 testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);

//                 // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
//                 hikeCardGroup.appendChild(testHikeCard);
                
//             })

//         })
// }

// my chatting list

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
                        newCard.querySelector('.Counterpart').innerHTML = youruserId;
                        newCard.querySelector('.userID').innerHTML = userID;
                        newCard.querySelector('.link-primary').id = room_number
                        newCard.querySelector('a').onclick = () => getroomnb(room_number);


                        // newCard.querySelector('a').onclick = () => setHikeData(hikeID); 채팅창으로 이동하면서 채팅창 값 넘기기
                        // newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                        hikeCardGroup.appendChild(newCard);
                    

                })

            });
        })
}



// 방만들기



function make_room() {
    // 추후 저장할수 있게 도와주는 자료
    // let Title = document.getElementById("title").value;
    // let Level = document.getElementById("level").value;
    // let Season = document.getElementById("season").value;
    ID = document.getElementById("make_chat_input").value;
    // let Flooded = document.querySelector('input[name="flooded"]:checked').value;
    // let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;
    // console.log(Title, Level, Season, Description, Flooded, Scrambled);
    // let findID = localStorage.getItem("ID"); 안되면 이거해봐
    db.collection("users").where("name", "==", ID)
    .get()
    // 이것도 롤백
    .then(queryHike => {
        //see how many results you have got from the query
        // get the documents of query
        Hikes = queryHike.docs;

        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
        var thisHike = Hikes[0].data();
        youruserId = thisHike.userID;
        document.getElementById("counter").innerHTML = `<h1 id="title">제목${youruserId}</h1>`;
    }
    )



//.where  로컬스토리지에서 같은 ID를 찾아서 가져온다                     id
db.collection("users")
//define a document for a user with UID as a document ID
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
                    }).then(()=>{
                        saveBookmark(room_number)
                        saveroomnumber_count(room_number)
                        window.location.href = "../chat-changwhi-chatlist/chat-list.html"; //new line added
                    })
                    alert("여기까지는 옴")

                    
                })
                   
        } else {
            // No user is signed in.
        }
    });



}

// Add room number to users collection 
function saveBookmark(hikeID) {
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
    alert(youruserId)
    db.collection("users").doc(youruserId).set({
        group: firebase.firestore.FieldValue.arrayUnion(hikeID)
    }, {
        merge: true
    })
    .then(function () {
        alert("gm")


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

function getroomnb(id){
    localStorage.setItem ('roomnumber', id);
}
