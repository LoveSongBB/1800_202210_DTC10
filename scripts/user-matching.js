var currentUser;
var currentUserID;
var currentUserAnswerList;
var matchedUserIDArray = [];

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); // Global
        currentUserID = user.uid;

        // Add functions that you want to run when user is logged in
        matchUser();
    } else {
        console.log("No one is signed in.");
        window.location.href = '/login.html';
    }
})

// Compares answerList of currentUser with answerList of every other user.
// Return the integer amount of matches between the two arrays.
function compareAnswerLists(yourUserAnswerList, otherUserAnswerList) {
    var matchCounter = 0;

    for (const element in yourUserAnswerList) {
        if (otherUserAnswerList.includes(element)) {
            matchCounter += 1;
        }
    }
    return matchCounter;
}


function matchUser() {
    var userMatches = {};


    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            var userId = user.id;

            if (currentUserID == userId) {
                currentUserAnswerList = user.data().answerList;
            }
        })
    })

    // Loop through users collection in firebase
    db.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (user) {
            var userAnswerList = user.data().answerList
            var userID = user.id;

            // Append data directly to firebase. Append to currentUser document.
            if (currentUserID != userID && userAnswerList != undefined) {
                userMatches[userID] = compareAnswerLists(currentUserAnswerList, userAnswerList);
                currentUser.update({
                    userMatchesMap: userMatches
                })
            }

        });
    });

    // obtain the max value in userMatches.
    currentUser.get().then(userDoc => {
        var currentUserMatchesMap = userDoc.data().userMatchesMap
        var maxValue = 0;
        var matchCounter = 0;


        // How many user matches do you want? Set that value here.
        var desiredMatchAmount = 4;

        Object.values(currentUserMatchesMap).forEach(value => {
            if (value > maxValue) {
                maxValue = value;
            }
        })

        // Find the best matched user.
        for (const [key, value] of Object.entries(currentUserMatchesMap)) {
            if (value == maxValue && matchCounter < desiredMatchAmount) {
                matchedUserIDArray.push(key);
                matchCounter += 1;
            }
        }

        // if user still needs more matches, then find second best possible matches.
        if (matchCounter < desiredMatchAmount) {
            for (const [key, value] of Object.entries(currentUserMatchesMap)) {
                if (value == maxValue - 1 && matchCounter < desiredMatchAmount) {
                    matchedUserIDArray.push(key);
                    matchCounter += 1;
                }
            }
        }

        // if user still needs more matches, then find third best possible matches.
        if (matchCounter < desiredMatchAmount) {
            for (const [key, value] of Object.entries(currentUserMatchesMap)) {
                if (value == maxValue - 2 && matchCounter < desiredMatchAmount) {
                    matchedUserIDArray.push(key);
                    matchCounter += 1;
                }
            }
        }

        // if user still needs more matches, then find fourth best possible matches.
        if (matchCounter < desiredMatchAmount) {
            for (const [key, value] of Object.entries(currentUserMatchesMap)) {
                if (value == maxValue - 3 && matchCounter < desiredMatchAmount) {
                    matchedUserIDArray.push(key);
                    matchCounter += 1;
                }
            }
        }
    })

    // Populate cards dynamically with user matches.
    let userMatchesCardTemplate = document.getElementById("userMatchesCardTemplate");
    let userMatchesCardGroup = document.getElementById("userMatchesCardGroup");

    let buttonValue = 0;

    // This loops through all users in the collection.
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            var userId = user.id;
            var testUserMatchesCard = userMatchesCardTemplate.content.cloneNode(true);


            if (matchedUserIDArray.includes(userId)) {
                var userName = user.data().name
                var userBio = user.data().bio
                var userIdToDisplay = `userID: ${userId}`
                var hikeID = user.data().userID;



                testUserMatchesCard.querySelector('.card-title').innerHTML = userName;

                testUserMatchesCard.querySelector('.bio-card').innerHTML = userBio;

                testUserMatchesCard.querySelector('#add-friend-button').value = userId;
                testUserMatchesCard.querySelector('a').onclick = () => setUser(userID);
                testUserMatchesCard.querySelector('.read-more').href = "../html/user-matched-profile.html?userName="+userName +"&id=" + hikeID;
                userMatchesCardGroup.appendChild(testUserMatchesCard);

                buttonValue += 1;
            }
        })
    })
}

function clickProfileButtonOnCard() {
    let clickedCardUserId = $(this).val();
    localStorage.setItem('goToUserIdProfile', clickedCardUserId)
}

function clickAddFriendButtonOnCard() {
    // Add friend from usermatching
    let clickedCardUserId = $(this).val()

    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            
            if (user.id == clickedCardUserId) {
                currentUser.set({
                    friendlist: firebase.firestore.FieldValue.arrayUnion(clickedCardUserId)
                }, {
                    merge: true
                })
                window.alert(`You have added ${user.data().name} as a friend!`);
            }
        })
    })

}

function setup() {
    $("body").on('click', '#profile-button', clickProfileButtonOnCard);
    $("body").on('click', '#add-friend-button', clickAddFriendButtonOnCard);
}

function setUser(userID){
    localStorage.setItem ('userID', userID);
}

$(document).ready(setup);