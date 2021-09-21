

for(var i=0;i<document.querySelectorAll("button").length;i++){
  document.querySelectorAll("button")[i].addEventListener("click",function (){
    var audio_path="";
    playDrum(this.textContent);
  });
}

document.addEventListener("keydown",function (){
  playDrum(event.key);
});

function playDrum(val){
  switch (val){
    case 'w':
      audio_path="sounds/tom-1.mp3";
      break;
    case 'a':
      audio_path="sounds/tom-2.mp3";
      break;
    case 's':
      audio_path="sounds/tom-3.mp3";
      break;
    case 'd':
      audio_path="sounds/tom-4.mp3";
      break;
    case 'j':
      audio_path="sounds/crash.mp3";
      break;
    case 'k':
      audio_path="sounds/kick-bass.mp3";
      break;
    case 'l':
      audio_path="sounds/snare.mp3";
      break;
    default:
      audio_path = "";
      break;

  }
  var audio = new Audio(audio_path);
  audio.play();
}
