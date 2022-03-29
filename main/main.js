function insertName() {
    // check if logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                console.log(currentUser)
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-main").innerHTML = user_Name;
                // $("#name-main").text(user_Name);
            })
            console.log(user.uid); // give id who user who logged in
        }
    })
}
insertName();

function populateCardsDynamically() {
    let userMatchesCardTemplate = document.getElementById("userMatchesCardTemplate");
    let userMatchesCardGroup = document.getElementById("userMatchesCardGroup");

    db.collection('users').get().then(users => {
        users.forEach(doc => {
            var userName = doc.data().name
            var userEmail = doc.data().email
            console.log(`userName = ${userName}`);

            let testUserMatchesCard = userMatchesCardTemplate.content.cloneNode(true);
            testUserMatchesCard.querySelector('.card-title').innerHTML = userName;
            testUserMatchesCard.querySelector('.card-text').innerHTML = userEmail;

            userMatchesCardGroup.appendChild(testUserMatchesCard);
        })
    })
}
populateCardsDynamically();