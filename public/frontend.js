window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
if(active == "true" && userLevel == "admin"){
    //hide
    document.getElementById("login").style.display = "none";

    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("admin").style.display = "block";
    
    document.getElementById("account").style.display = "block";
    
    document.getElementById("logout").style.display = "block";

    document.getElementById("post").style.display = "inline";

    document.getElementById("delete").style.display = 'block'

    var query = document.querySelectorAll('a[href*="/deleteMessage/');
    query.forEach(element => {
        element.style.display = "block";
    });

    for(var i = 0; i < messages.length - 1; i++){
        if(document.getElementsByName("editButton" + username)[i]){
            document.getElementsByName("editButton" + username)[i].style.display = "block";
        }
    }
}
else if (active == "true"){
    document.getElementById("admin").style.display = "none";
    
    document.getElementById("login").style.display = "none";
    
    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("account").style.display = "block";
    
    document.getElementById("logout").style.display = "block";

    document.getElementById("post").style.display = "inline";

    for(var i = 0; i < messages.length - 1; i++){
        if(document.getElementsByName("editButton" + username)[i]){
            document.getElementsByName("editButton" + username)[i].style.display = "block";
            document.getElementsByName("deleteButton" + username)[i].style.display = "block";
        }
    }
}
else{
    //hide
    document.getElementById("admin").style.display = "none";
    
    document.getElementById("account").style.display = "none";
    
    document.getElementById("logout").style.display = "none";

    document.getElementById("delete").style.display = "none";

    document.getElementById("edit").style.display = "none";

    document.getElementById("post").style.display = "none";

    //display
    document.getElementById("login").style.display = "block";

    document.getElementById("sign_up").style.display = "block";   
}