//application theme
let moonIcon = document.getElementById("upper");
let lowermoonIcon = document.getElementById("lower");
let header = document.getElementById("header");
let xnoteTitle = document.getElementById("noteTitle");
let xnoteContent = document.getElementById("noteContent");
let ynoteTitle = document.getElementsByClassName("title");
let ynoteContent = document.getElementsByClassName("content");

var colorCheck = true;

function applicationTheme() {
   
    if (colorCheck) {
        document.body.style.backgroundColor = "#121212";
        header.style.backgroundColor = "#555555";
        xnoteTitle.style.color = "#F5F5F5";
        moonIcon.style.backgroundColor = "#eec660";
        xnoteContent.style.color = "#F5F5F5";
        lowermoonIcon.style.backgroundColor = "#555555";
        Array.from(ynoteTitle).forEach(function (elem) {
            elem.style.color = "#F5F5F5";
        });
        Array.from(ynoteContent).forEach(function (elem) {
            elem.style.color = "#F5F5F5";
        });
        colorCheck = false;
    } else {
        document.body.style.backgroundColor = "#f8f9f5";
        header.style.backgroundColor = "#eec660";
        xnoteTitle.style.color = "#000000";
        moonIcon.style.backgroundColor = "#121212";
        xnoteContent.style.color = "#000000";
        lowermoonIcon.style.backgroundColor = "#eec660";
        Array.from(ynoteTitle).forEach(function (elem) {
            elem.style.color = "#000000";
        });
        Array.from(ynoteContent).forEach(function (elem) {
            elem.style.color = "#000000";
        });
        colorCheck = true;
    }
}

//Defining an empty array
var notes = [];

//Getting #notesContainer division here
let actualNotesContainer = document.getElementById("notesContainer");

//Getting data from the local Storage
if (JSON.parse(localStorage.getItem("notes")) !== null) {
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach(function (element) {
        actualNotesContainer.innerHTML += `${element}`;
    });
}

//Calling date class
var realDate = new Date();

// Getting date division here
let date = document.getElementById("date");
//putting current date in the content of #date division
date.innerHTML = realDate.toLocaleDateString('pt-PT');
//Getting #noteTitle division here
let noteTitle = document.getElementById("noteTitle");

//Getting #noteContent division here
let noteContent = document.getElementById("noteContent");
let minimize = document.getElementById("minimize");
let addNote = document.getElementById("addNote");

//Function to minimize content window
function Minimize() {
    noteContent.style.display = "none";
    minimize.style.display = "none";
    addNote.style.display = "none";
    noteTitle.innerHTML = "Enter Title Here...";
}

//Displaying #noteContent division on clicking #noteTtile division
noteTitle.addEventListener("click", function (e) {
    noteTitle.contentEditable = "true";
    noteTitle.focus();
    if (noteTitle.innerHTML == "Enter Title Here...") {
        noteTitle.innerHTML = "";
        noteContent.style.display = "block";
        noteContent.style.transition = "display 10s";
        minimize.style.display = "inline-block";
        minimize.style.transition = "all 3s";
        addNote.style.display = "inline-block";
    }
});

//Function to get Enter Title Here...
noteTitle.addEventListener("blur", function () {
    if (noteTitle.innerHTML == "") {
        noteTitle.innerHTML = "Enter Title Here...";
    }
});

//Function to write in noteContent
noteContent.addEventListener("click", function (e) {
    noteContent.contentEditable = "true";
    noteContent.focus();
    if (noteContent.innerHTML == "Enter Content Here...") {
        noteContent.innerHTML = "";
    }
});

noteContent.addEventListener("blur", function () {
    if (noteContent.innerHTML == "") {
        noteContent.innerHTML = "Enter Content Here...";
    }
});

//Defining function to add note
function call() {

    let title = document.createElement("p");
    title.className = "title";
   
    if (
        noteTitle.innerHTML != "Enter Title Here..." &&
        noteTitle.innerHTML != ""
    ) {
        title.innerHTML = noteTitle.innerHTML;
    }else{
        title.style.display = "none";
    }
    let content = document.createElement("p");
    content.className = "content";
    
    if (
        noteContent.innerHTML != "Enter Content Here..." &&
        noteContent.innerHTML != "") {
        content.innerHTML = noteContent.innerHTML;
    }else{
       content.style.display = "none";
    }

    let parent = document.createElement("div");
    parent.className = `notes col-11 col-sm-5 mx-auto`;
    parent.innerHTML = `
        <button class="deleteBtn" onfocus="deleteNotes(this)"><span class="fa fa-trash w3-large"></span</button>
        <button class="minimizeBtn" onfocus="minimizeNote(this)" ><span class="fa fa-close w3-large"></span</button>
    `;
    let container = document.createElement("div");
    container.className = `noteContainer`;

    container.appendChild(title);
    container.appendChild(content);

    parent.appendChild(container);
    if (container.innerHTML == "") {
        Minimize();
    }
    else {
        let previousNote = document.querySelector(".notes");
        actualNotesContainer.insertBefore(parent, previousNote);
        noteContent.style.display = "none";
        addNote.style.display = "none";
        minimize.style.display = "none";
        noteTitle.innerHTML = "Enter Title Here...";
        noteContent.innerHTML = "Enter Content Here...";

        if (JSON.parse(localStorage.getItem("notes")) === null) {
            notes.unshift(parent.outerHTML);
            localStorage.setItem("notes", JSON.stringify(notes));
        } else {
            let notes = JSON.parse(localStorage.getItem("notes"));
            notes.unshift(parent.outerHTML);
            localStorage.setItem("notes", JSON.stringify(notes));
        }

    }
    calling();

}
var check = true;

function calling() {

    var realNotes = document.querySelectorAll('.noteContainer');

    realNotes.forEach(function (e) {
        check = true;

        var btnCheck = true;
        e.addEventListener("click", function (e) {
            let eleParent = this.parentElement;
            let eleContent = this;

            if (check) {
                realNotes.forEach(function (e) {

                    if (eleContent.innerText === e.innerText) {
                        eleParent.children[1].style.display = "inline-block";
                        eleParent.children[2].children[0].style.display = "block";
                        eleParent.children[2].children[1].style.display = "block";
                        eleContent.style.height = "auto";
                        eleContent.children[0].style.borderBottom = "2px solid #fab595";
                        eleContent.children[0].contentEditable = "true";
                        eleContent.children[1].contentEditable = "true";
                    } else {
                        e.parentElement.style.display = "none";
                    }
                });
            }
        });
    });
}
calling();

function deleteNotes(x) {
    let displayNotes = document.querySelectorAll(".notes");
    let notes = JSON.parse(localStorage.getItem("notes"));

    x.parentNode.remove();
    var i;
    displayNotes.forEach(function (elem, index) {
        if (elem.outerHTML === x.parentNode.outerHTML) {
            i = index;
        } else {
            elem.style.display = "block";
        }
    });

    notes.forEach(function (elem, index) {
        if (i == index) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    });
}

function minimizeNote(x) {
    let realNotes = document.querySelectorAll(".noteContainer");

    let eleContent = x.parentElement.children[2];
    eleContent.style.height = "50px";
    x.style.display = "none";
    if(eleContent.children[0].innerHTML == ""){
       eleContent.children[0].style.display = "none";
    }else{
        eleContent.children[0].style.display = "block";
    }
    if(eleContent.children[1].innerHTML == ""){
        eleContent.children[1].style.display = "none";
    }else{
        eleContent.children[1].style.display = "block";
    }
    eleContent.children[0].style.borderBottom = "none";
    eleContent.children[0].contentEditable = "false";
    eleContent.children[1].contentEditable = "false";
    realNotes.forEach(function (e) {
        e.parentElement.style.display = "block";
    });
    check = true;
    let i;
    let temp = [];
    let notes = document.querySelectorAll(".notes");
    notes.forEach(function(elem, index){
        if(x.parentElement.outerHTML === elem.outerHTML){
            i = index;
        }
    });
    temp = JSON.parse(localStorage.getItem("notes"));
    temp.forEach(function(elem, index){
        if(i == index){
            temp[i] = x.parentElement.outerHTML;
            localStorage.setItem("notes", JSON.stringify(temp));
        }
    });
}
