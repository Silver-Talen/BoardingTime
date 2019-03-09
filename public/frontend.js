if(active){
    //hide
    document.getElementById("login").disable = true;
    document.getElementById("login").hidden = true;

    document.getElementById("sign_up").disable = true;
    document.getElementById("sign_up").hidden = true;

    //display
    document.getElementById("logout").disable = false;
    document.getElementById("logout").hidden = false;

    document.getElementById("account").disable = false;
    document.getElementById("account").hidden = false;
}
else{
    document.getElementById("login").disable = false;
    document.getElementById("login").hidden = false;

    document.getElementById("sign_up").disable = false;
    document.getElementById("sign_up").hidden = false;
    
    document.getElementById("logout").disable = true;
    document.getElementById("logout").hidden = true;

    document.getElementById("account").disable = true;
    document.getElementById("account").hidden = true;
}
