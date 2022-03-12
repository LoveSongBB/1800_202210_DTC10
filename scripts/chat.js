// send message function

function calculator(){
    text = $("#textmessage").val();
    result = text
    styled_result = '<div class="message message-out">'+'<a href="#" data-bs-toggle="modal" data-bs-target="#modal-profile" class="avatar avatar-responsive">'+'<img class="avatar-img" src="assets/img/avatars/1.jpg" alt="">'+'</a>'+'<div class="message-inner">'+'<div class="message-body">'+'<div class="message-content">'+'<div class="message-text">'+'<p class="firebase_stored">'+ result+'</p>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'
    old_div_content = jQuery('#chatmain').html();
    new_div_content = old_div_content + styled_result;
    jQuery('#chatmain').html(new_div_content); 

// Firebase

    var sendmessages = db.collection("chattest").doc("chattest");
    sendmessages.add({
        chattestlist: text});

}

// send message function








// Firebase data base
function setup(){
    console.log("document was called")
    $("body").on("click", "#sendmessage", calculator)

}

$(document).ready(setup)



