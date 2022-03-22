function matchUser() {
    var userMatchingAnswerListObject = {};

    var userMatchingAnswerListMap = new Map();

    // firebase.auth().onAuthStateChanged(userLoggedIn => {
    //     // Check if user is logged in.
    //     if (userLoggedIn) {
    //         // Loop through all the users in the "users" collection in firebase
    //         const querySnapshot = await getDocs(db.collection("users"));
    //         querySnapshot.forEach((user) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(user.id, " => ", user.data().answerList);
    //             // userMatchingAnswerListMap.set(string(user.id), user.data().answerList);
    //         });
    //     } else {
    //         // No one is logged in.
    //         console.log("No one is logged in");
    //     }
    // })

    // Loop through users collection in firebase
    // db.collection("users").get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (user) {
    //         // console.log(user.id, " => ", user.data().answerList);
    //         userMatchingAnswerListObject[String(user.id)] = user.data().answerList;
    //     });
    // });

    console.log(userMatchingAnswerListMap);

    // Loop through userMatchingAnswerListObject and compare the logged in users answerList with the other answerLists stored in firebase
    // var matchCounter = 0;

    // firebase.auth().onAuthStateChanged(user => {
    //     // check if user is logged in.
    //     if (user) {
    //         console.log(`user.uid = ${user.uid}`);
    //         // For some reason, the line below returns underfined. Don't know why.
    //         // console.log(`userMatchingAnswerListObject[user.uid] = ${userMatchingAnswerListObject[String(user.uid)]}`); 
    //         var loggedInUserAnswerList = userMatchingAnswerListObject[String(user.uid)];
    //         console.log(`loggedInUserAnswerList = ${loggedInUserAnswerList}`);
    //     } else {
    //         // No one is logged in.
    //         console.log("No user logged in");
    //     }
    // })

    // The code below regarding testObject is just a test. Doesn't really do anything.
    testMap = new Map();

    testMap.set('a', 1);
    testMap.set('b', 2);
    testMap.set('c', 3);
    console.log(testMap);
    console.log(`testMap.get('a') = ${testMap.get('a')}`);
}

function getAnswerList(userID) {
    // userID should be the user UID in string format of the user you need to look for.
    var userToSearch = db.collection("users").doc(userID);
    userToSearch.get().then(userDoc => {
        var userAnswerList = userDoc.data().answerList;
        console.log(`userAnswerList = ${userAnswerList}`);
    })
}

// Compares the logged in users answerList with another answerList and returns the integer amount of matched numbers they have.
function compareAnswerLists(yourUserAnswerList, otherUserAnswerList) {
    var matchCounter = 0;
    const array1 = ['1', '2', '3', '4'];
    const array2 = ['3', '4', '5', '6'];

    for (const element of yourUserAnswerList) {
        if (otherUserAnswerList.includes(element)) {
            matchCounter += 1;
        }
    }

    console.log(matchCounter);
}

function setup() {

}

$(document).ready(setup);