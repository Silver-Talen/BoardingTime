if(active == "true" && userLevel == "admin"){
    //hide
    document.getElementById("login").style.display = "none";

    document.getElementById("sign_up").style.display = "none";

    //display
    document.getElementById("logout").style.display = "block";

    document.getElementById("account").style.display = "block";

    document.getElementById("admin").style.display = "block";
}
else if (active == "true"){
    //hide
    document.getElementById("login").style.display = "none";

    document.getElementById("sign_up").style.display = "none";

    document.getElementById("admin").style.display = "none";

    //display
    document.getElementById("logout").style.display = "block";

    document.getElementById("account").style.display = "block";
}
else{
    //hide
    document.getElementById("login").style.display = "block";

    document.getElementById("sign_up").style.display = "block";

    //display
    document.getElementById("logout").style.display = "none";

    document.getElementById("account").style.display = "none";

    document.getElementById("admin").style.display = "none";
}
