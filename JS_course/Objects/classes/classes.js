//Classes


/* 
Instead of this (check prototype.js for more info)

function Enemy(life, name, level){
    this.life = life;
    this.name = name;
    this.level = level;
}

Enemy.prototype.getInfo = function() {
    console.log(this.life, this.name, this.level);
};

 */



//we do this 

class Enemy{                        //1. replace function with class and remove the parameters

    constructor(life, name, level){ //2. add construction keyowrd and parameters
        this.life = life;           //3. add propperties in here
        this.name = name;
        this.level = level;
    }

    //4. Here you can declare methods, which automatically gets placed into the prototype object
    getInfo(){
        console.log(this.life, this.name, this.level);
    }
}

const turtle = new Enemy(25, "Turty", 10);
console.log(turtle); //Check how the methods are inside the prototype alrdy
turtle.getInfo();

//Inheritance

class Bug extends Enemy{                        //1. add what gets extended
    
    constructor(life, name, level, legs, dmg){  //2. take the old parameters + the new ones (if new ones r needed)
        super(life, name, level);               //3. call the super method, which will automaticall refer the this keyword do the Bug as well
        this.legs = legs;                       //4. and declare ur additional propperties here
        this.dmg = dmg;
    }

    //5. all other methods are automatically inherited and here you can simply add ur additional methods specifically for Bug
    getDmg(){
        console.log(this.dmg);
    }
}

const buggy = new Bug(1, "Buggo", 2, 3, 140);
buggy.getInfo();
buggy.getDmg();