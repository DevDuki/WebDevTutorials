/*
So in JS there are 2 Phases in the Global Execution Context, which 
JS is going through before ur code even starts running.

The first phase is the creation phase, where global object (window) and 
the this keyword are being created. In this phase JS also allocates 
memory for all your functions on the global object. 

The second phase is the execution phase. This is where the actual
code starts running
*/




//Hoisting & memory allocation

/*
even tho u created this function after ur calling it
JS still knows about this function because it has been allocated
to a memory during the creation phase. And this is called Hoisting.
*/
sayHi();

function sayHi(){
    console.log("Hello");
}

/*
This however fixes the issue, because we are using anonymous function
together with the const or let keyword
*/
const sayHi2 = () => {
    console.log("Hello2");
}

/*
same thing happens with variable which are declared with the keyword
var. And because it takes the variable, but not the value of it,
it will be undefined until the code line, which actually assigns a value
to the variable, is reached. (that is fixed by using const and let)
*/
console.log(inbox);

var inbox = 10;

console.log(inbox);




//Callstack & scope chain

/*
in the execution phase, there is also a scope chain going on, which 
checks synchroniously line by line, which variable is scoped in which 
block.
*/

function sayHello() {
    console.log(`hello there ${name}`);
    changeName();
    console.log("sayHello is finished");
}

function changeName(){
    name = "Bobby";
    console.log(`we changed it to ${name}`);
    console.log("changeName is finished");
}

let name = "DevDuki"; 

sayHello(); //as soon as we invoke a function, a new execution context is created with its own keyword "this" and added to the callstack above the global call.
//so the global exectuion phase stops and runs the sayHello() exectuion phase, same with the changeName() inside the sayHello() function block.
//once a function block is finished, the exectuion context finished and goes back to the previously stopped one.

console.log("We are done with the code");




//this Keyword

/*
the this keyword refers to an object, something like a pointer
*/

const user = {
    name: "Duki"
}

const admin = {
    name: "Admin"
}

const sayHi3 = function() { //Mind that the arrow function wouldnt work here with the this keyword, because an arrow prevents the this from getting a referant during the execution phase
    console.log("Hi " + this.name);
}

user.hi = sayHi3;
admin.hi = sayHi3;

user.hi();   //here the this refers to the user
admin.hi();  //here the this refers to the admin


const lists = document.querySelectorAll("li");

lists.forEach(li => {
    li.addEventListener("click", function(){
        console.log(this);
    });
});

//losing the this context
const user2 = {
    name: "DevDuki",
    videos: ["html", "css", "js", "react"],
    greet() {
        let self = this; //4. this will fix the issue with the this keyword OR change the getVideos function to an arrow function

        console.log(`Hello there ${this.name}`);

        const getVideos = function() {
            console.log(`You currently have ${self.videos.length} videos`); //3. thats why the this here, loses the user referant
        };
        getVideos(); //2. But here due to the callstack, the this will be assigned to a new referant, which doesnt exist here and therefore refer to nothing
    }
};

user2.greet(); //1. mind that here the greet function makes the this keyword refers to the user

/*
So in summary:
Arrow functions dont create a this variable during the execution phase, which leads that the this
neither gets changed nor set.

Normally declared function always create a new this, so if there is no object attached when the 
function gets invoked, the this will be undefined. 

Therefore if you wanna create methods inside an object, it is recommended to use normal functions,
so that u can still use the this keyword and if you wanna keep the this, use arrow functions afterwards.

Also if u wanna execute a higher order function inside a method, use the arrow function for the callback fn
*/




//Bind, Call, Apply

/*
So in conclusion, functions are nothing else but objects (sepcial object kinda)
*/

const person = {
    firstName: "Duki",
    lastName: "King",
    getName(){
        console.log(this.firstName + this.lastName);
    }
}

function registerUser(country, language) { //1. if this function would get called, it will log the window object that is being refered by the this
    console.log(this);
    this.getName();
    console.log(`Country: ${country}, Language: ${language}`);
}

//Bind: binds an object to a function and saves that binding to a new variable
const register = registerUser.bind(person); //2. This binds the person object to the rigesterUser function that is passed to the register variable

register("Sweden", "en"); //3. now the register function applies to the person object

//Call: similar to bind but it doesnt save it into a variable, it instead calls the function directly with the object attached to it
registerUser.call(person, "France", "fr"); //mind that the parameters r being passed right after the object has been passed

//Apply: same as call, but a bit different with the parameters being passed (can be useful for different workflows)
registerUser.apply(person, ["Poland", "pl"]);


