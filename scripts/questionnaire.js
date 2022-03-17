function getUserAnswerListValues() {
    console.log("other function called");

    let values = [];
    var checkBoxes = document.querySelectorAll('input[name="listGroupCheckableRadios"]:checked');
    checkBoxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });

    console.log(values)
    return values;
}

function getUserAnswerList() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Append answerList to document of the user logged in.
            db.collection("users").doc(user.uid).update({
                answerList: getUserAnswerListValues()
            }).then(() => {
                console.log("then() performed");
                window.location.href = "main.html";
            })

        } else {
            console.log("No user is signed in.")
        }
    });

}






function setup() {
    $("#get-profile").click(getUserAnswerList);
}

$(document).ready(setup);