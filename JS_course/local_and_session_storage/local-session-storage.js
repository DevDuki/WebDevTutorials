// Local Storage

localStorage.setItem("todo", "Feed the cat"); //this can now be found in the browser's devtool under "Storage" or "Web-Speicher"
//You can also add an other entity
localStorage.setItem("Duki", "WebDev");

//But if you wanna extend and existing entity you must do the following

const todoList = ["feed the cat", "wash", "sleep"];

localStorage.setItem("todos", JSON.stringify(todoList));

//To get entities back from storage
const retrieveTodos = JSON.parse(localStorage.getItem("todos"));

console.log(retrieveTodos);



// Session Storage

//main difference is that once the browser gets closed, all sessionStorage is deleted
sessionStorage.setItem("todoList", "session feeding cat");




//if you wanna delete the locastorage then execute this
localStorage.clear();
