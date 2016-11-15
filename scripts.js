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

function Calculate(){

}

function LoadSavedResults(){
    localStorage.setItem("debugList", "Debug Name");
    if (localStorage.getItem("debugList") == null){
        GetId("divListResults").innerHTML = "<tr><td>There are currently no saved results.</tr><td>";
    }else{
        //Use loop to iterate through each existing save. Each link should contain diffrent parameters for a called function.
        GetId("divListResults").innerHTML = "<tr><td><a href='Saved%20Result.html' onclick='GoToSavedResults(\"DebugName\", \"DebugStatus\", 25000, \"0.1\", 2500)'>"
            +localStorage.getItem("debugList")+"</a></tr></td>";
    }
}



function LoadSavedResult(){


    GetId("divSavedName").innerHTML = localStorage.getItem("activeName");
    GetId("divSavedStatus").innerHTML = localStorage.getItem("activeStatus");
    GetId("divSavedIncome").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeIncome")) * 100) / 100;
    GetId("divSavedBracket").innerHTML = parseFloat(localStorage.getItem("activeBracket")) * 100 + "%";
    GetId("divSavedTax").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeTax")) * 100) / 100;
}

function GoToSavedResults(name, status, income, bracket, tax){
    // Considering using an array for simplifying the program. For now, set debug placehoders.
    localStorage.setItem("activeName", name);
    localStorage.setItem("activeStatus", status);
    localStorage.setItem("activeIncome", income);
    localStorage.setItem("activeBracket", bracket);
    localStorage.setItem("activeTax", tax);
}

function Convert(){
    if (GetId("foreignCurrency").selectedIndex == 0){
        GetId("divSavedIncome").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeIncome")) * 1.36 *100) /100;
        GetId("divSavedTax").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeTax"))*1.36 * 100) / 100;
    } else if (GetId("foreignCurrency").selectedIndex == 1){
        GetId("divSavedIncome").innerHTML = "€" + Math.round(parseFloat(localStorage.getItem("activeIncome")) * 0.93 *100) /100;
        GetId("divSavedTax").innerHTML = "€" + Math.round(parseFloat(localStorage.getItem("activeTax"))* 0.93 * 100) / 100;
    } else if (GetId("foreignCurrency").selectedIndex == 2){
        GetId("divSavedIncome").innerHTML = "¥" + Math.round(parseFloat(localStorage.getItem("activeIncome")) * 108.14 *100) /100;
        GetId("divSavedTax").innerHTML = "¥" + Math.round(parseFloat(localStorage.getItem("activeTax"))* 108.14 * 100) / 100;
    }

}