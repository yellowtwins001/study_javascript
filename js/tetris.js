/*
*  テトリスのコンポーネント集です
*/
var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var cols = 7;
var rows = 10;

/* テトリミノ生成*/
function tetrimino(){
    var tetriminos = [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
    
    var randomNum = Math.floor(Math.random() * 7);
    return tetriminos[randomNum];
}

var rect = {
    x : 0,
    y : 0,
    w : 50,
    h : 50,
    draw : function(){
        ctx.beginPath();
        ctx.fillStyle = "skyblue";
        ctx.fillRect(this.x, this.y, 50, 50);
        ctx.fillStyle = "black";
        ctx.strokeRect(this.x, this.y, 50, 50);
    }
};

var current_y = 0;

function draw(){
    ctx.clearRect(0,0,600,500);
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(mino[i][j] === 1){
                rect.x = rect.w * j; 
                rect.y = current_y + rect.h * i;
                rect.draw();
            }
        }
    }
    if(current_y < 400){
        current_y += 5;
    }else{
        clearInterval(draw);
    }
}

var mino = tetrimino();
setInterval(draw,10);

