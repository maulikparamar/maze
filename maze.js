const canvas = document.querySelector(".myclass");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight - 4;
var cols;
var rows;
var w = 40;
var current;
var grid = [];
var stack = [];
function setup() {
    cols = Math.floor(width / w);
    row = Math.floor(height / w);
    for(let j = 0 ; j < row; j++){
        for(let i = 0 ; i < cols; i++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
  current = grid[0];

}

 function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(1,2,width,height);
    for(let i =0; i < grid.length ;i++){
        current.visited = true;
        current.highlight();
        grid[i].show();
    }
    var next = current.checkNeigbors();
    if(next){
        next.visited = true;
        stack.push(current);
        removeWall(current,next);
        current = next;
    }  else if(stack.length > 0){
         current = stack.pop();
    }
   
}



 function index(i,j) {
    if(i < 0 || j < 0 || i > cols -1 || j > row -1){
        return -1;
    }
    return i + j * cols;
}

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.wall = [true,true,true,true]
        this.visited = false;

        this.checkNeigbors = function () {
            var neigbors = [];
            var top = grid[index(i,j-1)];
            var right = grid[index(i+1,j)];
            var bottem = grid[index(i,j+1)];
            var left = grid[index(i-1,j)];

            
            if(top && !top.visited){
                neigbors.push(top);
            }
            if(right && !right.visited){
                neigbors.push(right);
            }
            if(bottem && !bottem.visited){
                neigbors.push(bottem);
            }
            if(left && !left.visited){
                neigbors.push(left);
            }

            if(neigbors.length > 0){
                var r = Math.floor(Math.random(0,neigbors.length) * neigbors.length);
                return neigbors[r];
               
            }else{
                return undefined;
            }
            

        }
        
        this.highlight = function() {
                 var x = this.i * w;
                var y = this.j * w;
                 ctx.fillStyle = "blue";
                ctx.fillRect(x, y, w, w);
            }

        this.show = function () {
            var x = this.i * w;
            var y = this.j * w;
            ctx.strokeStyle = "white";
            ctx.beginPath();
            
            if(this.wall[0]){
            ctx.moveTo(x, y);   
            ctx.lineWidth = 1;
            ctx.lineTo(x+w,y);
            }  
            
            if(this.wall[1]){
            ctx.moveTo(x+w, y);   
            ctx.lineWidth = 1;
            ctx.lineTo(x+w,y+w); 
            }
            
            if(this.wall[2]){
            ctx.moveTo(x+w, y+w);   
            ctx.lineWidth = 1;
            ctx.lineTo(x,y+w); 
            }

            if(this.wall[3]){
            ctx.moveTo(x, y+w);   
            ctx.lineWidth = 1;
            ctx.lineTo(x,y); 
            }

            if(this.visited){
            ctx.fillStyle = "purple";
            ctx.fillRect(x, y, w, w);

            }
            ctx.stroke();
        };
    }
}


// class Cell {
//     constructor(i, j) {
//         this.i = i;
//         this.j = j;
//         this.show = function () {
//             var x = this.i * w;
//             var y = this.j * w;
//             ctx.strokeStyle = "white";
//             ctx.beginPath();
//             ctx.rect(x, y, w, w);
//             ctx.stroke();
//         };
//     }
// }

function sleep(ms){
    return new Promise(reslove => setTimeout(reslove,ms));
}

function removeWall(a,b){
    var x = a.i - b.i;
    if(x === 1){
        a.wall[3] = false;
        b.wall[1] = false;
    }else if(x === -1){
        a.wall[1] = false;
        b.wall[3] = false;
    }

    var y = a.j - b.j;
    if(y === 1){
        a.wall[0] = false;
        b.wall[2] = false;
    }else if(y === -1){
        a.wall[2] = false;
        b.wall[0] = false;
    }
}

setInterval(() => draw(),50)
setup();
draw();
