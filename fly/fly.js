const canvas = document.getElementById('fly');
const ctx = canvas.getContext('2d');

let score = 0;
let scoreText;
let highscore;
let highscoreText;
let bird;
let gameSpeed;
let gameSpeedinit=0.003;
let entered = 0;
let bottom_obstacles = [];
let top_obstacles = [];
let judgements = [];
let keys={};
let space_once = 0;
let weather = "Clear";
let dum = false;

document.addEventListener('keydown', function(evt){
  keys[evt.code] = true;
});

document.addEventListener('keyup', function(evt){
  keys[evt.code] = false;
});

//플레이어 class
class Bird{
  constructor(x,y,w,h,c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.power = 0.7;
    this.gravity = 0;
    this.grounded = false;

  }

  update(){ // 프레임마다 속성들을 변화시킴 
    // y값의 변동을 계산
    this.y += this.gravity; 
    this.gravity += this.power // 중력 값
    //console.log(this.gravity)
    if(keys['Space']||keys['KeyW']&&grounded == false)
    {
      
      if(space_once >3){
      this.gravity = -10;
      }
      space_once = 0;
    }
    
    space_once += 1;
    

    
  }
  Draw(){
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
    
  }
  

  
   
}


//obstacle class
class Obstacle {
  constructor(x, y, w, h, c) {
      
      this. x = x;
      this. y = y;
      this. w = w;
      this. h = h;
      this. c = c;

      this.dx = -gameSpeed;
  }

  Update(){
      this.x += this.dx;
      this.Draw();
      this.dx = -gameSpeed;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}
//Judgment class
class Judgment {
  constructor(x, y, w, h, c) {
      
      this. x = x;
      this. y = y;
      this. w = w;
      this. h = h;
      this. c = c;

      this.dx = -gameSpeed;
  }

  Update(){
      this.x += this.dx;
      this.Draw();
      this.dx = -gameSpeed;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

//Text class
class Text{
  constructor(t, x, y, a, c, s){

      this.t = t;
      this.x = x;
      this.y = y;
      this.a = a;
      this.c = c;
      this.s = s;
  }
  Draw(){
      ctx.beginPath();
      ctx.fillStyle=this.c;
      ctx.font = this.s +"px sans-serif";
      ctx.textAlign = this.a;
      ctx.fillText(this.t, this.x, this.y);
      ctx.closePath();
  }
}


//오타클 생성
function SpawnObstacle() {
  let size = RandomIntInRage(40, canvas.height/2+50);
  let top_size = canvas.height-size-bird.h-150;
  let obstacle_b = new Obstacle(canvas.width+bird.w+50, canvas.height-size, bird.w+50, size, "Black");
  let obstacle_t = new Obstacle(canvas.width+bird.w+50, 0, bird.w+50, top_size,"Black");
  let jud = new Judgment(canvas.width+bird.w+50,  top_size, bird.w+50, canvas.height-size-top_size, "pink")
  bottom_obstacles.push(obstacle_b);
  top_obstacles.push(obstacle_t);
  judgements.push(jud);
  
}
function RandomIntInRage(min, max){
  return Math.round(Math.random() * (max-min) + min);
}


function Init(){
  alert("점수: " + score);
  alert("아쉽네요!");

  

  

  
}

//Start
function Start(){
  canvas.witdth = window.innerWidth;
  canvas.height = window.innerHeight;

  

  gameSpeed = 3;
  
  score = 0;
  highscore = 0;

  bird = new Bird(100, canvas.height/2-150, 75, 75, "Yellow");
  bird.Draw();

  scoreText = new Text("Score: " + score, 25, 25, "left", "Gray", "20");
  requestAnimationFrame(Update);
  
}

//기본스폰 타이머
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

//animate
function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.Draw();
  bird.update();
  

  spawnTimer--;
  if(spawnTimer <= 0)
  {
    SpawnObstacle();
    
      spawnTimer = initialSpawnTimer - gameSpeed * 8;

      if(spawnTimer < 60) {
          spawnTimer = 60;
      }
  }


  for(let i=0; i< top_obstacles.length; i++)
    {
        let t_o = top_obstacles[i];
        let b_o = bottom_obstacles[i];
        let ju = judgements[i];
        
        
        if(t_o.x+t_o.w<0)
        {
          top_obstacles.splice(i,1);
        }

        if(bird.x< t_o.x+t_o.w&&
          bird.x+bird.w>t_o.x&&
          bird.y<t_o.y+t_o.h&&
          bird.y+bird.h>t_o.y)
          {
            console.log("땃쥐");
            Init();
          }
        
        if(b_o.x+b_o.w<0)
        {
          bottom_obstacles.splice(i,1);
        }

        if(bird.x< b_o.x+b_o.w&&
          bird.x+bird.w>b_o.x&&
          bird.y<b_o.y+b_o.h&&
          bird.y+bird.h>b_o.y)
          {
            console.log("땃쥐");
            Init();
          }

        if(ju.x+ju.w<0)
        {
          judgements.splice(i,1);
        }

        


        

        if(bird.x< ju.x+ju.w&&
          bird.x+bird.w>ju.x&&
          bird.y<ju.y+ju.h&&
          bird.y+bird.h>ju.y
          )
          {
            if (entered>5) {
              score += 1;
            }
            
            entered = 0;

          }
          else{
            entered += 1;
          }
        
          
          
          
          
          
         
        ju.Update();
        b_o.Update();
        t_o.Update();
    }

    scoreText.t ="score: " + score;
    scoreText.Draw();

  gameSpeed += gameSpeedinit;

}

Start();


const getJSON = function(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function(){
      const status = xhr.status;
      if(status === 200){
          callback(null, xhr.response);
      }else{
          callback(status, xhr.response);
      }
  }
  
xhr.send();
};

getJSON("https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=53f8472fa30662b5735381711b9bd610&units=metric"
,
function(err, data) {
  if(err !== null) {
      alert('예상치 못한 오류 발생'+err);
  }
  else{
      alert(data.weather[0].main);
      weather = data.weather[0].main;
      console.log(weather);


  }
});