if(active == "true" && userLevel == "admin"){
    //hide
    document.getElementById("login").style.display = "none";

    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("admin").style.display = "block";
    
    document.getElementById("account").style.display = "block";
    
    document.getElementById("logout").style.display = "block";
}
else if (active == "true"){
    //hide
    document.getElementById("admin").style.display = "none";
    
    document.getElementById("login").style.display = "none";
    
    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("account").style.display = "block";
    
    document.getElementById("logout").style.display = "block";
}
else{
    //hide
    document.getElementById("admin").style.display = "none";
    
    document.getElementById("account").style.display = "none";
    
    document.getElementById("logout").style.display = "none";   

    //display
    document.getElementById("login").style.display = "block";

    document.getElementById("sign_up").style.display = "block";
    
}