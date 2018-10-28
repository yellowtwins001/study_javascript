/*
 * 
 *  一番目のキャンバス 
 * 
 */
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var raf;
var raf2;

var rect = {
    x : 0,
    y : 50,
    vx : 5,
    vy : 0,
    draw : function(){
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.fillRect(this.x,this.y,100,100);
    }
};

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    rect.draw();

    if (rect.x + rect.vx + 100 > canvas.width || rect.x + rect.vx < 0) {
        rect.vx = -rect.vx;
    }

    rect.x += rect.vx;
    raf = window.requestAnimationFrame(draw);
}
  
function moveRect(){
    draw();
}

function stopRect(){
    window.cancelAnimationFrame(raf);
}

/*
 * 
 *  二番目のキャンバス 
 * 
 */
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
var raf2;

/* 四角形　デフォルトの場所は上の真ん中 */
var rects = [];

for(var i=0;i<=25;i++){
    rects[i] = {
        x : 250,
        y : 0,
        vx : 100,
        vy : 5,
        draw : function(){
            ctx2.fillStyle = 'grey';
            ctx2.fillRect(this.x,this.y,100,100);
            ctx2.fillStyle = 'black';
            ctx2.strokeRect(this.x,this.y,100,100);
            ctx2.fillStyle = 'dimgrey';
            ctx2.fillRect(this.x+15,this.y+15,70,70);
            ctx2.fillStyle = 'black';
            ctx2.strokeRect(this.x+15,this.y+15,70,70);
            ctx2.save();
        },
        clear : function(){
            ctx2.clearRect(this.x,this.y,100,100);
        }
    };
}

// 条件用の関数　rectの数によって変化する numは1以上
function condition(num){
    var result = (rects[num].y + 100 >= canvas2.height);
    var x = rects[num].x;
    if(num !== 0){
        for(var i=1;i<=num;i++){
            if(x === rects[i-1].x){
                result = (rects[num].y + 100 >= rects[i-1].y);
            }
        }
    }
    return result; // boolean
}

// 下にいったらnum番目のrect止めるよ
function stopRect(num){
    var x = rects[num].x;
    rects[num].y = canvas2.height - 100;
    if(num !== 0){
        for(var i=1;i<=num;i++){
            if(x === rects[i-1].x){
                rects[num].y = rects[i-1].y - 100;
            }
        }
    }
}

// ひとつのライン上に何個rectangleがあるか数える


// gameover条件
  function gameover(){
      if(true/* ここに条件 */){
          return "gameover";
      }else{
          return "";
      }
  }

// 配列の数値の合計
function sum(arr){
    var sum = 0;
    for(var num in arr){
        sum += arr[num];
    }
    return sum;
}

// 揃ったら消す
function clearLine(num){
    var fill = [0,0,0,0,0];
    for(var i=0;i<=num;i++){
        if(rects[i].y === 400){
            for(var row=1;row<=5;row++){
                if(rects[i].x === 100 * row - 50){
                    fill[row-1] = 1;
                }
            }
        }
    }
    if(sum(fill)==5){
        for(var i=0;i<=num;i++){
            rects[i].y += 100;
        }
    }
}

/* 四角形描くよ 動かすよ */
/* 無限if作戦 */
var count = 0;


function draw2(){
    ctx2.clearRect(0,0, canvas2.width, canvas2.height);
    rects[0].draw();

    rects[0].y += rects[0].vy;
    raf2 = window.requestAnimationFrame(draw2);
        
    // rectangleの描画　とりあえず10個
    var condition_result = new Boolean(true);
    for(var i=0;i<19;i++){
      condition_result = condition_result && condition(i);
      if(condition_result){
        stopRect(i);
        rects[i+1].draw();
        rects[i+1].y += rects[i+1].vy;
        count = i+1;
        clearLine(i);
        if(rects[i].x === 250 && rects[i].y === 100){
            window.cancelAnimationFrame(raf2);
            var result = "Gameover";
            alert(result);
        }
      }
    }
    
    condition_result = condition_result && condition(19);
    if(condition_result){
        if(result !== "Gameover"){
            rects[19].y -= rects[19].vy;
            rects[19].clear();
            rects[19].y += rects[19].vy;
            rects[19].draw();
            stopRect(19);
            clearLine(19);
            console.log(rects[19].y);
            window.cancelAnimationFrame(raf2);
            result = "Congratulation";
            alert(result);
        }else{
            ctx2.clearRect(0,0, canvas2.width, canvas2.height);
        }
    }
}

/* ボタンで制御：動かす（加速） */
function moveRect2(){
    draw2();
}

function moveRight(){
    if(rects[count].x < 450){
        rects[count].x += rects[count].vx;
    }
}

function moveLeft(){
    if(rects[count].x >= 150){
        rects[count].x -= rects[count].vx;
    }
}
