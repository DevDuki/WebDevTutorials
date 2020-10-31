
// Using getElements, which creates a collection of elements...
/* const items = document.getElementsByClassName("item");  //cannot do .foreach on collections
const todoList = document.getElementById("todo-list");

const newItem = document.createElement("li");
newItem.classList.add("item");
newItem.innerText = "Item 3";

todoList.appendChild(newItem);

//Update the amount of items
const todoNr = document.getElementsByClassName("todo-nr")[0];

todoNr.innerText = items.length;  //here you can see that the items collection, gets updated auotmatically by using getElements...
 */



//Using querySelector, which creates a nodelist
const items = document.querySelectorAll(".item"); 
const todoList = document.querySelector("#todo-list");

const newItem = document.createElement("li");
newItem.classList.add("item");
newItem.innerText = "Item 3";

todoList.appendChild(newItem);

//Update the amount of items
const todoNr = document.querySelector(".todo-nr");

todoNr.innerText = items.length;  //now you see that the list does not automatically get updated

//in order to make it dynamic still, you can do the following...
const dynamicItems = todoList.children; //this transforms it into a collection again and become dynamically