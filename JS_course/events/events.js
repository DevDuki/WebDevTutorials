const button = document.querySelector("#submit");
const todoList = document.querySelector("#todo-list");
const todoNr = document.querySelector(".todo-nr b");
const mainTitle = document.querySelector(".main-title");
const button2 = document.querySelectorAll(".item");

const items = todoList.children;

//Adding event listeners to the alrdy existing items
for(item of items){
    item.addEventListener("click", deleteItem);
}

//Attach an event listener
button.addEventListener("click", () => {
    //Setting up a new element
    const newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.innerText = `Item ${items.length + 1}`;

    //Adding the element to the ul
    todoList.appendChild(newItem);

    //updating the todoNr label
    todoNr.innerText = items.length;

    //Random css banter
    mainTitle.style.color = "red";
    mainTitle.style.fontSize = "50px";

    //Attach eventlisteners to the newly added item
    newItem.addEventListener("click", deleteItem);
});

function deleteItem(event){
    event.stopPropagation();  //Prevent event bubbling with the parent ul element
    event.target.remove();
}



//Event bubbling

//Now since we have clickevent on the ul but also on the il, it will
//trigger the events on both element and cause a big problem

//TO PREVENT: add .stopPropagation() to events on the "lower z-index item"
//so in our case the il (check deleteItem function)
todoList.addEventListener("click", () => {
    todoList.classList.toggle("fade");
});