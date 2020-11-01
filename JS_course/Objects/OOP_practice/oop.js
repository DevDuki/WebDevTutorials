class Animator{
    
    constructor(selector){
        this.selector = document.querySelector(selector);
    }

    fadeOut(time, toggle = false){
        if(toggle && this.selector.classList.contains("fadeout-active")){
            this.selector.style.opacity = 1;
            this.selector.classList.remove("fadeout-active");
        } else {
            this.selector.style.transition = `all ${time}s ease`;
            this.selector.style.opacity = 0;
            this.selector.classList.add("fadeout-active");

        }
    }

    move(time, toggle = false, {x=0, y=0}){
        if(toggle && this.selector.classList.contains("move-active")){
            this.selector.style.transform = "translate(0px, 0px)";
            this.selector.classList.remove("move-active");
        } else {
            this.selector.style.transition = `all ${time}s ease`;
            this.selector.style.transform = `translate(${x}px, ${y}px)`;
            this.selector.classList.add("move-active");

        }
    }
}

const intro = new Animator("h1");
const para = new Animator("p");
const btn = new Animator("button");

const button = document.querySelector("button");

button.addEventListener("click", () =>{
    intro.fadeOut(1, true);
    para.move(0.5, true, {x: 100, y: 75});
    btn.move(1, false, {y: 50});
});
