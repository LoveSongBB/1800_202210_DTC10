var currentUser;
var currentUserID;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); // Global
        currentUserID = user.uid;

        // Add functions that you want to run when user is logged in
        matchUser();
        // console.log(getCurrentUserAnswerList(currentUser));
    } else {
        console.log("No one is signed in.");
        window.location.href = '/login.html';
    }
})

// TODO get this function to work.
function getCurrentUserAnswerList(currentUserParameter) {
    db.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (user) {
            if (currentUser == user) {
                return user.data().answerList;
            }
        })
    })
}

// Compares answerList of currentUser with answerList of every other user.
// Return the integer amount of matches between the two arrays.
function compareAnswerLists(yourUserAnswerList, otherUserAnswerList) {
    var matchCounter = 0;

    for (const element of yourUserAnswerList) {
        if (otherUserAnswerList.includes(element)) {
            matchCounter += 1;
        }
    }

    console.log(`matchCounter = ${matchCounter}`);
    return matchCounter;
}

function matchUser() {
    var userMatches = {};

    // Loop through users collection in firebase
    db.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (user) {
            console.log(user);
            var userAnswerList = user.data().answerList
            var userID = user.id;

            console.log(userID, " => ", userAnswerList);
            
            

            // TODO Append data directly to firebase. Append to currentUser document.
            if (currentUserID != userID) {
                userMatches[userID] = compareAnswerLists(['1', '3', '6', '10', '13'], userAnswerList);
                currentUser.update({
                    userMatchesMap: userMatches
                }).then(() => {
                    console.log('then() performed');
                })
            }

        });
    });



    console.log(userMatches);
    console.log(Object.values(userMatches));

    var testObject = {
        'a': 1,
        'b': 2
    }

    console.log(testObject);
    // TODO: obtain the max value in userMatches.

    // TODO: get the first 5 userID's that equal to the max value in userMatches.
}

function setup() {

}

$(document).ready(setup);