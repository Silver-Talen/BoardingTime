for(var i = 0; i < messages.length; i++){
    console.log(messages);
}
if(active == "true" && userLevel == "admin"){
    //hide
    document.getElementById("login").style.display = "none";

    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("admin").style.display = "block";
    
    document.getElementById("account").style.display = "block";
    
    document.getElementById("logout").style.display = "block";

    document.getElementById("delete").style.display = "block";

    document.getElementById("post").style.display = "inline";
}
else if (active == "true"){
    document.getElementById("admin").style.display = "none";
    
    document.getElementById("login").style.display = "none";
    
    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("account").style.display = "block";
    
    document.getElementById("logout").style.display = "block";

    document.getElementById("post").style.display = "inline";
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