const ACCOUNT = "account";
const ACCOUNT_NUM = "account number";
const LOGIN = "login";
const IN = "logged in";
const OUT = "logged out";

var numSavedResults;



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

function ToHome(){
    window.location.href = "Home.html";
}

function LoadSavedResults(){

    //Placeholder results for development purposes.
    localStorage.setItem("debugList", "Debug Name");
    localStorage.setItem("debugList2", "Debug Name2");
    localStorage.setItem("debugList3", "Debug Name3");


    if (localStorage.getItem("debugList") == null){
        GetId("ListResults").innerHTML = "<tr><td>There are currently no saved results.</tr><td>";
    }else{
        //Use loop to iterate through each existing save. Each link should contain diffrent parameters for a called function.
        GetId("ListResults").innerHTML += "<tr><td><input type='checkbox' id='chkResult0'></td>" +
            "<td><a href='Saved%20Result.html' onclick='GoToSavedResults(\"DebugName\", \"DebugStatus\", 25000, \"0.1\", 2500)'>"
            +localStorage.getItem("debugList")+"</a></td></tr>";
        GetId("ListResults").innerHTML += "<tr><td><input type='checkbox' id='chkResult1'></td>" +
            "<td><a href='Saved%20Result.html' onclick='GoToSavedResults(\"DebugName2\", \"DebugStatus2\", 50000, \"0.25\", 12500)'>"
            +localStorage.getItem("debugList2")+"</a></td></tr>";
        GetId("ListResults").innerHTML += "<tr><td><input type='checkbox' id='chkResult2'></td>" +
            "<td><a href='Saved%20Result.html' onclick='GoToSavedResults(\"DebugName3\", \"DebugStatus3\", 15000, \"0.1\", 1500)'>"
            +localStorage.getItem("debugList3")+"</a></td></tr>";
        numSavedResults = 2;
        GetId("ListResults").innerHTML += "<tr><td></td><td><input type = 'button' id='btnToCompare' onclick='ToCompareResults(numSavedResults)' value = 'Compare Results'></td></tr>"
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

function ToCompareResults(max) {
    var numChecked = 0;
    var Result1;
    var Result2;
    for(c = 0; c <= max; c++){
        if (GetId("chkResult" + c).checked){
            numChecked++;
            if (Result2 == null){
                if(Result1 == null){
                    Result1 = c;
                }else{
                    Result2 = c;
                }
            }
        }
    }

    if(numChecked == 2){
        localStorage.setItem("firstResult", Result1);
        localStorage.setItem("secondResult", Result2);
        window.location.href = "Compare Results.html"
    }else{
        GetId("divErrorCompare").innerHTML = "Please select only 2 results to compare."
    }
}

function LoadCompareResults() {

    //Placeholder keys for placeholder arrays.
    localStorage.setItem("keyDebug0", "DebugName DebugStatus 25000 0.1 2500");
    localStorage.setItem("keyDebug1", "DebugName2 DebugStatus2 50000 0.25 12500");
    localStorage.setItem("keyDebug2", "DebugName3 DebugStatus3 15000 0.1 1500");

    var firstResult = parseInt(localStorage.getItem("firstResult"));
    var secondResult = parseInt(localStorage.getItem("secondResult"));

    var stringArray1 = localStorage.getItem("keyDebug" + firstResult);
    var stringArray2 = localStorage.getItem("keyDebug" + secondResult);

    var firstArray = stringArray1.split(' ');
    var secondArray = stringArray2.split(' ');

    GetId("divNameResult1").innerHTML = firstArray[0];
    GetId("divStatusResult1").innerHTML = firstArray[1];
    GetId("divIncomeResult1").innerHTML = "$" +  firstArray[2];
    GetId("divBracketResult1").innerHTML = (parseFloat(firstArray[3]) *100) + "%" ;
    GetId("divTaxResult1").innerHTML = "$" + firstArray[4];

    GetId("divNameResult2").innerHTML = secondArray[0];
    GetId("divStatusResult2").innerHTML = secondArray[1];
    GetId("divIncomeResult2").innerHTML = "$" + secondArray[2];
    GetId("divBracketResult2").innerHTML = (parseFloat(secondArray[3]) *100) + "%" ;
    GetId("divTaxResult2").innerHTML = "$" + secondArray[4];

    GetId("divIncomeCompare").innerHTML = "$" + (parseFloat(secondArray[2]) - parseFloat(firstArray[2]));
    GetId("divBracketCompare").innerHTML = (parseFloat(secondArray[3]) - parseFloat(firstArray[3])) * 100 + "%";
    GetId("divTaxCompare").innerHTML = "$" + (parseFloat(secondArray[4]) - parseFloat(firstArray[4]));
}