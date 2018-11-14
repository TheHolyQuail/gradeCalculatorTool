var rowCount = 0;

function setUpPage() {

    document.getElementById("newCategory").defaultValue = "Homework";

    addRow();
    //adds the finals row
    addFinalRow();

    document.getElementById("noFin").style.display = "none";
    document.getElementById("final").style.display = "none";
}
function start() {
    document.getElementById("noFin").style.display = "inherit";
    document.getElementById("start").style.display = "none";
}
function addRow() {
    if(rowCount < 6) {
        rowCount++;

        var table = document.getElementById("mainTable");
        var fieldRow = document.createElement("tr");
        var labelRow = document.createElement("tr");

        var tdPoints = document.createElement("td");
        var tdWeight = document.createElement("td");
        var tdInptP = document.createElement("td");
        var tdInptW = document.createElement("td");
        var inpt1 = document.createElement("input");
        inpt1.setAttribute("placeholder","ex: 100,100,90");
        var inpt2 = document.createElement("input");

        var category = document.getElementById("newCategory").value;
        inpt1.setAttribute("id", "pts" + rowCount);
        inpt2.setAttribute("id", "wgt" + rowCount);

        tdPoints.innerHTML = category + " Points ";
        tdWeight.innerHTML = category + " Weight";

        tdPoints.style.color = "black";
        tdWeight.style.color = "black";

        tdInptP.append(inpt1);
        tdInptW.append(inpt2);

        labelRow.append(tdPoints);
        labelRow.append(tdWeight);

        fieldRow.append(tdInptP);
        fieldRow.append(tdInptW);

        table.append(labelRow);
        table.append(fieldRow);

        color(fieldRow, labelRow);

        //adds and updates default values to section weight input areas
        defaultWeight(rowCount);
    }
}

function defaultWeight(divider) {
    var defaultWeight = 100 / divider;
    for(var i = divider; i > 0; i--) {
        document.getElementById("wgt"+i).setAttribute("placeholder",defaultWeight.toString());
    }
}

function addFinalRow() {
    var table = document.getElementById("finalsTable");
    var fieldRow = document.createElement("tr");
    var labelRow = document.createElement("tr");

    var div = document.getElementById("dividerA");

    var tdGradeWanted = document.createElement("td");
    var tdWeight = document.createElement("td");
    var tdInptP = document.createElement("td");
    var tdInptW = document.createElement("td");
    var inpt1 = document.createElement("input");
    var inpt2 = document.createElement("input");


    var category = document.getElementById("newCategory").value;
    inpt1.setAttribute("id","wantedGrade");
    inpt2.setAttribute("id","finalWeight");

    inpt1.setAttribute("placeholder","ex: 90");
    inpt2.setAttribute("placeholder","ex: 20");

    tdGradeWanted.innerHTML = "_Semester Grade Wanted_";
    tdWeight.innerHTML = "_Grade Weight of Final_";

    tdGradeWanted.style.color = "black";
    tdWeight.style.color = "black";

    tdInptP.append(inpt1);
    tdInptW.append(inpt2);

    labelRow.append(tdGradeWanted);
    labelRow.append(tdWeight);

    fieldRow.append(tdInptP);
    fieldRow.append(tdInptW);

    table.append(labelRow);
    table.append(fieldRow);

    table.setAttribute("class","final");

    fieldRow.setAttribute("class","finalTable");
    labelRow.setAttribute("class","finalTable");
}

function color(f,l) {
    if(rowCount % 2 == 0) {
        c = "blue";
    }else if(rowCount % 2 ==1) {
        c = "yellow"
    }
    f.setAttribute("class",c);
    l.setAttribute("class",c);
}

//calculations

function noFinalGradeCalculation() {
    document.getElementById("error").innerHTML = "";

    var totalWeight = 0;

    for (var i = rowCount; i > 0; i--) {
        totalWeight += parseInt(document.getElementById("wgt" + i).value);
    }

    var currentGrade = 0;

    var average = 0;
    var points = "";
    var scoresArray = [];
    for (var ii = rowCount; ii > 0; ii--) {

        points = document.getElementById("pts" + ii).value;
        if(points.length < 1){
            error("03: You left one of the inputs blank");
            break;
        }
        scoresArray = points.split(",");

        for (var iii = 0; iii < scoresArray.length; iii++) {
            average += parseInt(scoresArray[iii]);
        }
        average = average / scoresArray.length;

        currentGrade += calcWeight(average, ii);

        average = 0;
    }

    noFinalGrade(currentGrade);

    if (currentGrade > 200) {
        //error
        error("01: either you did way too much extra credit, or the numbers entered were incorrect");
    } else if (currentGrade < 0) {
        //error
        error("02: I am POSITIVE that your grade is not possible");
    } else {
        document.getElementById("final").style.display = "inherit";
    }
}


function calcWeight(average, category){
    var weight = (document.getElementById("wgt" + category).value / 100);
    if(weight.length < 1){
        error("03: You left one of the inputs blank");
    }
    return average * weight;
}

function noFinalGrade(grade) {
    var letter = "";
    if (grade >= 90) {
        letter = " an A";
    } else if(grade >= 80){
        letter = " an B";
    } else if(grade >= 70){
        letter = " an C";
    } else if(grade >= 60){
        letter = " an D";
    } else {
        letter = " an F";
    }

    document.getElementById("gradeW/FinPercentage").innerHTML = "You have a " + grade + "%";

    document.getElementById("gradeW/FinText").innerHTML = "Your current grade is" + letter;
}

function calculateFinal(){
    document.getElementById("error").innerHTML = "";

    var curGrade = document.getElementById("gradeW/FinPercentage").innerHTML;

    console.log(curGrade);

    var l = curGrade.length;
    curGrade = curGrade.substring(11,l-1);
    curGrade = parseInt(curGrade);

    console.log(curGrade);

    var finalWeight = document.getElementById("finalWeight").value;
    var finalDesired = document.getElementById("wantedGrade").value;

    if(finalWeight.length < 1 || finalDesired.length < 1){
        error("03: You left one of the inputs blank");
    }else {
        finalWeight = parseInt(finalWeight);
        finalDesired = parseInt(finalDesired);
        var currentWeight = 1 - (finalWeight / 100);
        var weightedCurrent = curGrade * currentWeight;
        var finalGradeRequired = (finalDesired - weightedCurrent) / (finalWeight / 100);

        document.getElementById("neededGrade").innerHTML = "Scoring " + finalGradeRequired.toString().slice(0, 5) + "% on your final is required to get a " + finalDesired + "% as your semester grade";
        console.log(finalGradeRequired);
    }
}

function error(text) {
    document.getElementById("error").innerHTML = "ERROR: " + text;
}

