// Code that Hoda gave to Evon.

function forEvano() {
    db.collection("Hikes").where("id", "==", testID)
        .get()
        .then(result => {
            console.log("This is for Evano");
            const thisDoc = result.docs[0];
            let thisData = thisDoc.data();
            mapArray = thisData.thisMap;
            console.log(mapArray);
            Object.keys(mapArray).forEach(function(key,index) {
                // key: the name of the object key
                // index: the ordinal position of the key within the object 
                console.log(key);
                console.log(index);
            });
            
            
        })
}
forEvano()