const ACCOUNT = "account";
const LOGIN = "login";
const ACCOUNT_NAME = "active account name";
const IN = "logged in";
const OUT = "logged out";
const SAVED_RESULT = "savedResult";

var numSavedResults;


function Redirect() {
    if (localStorage.getItem("pagePass") != "1"){
        if(localStorage.getItem(LOGIN) == IN){
            window.location.href= "Home.html";
        }else{
            window.location.href = "Register.html"
        }
    }else{
        localStorage.setItem("pagePass", "0");
    }
}

function GetId(id){
    return document.getElementById(id);
}

function RegisterLoad(){
    if(localStorage.getItem(LOGIN) == IN){
        window.location.href= "Home.html";
    }
}

function Register(){
    var accountName = GetId("txtRegister").value;
    if (GetId("txtRegister").value != ""){
        localStorage.setItem(ACCOUNT + accountName, accountName);
        localStorage.setItem(ACCOUNT_NAME , ACCOUNT + accountName);

        localStorage.setItem(LOGIN, IN);

        window.location.href= "Home.html";
    }else{
        GetId("divRegisterError").innerHTML = "*Please enter a name.";
    }

}

function LoadHome() {
    if(localStorage.getItem(LOGIN) == OUT || localStorage.getItem(LOGIN) == null){
        window.location.href= "Register.html";
    }
}

function Logout(){
    localStorage.setItem(LOGIN, OUT);
    window.location.href = "Register.html"
}

function ToInput(){
    localStorage.setItem("pagePass", "1");
    window.location.href = "Input.html";
}

function LoadInput() {
    Redirect();

    if(localStorage.getItem("nextStatus" + localStorage.getItem(ACCOUNT_NAME)) != null && localStorage.getItem("nextIncome" + localStorage.getItem(ACCOUNT_NAME)) != null){
        GetId("filingStatus").selectedIndex = parseInt(localStorage.getItem("nextStatus" + localStorage.getItem(ACCOUNT_NAME)));
        GetId("txtIncome").value = localStorage.getItem("nextIncome" + localStorage.getItem(ACCOUNT_NAME));
    }
}

function ToSavedResults(){
    localStorage.setItem("pagePass","1");
    window.location.href = "Saved Results.html";
}

function Calculate(){
    var status = GetId("filingStatus").selectedIndex;
    var income = parseFloat(GetId("txtIncome").value);

    if (income >= 0){
        if (status == 0){
            localStorage.setItem("inputtedStatus", "SI");
            if(income >= 415050){
                localStorage.setItem("calculatedBracket", "0.396");
                localStorage.setItem("calculatedTax", (income *0.396));
            }else if(income >= 413350){
                localStorage.setItem("calculatedBracket", "0.35");
                localStorage.setItem("calculatedTax", (income * 0.35));
            }else if (income >= 190150){
                localStorage.setItem("calculatedBracket", "0.33");
                localStorage.setItem("calculatedTax", (income * 0.33));
            }else if (income >= 91150){
                localStorage.setItem("calculatedBracket", "0.28");
                localStorage.setItem("calculatedTax", (income * 0.28));
            }else if (income >= 37650){
                localStorage.setItem("calculatedBracket", "0.25");
                localStorage.setItem("calculatedTax", (income * 0.25));
            }else if (income >= 9275){
                localStorage.setItem("calculatedBracket", "0.15");
                localStorage.setItem("calculatedTax", (income * 0.15));
            }else{
                localStorage.setItem("calculatedBracket", "0.1");
                localStorage.setItem("calculatedTax", (income * 0.1));
            }
        }else if(status == 1){
            localStorage.setItem("inputtedStatus", "MJ");
            if(income >= 466950){
                localStorage.setItem("calculatedBracket", "0.396");
                localStorage.setItem("calculatedTax", (income * 0.396));
            }else if(income >= 413350){
                localStorage.setItem("calculatedBracket", "0.35");
                localStorage.setItem("calculatedTax", (income * 0.35));
            }else if(income >= 231450){
                localStorage.setItem("calculatedBracket", "0.33");
                localStorage.setItem("calculatedTax", (income * 0.33));
            }else if(income >= 151900){
                localStorage.setItem("calculatedBracket", "0.28");
                localStorage.setItem("calculatedTax", (income * 0.28));
            }else if(income >= 75300){
                localStorage.setItem("calculatedBracket", "0.25");
                localStorage.setItem("calculatedTax", (income * 0.25));
            }else if(income >= 18550){
                localStorage.setItem("calculatedBracket", "0.15");
                localStorage.setItem("calculatedTax", (income * 0.15));
            }else{
                localStorage.setItem("calculatedBracket", "0.1");
                localStorage.setItem("calculatedTax", (income * 0.1));
            }
        }
        localStorage.setItem("inputtedIncome", income);

        if(GetId("chkSaveInput").checked == true){
            localStorage.setItem("nextStatus" + localStorage.getItem(ACCOUNT_NAME), status);
            localStorage.setItem("nextIncome" + localStorage.getItem(ACCOUNT_NAME), income);
        }


        localStorage.setItem("pagePass", "1");
        window.location.href = "Results.html";
    }else{
        GetId("divInputError").innerHTML = "*Please input a positive number for income.";
    }
}

function LoadResults(){
    Redirect();

    GetId("divName").innerHTML = localStorage.getItem(localStorage.getItem(ACCOUNT_NAME));
    GetId("divStatus").innerHTML = localStorage.getItem("inputtedStatus");
    GetId("divIncome").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("inputtedIncome") * 100)) / 100;
    GetId("divBracket").innerHTML = parseFloat(localStorage.getItem("calculatedBracket") * 100) + "%";
    GetId("divTax").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("calculatedTax")) * 100) / 100;
}

function Continue(){
    if(GetId("radNoSave").checked == true){
        window.location.href = "Home.html"
    }else if(GetId("radSave").checked == true){
        if (GetId("txtSaveName").value != "") {
            var arraySavedResult = [localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + " " + localStorage.getItem("inputtedStatus") + " " + localStorage.getItem("inputtedIncome") + " " + localStorage.getItem("calculatedBracket") + " " + localStorage.getItem("calculatedTax")];
            var stop = 0;
            for (var n = 0; stop == 0; n++) {
                if (localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n) == null) {
                    localStorage.setItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n, arraySavedResult);
                    localStorage.setItem("savedName" + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n, GetId("txtSaveName").value);
                    stop = 1;
                }
            }
            window.location.href = "Home.html"
        }else{
            GetId("divSaveError").innerHTML = "*Please enter a name for the result you are saving."
        }
    }
}

function ToHome(){
    window.location.href = "Home.html";
}

function LoadSavedResults(){
    Redirect();
    var stop = 0;
    if (localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + 0) == null){
        GetId("ListResults").innerHTML = "<tr><td>There are currently no saved results.</tr><td>";
    }else {
        for (var n = 0; stop == 0; n++){
            if (localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n) != null) {
                GetId("ListResults").innerHTML += "<tr><td><input type='checkbox' id='chkResult" + n + "'></td>" +
                    "<td><a href='Saved%20Result.html' onclick='GoToSavedResults(\"" + localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n) + "\"," + n + ")'>"
                    + localStorage.getItem("savedName" + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n) + "</a></td></tr>";

            }else {
                numSavedResults = (n - 1);
                GetId("ListResults").innerHTML += "<tr><td></td><td><input type = 'button' id='btnToCompare' onclick='ToCompareResults(numSavedResults)' value = 'Compare Results'></td>    <td><div class = error id='divErrorCompare'></div></td></tr>";
                stop = 1;
            }
        }
    }
}



function LoadSavedResult(){
    GetId("divSavedName").innerHTML = localStorage.getItem("activeName");
    GetId("divSavedStatus").innerHTML = localStorage.getItem("activeStatus");
    GetId("divSavedIncome").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeIncome")) * 100) / 100;
    GetId("divSavedBracket").innerHTML = parseFloat(localStorage.getItem("activeBracket")) * 100 + "%";
    GetId("divSavedTax").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeTax")) * 100) / 100;
    Redirect();
}

function Exit(){
    if(GetId("radNoDelete").checked == true){
        ToSavedResults();
    }else if(GetId("radDelete").checked == true){
        var arraySaves = [];
        var arrayNames = [];
        var deletedIndex = parseInt(localStorage.getItem("activeIndex"));
        var stop = 0;
        for (var n= 0; stop == 0; n++){
            if(localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n) != null){
                arraySaves.push(localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n));
                arrayNames.push(localStorage.getItem("savedName" + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + n));
            }else{
                arraySaves.splice(deletedIndex, 1);
                arrayNames.splice(deletedIndex, 1);

                for (var i = 0; i < arraySaves.length; i++){
                    localStorage.setItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + i, arraySaves[i]);
                    localStorage.setItem("savedName" + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + i, arrayNames[i]);
                }
                if(localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + (n - 1)) != null){
                    localStorage.removeItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + (n - 1));
                    localStorage.removeItem("savedName" + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + (n - 1));
                }
                stop = 1;
            }
        }
        ToSavedResults();
    }
}

function GoToSavedResults(savedArray, index){
    localStorage.setItem("pagePass", "1");

    var result = [];

    result = savedArray.split(' ');

    localStorage.setItem("activeName", result[0]);
    localStorage.setItem("activeStatus", result[1]);
    localStorage.setItem("activeIncome", result[2]);
    localStorage.setItem("activeBracket", result[3]);
    localStorage.setItem("activeTax", result[4]);

    localStorage.setItem("activeIndex", index);
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

function ConvertUS(){
    GetId("divSavedIncome").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeIncome")) * 100) / 100;
    GetId("divSavedTax").innerHTML = "$" + Math.round(parseFloat(localStorage.getItem("activeTax")) * 100) / 100;
}

function ToCompareResults(max) {
    var numChecked = 0;
    var Result1;
    var Result2;
    for(var c = 0; c <= max; c++){
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
        localStorage.setItem("pagePass", "1");
        window.location.href = "Compare Results.html"
    }else{
        GetId("divErrorCompare").innerHTML = "*Please select only 2 results to compare."
    }
}

function LoadCompareResults() {
    Redirect();

    var firstResult = parseInt(localStorage.getItem("firstResult"));
    var secondResult = parseInt(localStorage.getItem("secondResult"));

    var stringArray1 = localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + firstResult);
    var stringArray2 = localStorage.getItem(SAVED_RESULT + localStorage.getItem(localStorage.getItem(ACCOUNT_NAME)) + secondResult);

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
    GetId("divBracketCompare").innerHTML = Math.round(((parseFloat(secondArray[3]) - parseFloat(firstArray[3])) * 100) *100)/100 + "%";
    GetId("divTaxCompare").innerHTML = "$" + (parseFloat(secondArray[4]) - parseFloat(firstArray[4]));
}