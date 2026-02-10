 letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
 t=0;
interval=3;
movingTime = 50;
let texts=[];
let movingtexts=[];
let randomChar;
function setup() {
  createCanvas(600, 600);
  CharCount = 600;
  textFont("Times");
  background(0);
  fill(255);
  song=loadSound('dragon-studio-relaxing-rain-444802.mp3');

  RandomTexts();
  ChangeSizeandColorByDistance();
}

function draw() {
  
  if(frameCount-t>=interval){
 
    RandomPushDrop();
   
     t=frameCount;
    
  }
 MovementTextCalculate();
}
  
function RandomTexts(){
  for(let i=0;i<CharCount;i++){
    rand = int(random(0, letters.length-1));
    x=random(width)
    y=random(height)
    texts.push({x:x,y:y,letter:letters[rand]})
    text(letters[rand], x, y); 
}
}

function ChangeSizeandColorByDistance(){
  distanceRange = 10;
  textsDisCount=new Array(texts.length).fill(0);
  for (let i=0;i<texts.length;i++) {
  for (let j=i+1; j<texts.length;j++) {
      d=dist(texts[i].x,texts[i].y,texts[j].x,texts[j].y);
      if(d<distanceRange){    
        textsDisCount[i]+=1;
        textsDisCount[j]+=1;
       } 
  }}
     background(0);
  for (let i=0;i<texts.length;i++) {
     textSize(10 + 5 * textsDisCount[i]);
     fill( 150+5 * textsDisCount[i]);
     text(texts[i].letter,texts[i].x,texts[i].y);
     
  }
}

function MovementTextCalculate(){
  for(let i=0;i<movingtexts.length;i++){
     
     easedT=easeOutCubic(movingtexts[i].t/movingTime);
     v1= createVector(texts[movingtexts[i].i].x,texts[movingtexts[i].i].y);
     v2 = movingtexts[i].pos;
     pos= p5.Vector.lerp(v1,v2,easedT);
     
     texts[movingtexts[i].i].x=pos.x;
     texts[movingtexts[i].i].y=pos.y;
     movingtexts[i].t+=1;
  }
  movingtexts=movingtexts.filter(item => item.t<movingTime);
  ChangeSizeandColorByDistance();
}

function RandomPushDrop(){
  dropDistanceRange=random(20,60);
  dropforce=random(30);
  x=random(width)
  y=random(height)
  for(let i=0;i<texts.length;i++){
    d=dist(x,y,texts[i].x,texts[i].y);
    if(d<dropDistanceRange){
      p1=createVector(texts[i].x,texts[i].y);
      p2=createVector(x,y);
      dir = p5.Vector.sub(p1, p2).normalize();
      let newpos= createVector(random(dropforce)*dir.x+texts[i].x,random(dropforce)*dir.y+texts[i].y);
      
      movingtexts.push({t:0,i:i,pos:newpos});
    }
  }
 
}

function easeOutCubic(t) {
  return 1 - pow(1 - t, 3);
}
function mousePressed() {
  if (!song.isPlaying()) song.loop(); 
}


  
  
  
  
  
