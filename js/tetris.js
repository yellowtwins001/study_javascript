/*
*  テトリス
*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cols = 7;
var rows = 10;

/* テトリミノ生成*/
function tetrimino() {
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

/* 1マスの基本形 */
var rect = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = "skyblue";
        ctx.fillRect(this.x, this.y, 50, 50);
        ctx.fillStyle = "black";
        ctx.strokeRect(this.x, this.y, 50, 50);
    }
};

/* ローテーション */
function rotation(mino){
    var mino_crone_1 = [];
    for (var i = 0; i < 4; i++) {
        mino_crone_1[i] = [];
        for (var j = 0; j < 4; j++){
            mino_crone_1[i][j] = mino[j][3 - i];
        }
    }
    return mino_crone_1;
}

/* メイン関数 */
var mino = tetrimino();
var current_y = 0;
var vy = 5; // 落ちる速度　※インターバルによる制御も可能
var move = 0;
var count = 0;
var fill;

//　固定テトリミノの初期化
function iniFill() {
    var fill = new Array(rows);
    for (var i = rows - 1; i >= 0; i--) {
        fill[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            fill[i][j] = 0;
        }
    }
    return fill;
}

fill = iniFill();

// 動くテトリミノの描画 インターバルにより制御
function drawMove() {
    ctx.clearRect(0, 0, 600, 500);
    // 稼働テトリミノの描画
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (mino[i][j] === 1) {
                if (move > 0) {
                    rect.x = rect.w * (move + j);
                } else {
                    move = 0;
                    rect.x = rect.w * j;
                }
                rect.y = current_y + rect.h * i;
                rect.draw();
            }
        }
    }
    // 稼働テトリミノの落下
    if (current_y < 400) {
        current_y += vy;
    }
    // 稼働テトリミノの停止条件と固定化と新しいテトリミノを生成
    condition();
    // 固定テトリミノの描画と揃ったラインの削除
    drawStop();
}

// 稼働テトリミノの停止条件と固定化と新しいテトリミノを生成
function condition() {
    var move_position;
    var fixed_position;
    fill;
    for (var j = 0; j < 4; j++) {
        // 稼働テトリミノの最下位の位置取得
        move_position = {
            x : move + j,
            y : 0
        };
        for (var i = 0; i < 4; i++) {
            if (mino[i][j] === 1) {
                move_position = {
                    x: move + j,
                    y: current_y + rect.h * i // 高さ（ピクセル）
                };
            }
        }
        // 固定テトリミノの最上位の位置取得　※監視してる稼働テトリミノのｘ座標のみ監視
        fixed_position = {
            x: move + j,
            y: rows
        };
        for (var k = rows-1; k >= 0; k--) {
            if (fill[k][move + j] === 1) {
                fixed_position = {
                    x: move + j,
                    y: k
                };
            }
        }
        // 稼働テトリミノと固定テトリミノが重なったら稼働テトリミノを固定化する
        if(move_position.y + 50 === fixed_position.y * rect.h){
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(mino[i][j]===1){
                        fill[(current_y/50) + i][move+j] = 1;
                    }
                }
            }
            // 新しいテトリミノを生成
            current_y = 0;
            move = 0;
            mino = tetrimino();
        }        
    }
}


// 下にたまるテトリミノの描画 二次元配列fillにより制御
function drawStop() {
    // ラインがそろったら消す
    function clearLine() {
        // 一番下がそろっているかの判定
        var countFillCols = 0;
        for (var j = 0; j < cols; j++) {
            if (fill[rows - 1][j] === 1) {
                countFillCols += 1;
            }
        }
        // 揃ったときの処理
        if (countFillCols === cols) {
            for (var j = 0; j < cols; j++) {
                for (var i = rows - 1; i > 2; i--) {
                    fill[i][j] = fill[i - 1][j];
                }
                fill[2][j] = 0;
            }
        }
        countFillCols = 0; // 初期化
    } // ライン消す条件ここまで

    clearLine();

    // ここからfillが1のものを描画
    for (var i = rows - 1; i >= 0; i--) {
        for (var j = 0; j < cols; j++) {
            if (fill[i][j] === 1) {
                rect.x = rect.w * j;
                rect.y = rect.h * i;
                rect.draw();
            }
        }
    }    // 描画ここまで
}

/* 
*  キーボード操作
*  a : スタート/再開
*  b : 中断
*  → : 右に1マス移動
*  ← : 左に1マス移動
*/
document.addEventListener("keydown", keyDownFunc);

var gameStart;
function keyDownFunc(e) {
    console.log(e.keyCode);
    if (e.keyCode === 39) {
        move += 1;
    } else if (e.keyCode === 37) {
        move -= 1;
    } else if (e.keyCode === 82){
        mino = rotation(mino);
    } else if (e.keyCode === 65) { // 65 : a
        gameStart = setInterval(drawMove, 50);
    } else if (e.keyCode === 66) { // 66 : b
        clearInterval(gameStart);
        console.log(gameStart);
    }
}