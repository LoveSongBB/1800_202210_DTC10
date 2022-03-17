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