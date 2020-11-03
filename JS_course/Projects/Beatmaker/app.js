//This project is realised with OOP style in JavaScript

class DrumKit{

    constructor(){
        this.pads        = document.querySelectorAll(".pad");
        this.playBtn     = document.querySelector(".play");
        this.kickAudio   = document.querySelector(".kick-sound");
        this.snareAudio  = document.querySelector(".snare-sound");
        this.hihatAudio  = document.querySelector(".hihat-sound");
        this.selects     = document.querySelectorAll("select");
        this.muteBtns    = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");

        this.isPlaying = null;

        this.bpm = 150;
        this.index = 0;
    }

    repeat(){
        let step = this.index % 8;
        if(step === 0){
            this.index = 0;
        }
        
        //Animate each track pad and play sound on active ones
        const activePads = document.querySelectorAll(`.b${step}`);
        activePads.forEach(pad => {
            pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`; //the 2 in here, makes it so the alternate animation also animates out
            if(pad.classList.contains("active")){
                if(pad.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(pad.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(pad.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        
        this.index++;
    }

    start(){
        const interval = (60/this.bpm) * 1000;

        if(!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.index = 0;
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    activePad(){
        this.classList.toggle("active");
    }

    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        
            default:
                break;
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute("data-track");

        e.target.classList.toggle("active");

        if(e.target.classList.contains("active")){
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            
                default:
                    break;
            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            
                default:
                    break;
            }
        }
    }

    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        tempoText.innerText = e.target.value;
    }

    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
}


const drumKit = new DrumKit();


//Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", () => {
    drumKit.start();
})

drumKit.selects.forEach(select => {
    select.addEventListener("change", (e) => {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener("input", (e) => {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", (e) => {
    drumKit.updateTempo(e);
});