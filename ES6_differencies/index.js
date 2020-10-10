//Old Javascript

//var's can be reassigned anytime you want
var names = ["Duki", "Tim", "John"];

var counter = 10;

//var can be scoped in a function
function sayName(){
    var name = "Duki";
    console.log(name);
}

console.log(counter);


//loops with var
for(var i = 0; i < names.length; i++){
    console.log(names[i]);
}
// the i would still be visible down here



//Generator function the old way
function getBook(title, author){
    return{
        title: title,
        author: author
    };
}



//Object deconstruction
var user = {
    name: "Duki",
    age: "24"
};

var myName = user.name;

console.log(myName);


//writing functions
function sayName(){
    console.log("Hello my name is Duki");
}

var sayAge = function(){
    console.log("Im not gonna tell ya");
}


//keywoard this
var user = {
    name: "Duki",
    age: 24,
    sayName: function(){
        console.log("My name is " + this.name);
        var that = this; //to fix the this issue below
        var fullName = function(){
            //the this is not accessible here anymore, because no context left in here
            console.log("My name is "+ that.name + " and my age is " + that.age);
        };
        fullName();
    }
};

user.sayName();



//defualt parameters
function multiply(x, y) {
    var a = x || 10;
    var b = y || 5;
    console.log(a * b);
}

multiply(2, 3);
multiply();



//Constructor functions
function Person(name, age, hairClr){
    this.name = name;
    this.age = age;
    this.hairClr = hairClr;
}
//Add a method to the constructor
Person.prototype.sayName = function(){
    console.log(`My name is ${this.name}`);
}
Person.prototype.sayAge = function(){
    console.log(`My age is ${this.age}`);
}

var newPerson = new Person("Duki", 24, "brown");
console.log(newPerson);
newPerson.sayName();

//inheritance from Person
function Duki(occupation, hobbies, name, age, hairClr){ //in order to inherit attributes from Person, we need to copy paste the parameters from Person
    Person.call(this, name, age, hairClr); //and call the Person ctor function with those parameters
    this.occupation = occupation;
    this.hobbies = hobbies;
}
//in order to inherit all the functions from Person
Duki.prototype = Object.create(Person.prototype);

const me = new Duki("student", "basketball", "Dooki", 240, "brown");
console.log(me);
me.sayName();
me.sayAge();



//Callback functions
function getData(dataVal, callback){
    setTimeout(() => {
        console.log("reading form the database...");
        callback({data: dataVal});
    }, 2000);
}


getData("Heya", function(data){
    console.log(data);
});







//ES6

//always use const first, it wont let u change the variable
const todoList = ["Eat", "Cook"];


let count = 10;
count = 5;


//loops with let
for(let i = 0; i < todoList.length; i++){
    console.log(todoList[i]);
}
//the let i is NOT visible anymore down here


//String concatination
const NAme = "Duki";
console.log(`Hi my name is ${NAme}`);


//Generator function new way
function getNewBook(title, author){
    return {
        title,
        author
    };
}

//Object Deconstruction
const list = {
    name: "Shopping List",
    items: ["Milk", "Water"]
};

const {name, items} = list;
console.log(name, items);


//Writing functions in an addtiional way
const sayLocation = (location) => {
    console.log(`My location is ${location}`);
}

sayLocation("Paris");
sayLocation("Madrid");


//this keyword
const User = {
    name: "Duki",
    age: 24,
    sayName: function(){
        console.log(`My name is ${this.name}`);
        const fullName = () => {
            //now thanks to the arrow function, you can use the this in here
            console.log(`My name is ${this.name} and my age is ${this.age}`);
        }
        fullName();
    }
};

User.sayName();


//default parameters
const add = (c = 1, d = 2) => {
    console.log(c + d);
};

add(3, 4)
add();


//new array function
const shoppingList = ["Milk", "Eggs", "Bananas"];

//forEach
shoppingList.forEach((product, idx) => {
    console.log(`The index is ${idx} and the product is ${product}`);
});

//map
const newList = shoppingList.map((item) => {
    return item + "new";
});
console.log(newList);

//filter
const filterList = shoppingList.filter((item) => {
    return item !== "Eggs";
});
console.log(filterList);



//Constructor functions
class ShoppingList{
    constructor(items, nr){
        this.items = items;
        this.nr = nr; //number of items we have
    }
    sayList(){
        console.log(this.items);
    }
}

const myList = new ShoppingList(["milk", "choco"], 2);

myList.sayList();

//inherit from ShoppingList
class Product extends ShoppingList{
    constructor(items, nr, amount, cost){ //again copy paste the paramtered from ShoppingList
        super(items, nr);
        this.amount = amount;
        this.cost = cost;
    }
}
//mind how the method sayList() also gets inherited without extra protoype usage
const product = new Product(["Red Bull", "Candy", "Cheese"], 3, 2, 20);
product.sayList();



//Callback functions
const prom = new Promise((resolve, reject) => {
    //Everything here is async
    setTimeout(() => {
        resolve(10);
        reject(new Error("something went wrong"));
    }, 2000)
});

prom.then(data => {
    console.log(data);;
})
.catch(err => {
    console.log(err);
});

