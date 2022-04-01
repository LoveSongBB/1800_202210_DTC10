function populateDataFields() {
    // Loop through all users in the users collection.
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(user => {
            // UserIdToLoad is the user Id that you want to view.
            userIdToLoad = localStorage.getItem('goToUserIdProfile');

            if (user.id == userIdToLoad) {
                console.log(userIdToLoad);
                $('#paragraph-user-id').html(userIdToLoad);
                $('#h2-name').html(user.data().name);
                console.log(user.data().name)
            }
        })
    })
}

function setup() {
    populateDataFields();
}

$(document).ready(setup);