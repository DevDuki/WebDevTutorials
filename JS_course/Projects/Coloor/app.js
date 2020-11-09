/*
In this project we are using the Chroma library,
linked with the script tag in the html, daken from cdnjs.com
*/


//Variables

const colorDivs        = document.querySelectorAll(".color");
const generateBtn      = document.querySelector(".generate");
const sliders          = document.querySelectorAll('input[type="range"]');
const currentHexes     = document.querySelectorAll(".color h2");
const copyPopup        = document.querySelector(".copy-container");
const adjustButtons    = document.querySelectorAll(".adjust");
const closeAdjustments = document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");
const lockButtons      = document.querySelectorAll(".lock");

let initialColors = [];


//Event listeners
sliders.forEach(slider => {
    slider.addEventListener("input", hslControls); 
});

colorDivs.forEach((div, index) => {
    div.addEventListener("input", () => {
        updateTextUI(index);
    });
});

currentHexes.forEach(hex => {
    hex.addEventListener("click", () => {
        copyToClipboard(hex);
    });
});

copyPopup.addEventListener("transitionend", () => {
    const popupBox = copyPopup.children[0];
    copyPopup.classList.remove("active");
    popupBox.classList.remove("active");
});

adjustButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        openAdjustmentPanel(index);
    });
});

closeAdjustments.forEach((button, index) => {
    button.addEventListener("click", () => {
        closeAdjustmentPanel(index);
    });
});

generateBtn.addEventListener("click", initialiseView);

lockButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        button.children[0].classList.toggle("fa-lock-open");
        button.children[0].classList.toggle("fa-lock");
        colorDivs[index].classList.toggle("locked");
    });
});


//Functions

//Color generatior
function generateHex(){
    const hexColor = chroma.random();
    return hexColor;
}

function initialiseView(){

    colorDivs.forEach(div => {
        //Getting the h2 from the div container and gereate a random Hex colorcode
        const hexText = div.children[0];
        const icons   = div.querySelectorAll(".controls button");
        const randomColor = generateHex();

        //save the initialised color, so we can reference back to them
        if(div.classList.contains("locked")){
            initialColors.push(hexText.innerText)
            return;
        } else{
            initialColors.push(chroma(randomColor).hex());
        }

        //add that color to the bg
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        //configure contrast of the texts
        checkTextContrast(randomColor, hexText);
        //and for the icons
        icons.forEach(icon => {
            checkTextContrast(randomColor, icon);
        });

        //initially colorise sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll(".sliders input"); //returns the 3 sliders of each color panel
        const hue        = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        coloriseSliders(color, hue, brightness, saturation);
    });

    //Reset inputs
    resetSliders();
}

function checkTextContrast(color, text){
    const luminance = chroma(color).luminance(); //returns the brightness value of the color in a range between 0 and 1
    if(luminance > 0.5){
        text.style.color = "black";
    } else {
        text.style.color = "white";
    }
}

function coloriseSliders(color, hue, brightness, saturation){
    //Scale saturation
    const noSat    = color.set("hsl.s", 0);
    const fullSat  = color.set("hsl.s", 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);

    //Scale brightness
    const midBright   = color.set("hsl.l", 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);

    //Update input colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`
    hue.style.backgroundImage        = `linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)`;
}

function hslControls(e){
    const index = e.target.getAttribute("data-bright") || 
                  e.target.getAttribute("data-sat")    ||
                  e.target.getAttribute("data-hue");

    //returns the 3 sliders brightness, sat and hue, from each panel
    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue        = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = initialColors[index];

    let color = chroma(bgColor)
                .set("hsl.s", saturation.value)
                .set("hsl.l", brightness.value)
                .set("hsl.h", hue.value);
    
    colorDivs[index].style.backgroundColor = color;


    coloriseSliders(color, hue, brightness, saturation);
}

function updateTextUI(index){
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);

    const textHex = activeDiv.querySelector("h2");
    const icons   = activeDiv.querySelectorAll(".controls button");
    
    textHex.innerText = color.hex();

    //update contrast
    checkTextContrast(color, textHex);
    icons.forEach(icon => {
        checkTextContrast(color, icon);
    });
}

function resetSliders(){
    sliders.forEach(slider => {
        if(slider.name === "hue"){
            const hueColor = initialColors[slider.getAttribute("data-hue")];
            const hueValue = chroma(hueColor).hsl()[0];
            slider.value   = Math.floor(hueValue);
        }
        if(slider.name === "brightness"){
            const brightColor = initialColors[slider.getAttribute("data-bright")];
            const brightValue = chroma(brightColor).hsl()[2];
            slider.value      = Math.floor(brightValue * 100) / 100;  //gives back the first 2 digits behind the decimal
        }
        if(slider.name === "saturation"){
            const satColor = initialColors[slider.getAttribute("data-sat")];
            const satValue = chroma(satColor).hsl()[1];
            slider.value   = Math.floor(satValue * 100) / 100;
        }
    });
}

function copyToClipboard(hex){
    //in order to copy the hex to the clipboard, we create a textarea that containes the hex code
    //select that hex code text inside the textarea and execute the command copy. After that
    //we remove the textarea again. (just a small workaround in order to copy the hex code)
    const pseudoTextArea = document.createElement("textArea");
    pseudoTextArea.value = hex.innerText;
    document.body.appendChild(pseudoTextArea);
    pseudoTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(pseudoTextArea);

    //Pop up animation
    const popupBox = copyPopup.children[0];
    copyPopup.classList.add("active");
    popupBox.classList.add("active");
}

function openAdjustmentPanel(index){
    sliderContainers[index].classList.toggle("active");
}

function closeAdjustmentPanel(index){
    sliderContainers[index].classList.remove("active");
}




//Local storage section
const saveBtn       = document.querySelector(".save");
const submitSave    = document.querySelector(".submit-save");
const closeSave     = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput     = document.querySelector(".save-container input");

let savedPalettes = [];


//Event listeners
saveBtn.addEventListener("click", openPalette);

closeSave.addEventListener("click", closePalette);

submitSave.addEventListener("click", savePalette);


//Functions
function openPalette(){
    const popup = saveContainer.children[0];
    saveContainer.classList.add("active");
    popup.classList.add("active");
}

function closePalette(){
    const popup = saveContainer.children[0];
    saveContainer.classList.remove("active");
    popup.classList.remove("active");
}

function savePalette(){
    saveContainer.classList.remove("active");
    const name = saveInput.value;
    const colors = [];
    currentHexes.forEach(hex => {
        colors.push(hex.innerText);
    });

    let paletteNr = savedPalettes.length;
    const paletteObj = {name: name, colors: colors, nr: paletteNr} //short version would be {name, colors, nr: paletteNr}
    savedPalettes.push(paletteObj);

    saveToLocal(paletteObj);
    saveInput.value = "";
}

function saveToLocal(paletteObj){
    let localPalettes;
    if(localStorage.getItem("palettes") === null){
        localPalettes = [];
    } else {
        localPalettes = JSON.parse(localStorage.getItem("palettes"));
    }
    localPalettes.push(paletteObj);
    localStorage.setItem("palettes", JSON.stringify(localPalettes));
}


initialiseView();
