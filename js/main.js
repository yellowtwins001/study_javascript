var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var raf;

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