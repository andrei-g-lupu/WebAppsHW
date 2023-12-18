const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let isEditState = false;

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveData();
            showTask();
        });

        let editButton = document.createElement("span");
        editButton.innerHTML = "\u270E";
        editButton.className = "edit-button";
        editButton.addEventListener("click", function () {
            toggleEditState(li, editButton);
        });

        li.appendChild(deleteButton);
        li.appendChild(editButton);

        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
    showTask();
}

function toggleEditState(li, editButton) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "text";
    textInput.value = li.querySelector('#editable').innerText;

    const editableSpan = document.createElement("span");
    editableSpan.id = "editable";
    editableSpan.className = "custom-checkbox";
    
    li.innerHTML = '';

    if (isEditState) {
        editableSpan.innerText = textInput.value;
        checkbox.style.display = 'inline';
        textInput.style.display = 'none';
    } else {
        editableSpan.innerText = li.innerText;
        checkbox.style.display = 'none';
        textInput.style.display = 'inline';
    }

    li.appendChild(checkbox);
    li.appendChild(textInput);
    li.appendChild(document.createElement("label").appendChild(editableSpan));

    editButton.innerText = isEditState ? "edit" : "save";
}



listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        showTask();
    } else if (e.target.classList.contains("delete-button")) {
        e.target.parentElement.remove();
        saveData();
        showTask();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
