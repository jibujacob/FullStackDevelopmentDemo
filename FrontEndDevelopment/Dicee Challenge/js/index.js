randomValue1 = (Math.floor(Math.random()*6))+1;
img_name = "images/dice"+randomValue1+".png";
document.querySelector("img.img1").setAttribute("src",img_name);

randomValue2 = (Math.floor(Math.random()*6))+1;
img_name = "images/dice"+randomValue2+".png";
document.querySelector("img.img2").setAttribute("src",img_name);

if (randomValue1 > randomValue2){
  document.querySelector("h1").textContent="Player1 wins";
}else if (randomValue1 < randomValue2) {
  document.querySelector("h1").textContent="Player2 wins";
}else{
  document.querySelector("h1").textContent="Draw!";
}
