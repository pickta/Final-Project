const ACCOUNT = "account";
const ACCOUNT_NUM = "account number";
const LOGIN = "login";
const IN = "logged in";
const OUT = "logged out";

function GetId(id){
    return document.getElementById(id);
}

function RegisterLoad(){
    if(localStorage.getItem(LOGIN) == IN){
       window.location.href= "Home.html";
    }
}

function Register(){
    var accountNum = 0;
    if(localStorage.getItem(ACCOUNT_NUM) != null){
        accountNum = localStorage.getItem("accountNum");
    }
    if (GetId("txtRegister").value != ""){
        localStorage.setItem(ACCOUNT + accountNum, GetId("txtRegister").value);
        accountNum++;
        localStorage.setItem(ACCOUNT_NUM, accountNum);

        var loggedIn = IN;
        localStorage.setItem(LOGIN, loggedIn);

        window.location.href= "Home.html";
    }else{
        GetId("divRegisterError").innerHTML = "*Please enter a name.";
    }

}

function Logout(){
    localStorage.setItem(LOGIN, OUT);
    window.location.href = "Register.html"
}

function ToInput(){
    window.location.href = "Input.html";
}

function ToSavedResults(){
    window.location.href = "Saved Results.html";
}