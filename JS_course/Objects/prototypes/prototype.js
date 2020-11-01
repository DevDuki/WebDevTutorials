//Constructor Functions

function Todo(name, completed) {
    console.log(this);          //2. as u can see the this, is basically an empty object and..
    this.name = name;           //.. by setting these variables we basically create new propperties to that object
    this.completed = completed;
    this.getTodoName = () => {  //usually u never create methods in the ctor (check prototype chapter below)
      console.log(this.name);
    };
}

const todo = new Todo("Buy Eggs", false); //1. the new keyword, created a new empty object that get refered by the this keyword
const todo2 = new Todo("Do Homwork", false);

console.log(todo, todo2);

todo.getTodoName();
todo2.getTodoName();


//Newer way of creating classes (will be discussed later, check classes.js)
/*
class Todo {
    constructor(name, completed) {
        console.log(this); //2. as u can see the this, is basically an empty object and..
        this.name = name; //.. by setting these variables we basically create new propperties to that object
        this.completed = completed;
    }
}
*/




//Prototype

/*
Now with the constructor function, we have the issue that each method we
create in there, will be duplicated everytime a new object gets created
(todo, todo2). This means a lot of memory is being wasted. In order
to fix that we can use prototypes!
*/

/*
Every Object has an internal propperty knowns as prototype. it is a
reference to an additional object inside its object and contains common
propperties and attributes, across all the main object's instances
*/

function ProTodo(name, completed) {
    this.name = name;
    this.completed = completed;
}

ProTodo.prototype.getTodoName = function() {
    console.log(this.name);
}

const proTodo = new ProTodo("Buy Milk", true);

console.log(proTodo);  //now you can see that the method is not inside the object
proTodo.getTodoName(); //but it can still be used by every instance of the new ProTodo's class
/*
Also worth to note is, that now the proTodo instance searches inside himself if there is a
getTodoName function and since it wont find one in itself, it will search up into the prototype
in which its successfully gonna find a function with that name!
*/

/* 
In other words, the instances inherit the propperties of the prototype object from the
cunstructor function 
*/

//Built the same way like this are other methods, like pop, shift, forEach etc. from arrays "arr.pop()"
const arr = [1,2,3,4];
console.log(arr); //check the prototype of this array inside the console on the browser

//same for primitives
const name = new String("Duki"); //warning, its not the same as const name = "Duki";
console.log(name); //now check what methods string can offer




//Prototypal Inheritance

function Enemy(life, name, level){
    this.life = life;
    this.name = name;
    this.level = level;
}

Enemy.prototype.getInfo = function() {
    console.log(this.life, this.name, this.level);
};

Enemy.prototype.attack = function() {
    console.log(`${this.name} has attacked`);
};

Enemy.prototype.block = function() {
    console.log(`${this.name} has blocked`);
};


//Inheriting Enemy into the Dragon
function Dragon(life, name, level, color, spell){
    //Inheriting propperties (that this is referenced to the dragon and as learned before, the call makes it so that the enemy is also gettign that reference of the dragon)
    Enemy.call(this, life, name, level);

    this.color = color;
    this.spell = spell;
}

//inherit prototype
Dragon.prototype = Object.create(Enemy.prototype);

Dragon.prototype.fireBreath = function(){
    console.log("FIRE BREATH");
};

const newDragon = new Dragon(100, "Drogo", 30, "red", "fire");
console.log(newDragon);
newDragon.getInfo();


/*
IN CONCLUSION:
This kind of creating "classes" isnt the standard way of doing it anymore
and it looks really ugly. Thats why there is a newer way of creating
actual classes, which makes js more oop like. (check classes.js)
*/