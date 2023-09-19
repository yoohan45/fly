const canvas = document.getElementById('fly');
const ctx = canvas.getContext('2d');

let score;
let scoreText;
let highscore;
let highscoreText;
let bird;
let gameSpeed;
let bottom_obstacles = [];
let top_obstacles = [];

let judgements = [];
let keys={};

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

    this.power = 2;
    this.gravity = this.power;
    this.grounded = false;

  }

  update(){ // 프레임마다 속성들을 변화시킴 
    // y값의 변동을 계산
    this.y += this.gravity; 
    this.gravity += 0.5 // 중력 값
    //console.log(this.gravity)
    if(keys['Space']||keys['KeyW'])
    {
      
      this.gravity = -5;
    }

    
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

//Start
function Start(){
  canvas.witdth = window.innerWidth;
  canvas.height = window.innerHeight;



  gameSpeed = 3;
  
  score = 0;
  highscore = 0;

  bird = new Bird(100, canvas.height/2, 75, 75, "Yellow");
  bird.Draw();
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
        t_o.Update();
        let b_o = bottom_obstacles[i];
        b_o.Update();
        let ju = judgements[i];
        ju.Update();
    }

  gameSpeed += 0.003;

}

Start();