function matchUser() {
    var userMatchingAnswerListObject = {};

    // Loop through users collection in firebase
    db.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (user) {
            // console.log(user.id, " => ", user.data().answerList);
            userMatchingAnswerListObject[String(user.id)] = user.data().answerList;
        });
    });

    console.log(userMatchingAnswerListObject);

    // Loop through userMatchingAnswerListObject and compare the logged in users answerList with the other answerLists stored in firebase
    var matchCounter = 0;

    firebase.auth().onAuthStateChanged(user => {
        // check if user is logged in.
        if (user) {
            console.log(`user.uid = ${user.uid}`);
            // For some reason, the line below returns underfined. Don't know why.
            // console.log(`userMatchingAnswerListObject[user.uid] = ${userMatchingAnswerListObject[String(user.uid)]}`); 
            var loggedInUserAnswerList = userMatchingAnswerListObject[String(user.uid)];
            console.log(`loggedInUserAnswerList = ${loggedInUserAnswerList}`);
        } else {
            // No one is logged in.
            console.log("No user logged in");
        }
    })

    // The code below regarding testObject is just a test. Doesn't really do anything.
    testObject = {
        a: [1, 2, 3],
        b: [4, 5, 6],
        c: [7, 8, 9]
    }

    testObject['d'] = [10, 11, 12];
    console.log(testObject);
    console.log(`testObject['a'] = ${testObject['a']}`);
}

function getAnswerList(userID) {
    // userID should be the user UID in string format of the user you need to look for.
    var userToSearch = db.collection("users").doc(userID);
    userToSearch.get().then(userDoc => {
        var userAnswerList = userDoc.data().answerList;
        console.log(`userAnswerList = ${userAnswerList}`);
    })
}

function setup() {

}

$(document).ready(setup);