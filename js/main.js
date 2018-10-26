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
    raf = window.requestAnimationFrame(draw);
    rect.draw();
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

for(var i=0;i<=5;i++){
    rects[i] = {
        x : 250,
        y : 0,
        vx : 100,
        vy : 5,
        draw : function(){
            ctx2.beginPath();
            ctx2.fillStyle = 'grey';
            ctx2.fillRect(this.x,this.y,100,100);
        }
    };
}

// x軸を5つを領域に分けて制御します
function decisionX(x){
    if(x >= 50 && x < 150){
        return "one";
    }
    else if(x >= 150 && x < 250){
        return "two";
    }
    else if(x >= 250 && x < 350){
        return "three";
    }
    else if(x >= 350 && x < 450){
        return "four";
    }
    else if(x >= 450 && x < 550){
        return "five"
    }
}

// 条件用の関数　rectの数によって変化する numは1以上
function condition(num){
    var result = (rects[0].y + rects[0].vy + 100 >= canvas2.height);
    var x = rects[num].x
    var x_position = decisionX(x);
    if(num !== 0){
        for(var i=1;i<=num;i++){
            if(x_position === decisionX(rects[i-1].x)){
                result = result && (rects[i].y + rects[i].vy + 100 >= rects[i-1].y);
            }else{
                result = result && (rects[i].y + rects[i].vy + 100 >= canvas2.height);
            }
        }
    }
    return result; // boolean
}

// 下にいったらnum番目のrect止めるよ
function stopRect(num){
    var x = rects[num].x;
    var x_position = decisionX(x);
    var cheker = "";
    if(num !== 0){
        for(var i=1;i<=num;i++){
            if(x_position === decisionX(rects[i-1].x)){
                rects[num].y = rects[i-1].y - 100;
                cheker = "a";
            }else{
                if(cheker !== "a"){
                    rects[num].y = canvas2.height - 100;
                }
            }
        }
        cheker = "";
    }else{
        rects[num].y = canvas2.height - 99;
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
        
    // ここfor文でまとめられる
    if (condition(0)) {
        stopRect(0);
        rects[1].draw();
        rects[1].y += rects[1].vy;
        count = 1;
    }
    if (condition(1)) {
        stopRect(1);
        rects[2].draw();
        rects[2].y += rects[2].vy;
        count = 2;
    }
    if(condition(2)){
        stopRect(2);
        window.cancelAnimationFrame(raf2);
    }
    // ここまで
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
