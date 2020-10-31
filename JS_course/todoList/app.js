//Selectors
const todoInput    = document.querySelector(".todo-input");
const todoButton   = document.querySelector(".todo-button");
const todoList     = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", updateStatus);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

//Functions
function addTodo(event){
    event.preventDefault(); //Prevents the form to refresh the page when pushing the submit button

    //Creating an entire Todo with its controls

    //div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    //check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");

    //Append everythign into the div
    todoDiv.append(newTodo, completedButton, deleteButton);

    //Append the div into the ul
    todoList.appendChild(todoDiv);

    //add the Todo into the local storage
    saveLocalTodos(todoInput.value);

    //Reset the input after the todo is added
    todoInput.value = "";
};

function updateStatus(e){
    const item = e.target;
    
    //taking the div element
    const todo = item.parentElement;

    //Delete the todo
    if(item.classList[0] === "delete-btn"){
        //Add fall style class
        todo.classList.add("fall");
        //removing the div element
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        //remove the todo from local storage
        removeTodo(todo);
    }

    //Check the todo
    if(item.classList[0] === "complete-btn"){
        //add completed style class
        todo.classList.toggle("completed");
    }
};

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });

};

function saveLocalTodos(todo){
    let todos;
    //Check if local storage alrdy holds any todos
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");

        //check button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");

        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add("delete-btn");

        //Append everythign into the div
        todoDiv.append(newTodo, completedButton, deleteButton);

        //Append the div into the ul
        todoList.appendChild(todoDiv);
    });
}

function removeTodo(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};