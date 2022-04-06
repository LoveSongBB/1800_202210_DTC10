var currentUser;
var currentUserFriendList;
var currentUserID;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.userID);   //global
        currentUserID = user.uid;
        console.log(currentUser);

        // the following functions are always called when someone is logged in

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    // Loop through users collection and get the currentUsers friendlist.
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            var userId = user.id;

            if (currentUserID == userId) {
                currentUserFriendList = user.data().friendlist;
            }
        })
    })

    // Loop through users again and dynamically populate the page with the currentUsers friends from their friendlist.
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            var userId = user.id;

            if (currentUserFriendList.includes(userId)) {
                var hikeName = user.data().name; //gets the name field
                var hikeID = user.data().userID; //gets the unique ID field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;

                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;
                hikeCardGroup.appendChild(testHikeCard);
            }
        })
    })
}

populateCardsDynamically();

function setHikeData(id){
    localStorage.setItem ('hikeID', id);
}