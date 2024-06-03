function AStar(start, goal){
  let closedList = [];
  let openList = [start];
  let current = openList[0];

  while(openList.length > 0){
    current.f = euklides(current); 
    if(current.x == goal.x && current.y == goal.y){
      console.log('es');
      return;
    }
    move(current);
    openList = openList.filter( (el) => (el !== current));
    closedList.push(current);
    console.log(current.neighbours);
  }

  

  function move(current){
    let dx = parseInt(current.x, 10);
    let dy = parseInt(current.y, 10);
    current.neighbours = [];
    if(current.x == 0 && current.y == 0){
      let up = {x: dx, y: dy+1, f: 0, parent: current};
      up.f = euklides(up);

      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      current.neighbours.push(up,right);
    }

    else if(current.x == 0 && current.y == 19){
      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      let down = {x: dx, y: dy-1, f: 0, parent: current};
      down.f = euklides(down);

      current.neighbours.push(right, down);
    }

    else if(current.x == 0 && (current.y != 19 && current.y != 0)){
      let up = {x: dx, y: dy+1, f: 0, parent: current};
      up.f = euklides(up);

      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      let down = {x: dx, y: dy-1, f: 0, parent: current};
      down.f = euklides(down);

      current.neighbours.push(up, right, down);
    }

    else if((current.x != 0 && current.x != 19) && current.y == 0){
      let left = {x: dx-1, y: dy, f:0, parent: current};
      left.f = euklides(left);
      
      let up = {x: dx, y: dy+1, f: 0, parent: current};
      up.f = euklides(up);

      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      current.neighbours.push(left, up, right);
    }

    else if(current.x == 19 && current.y == 0){
      let left = {x: dx-1, y: dy, f:0, parent: current};
      left.f = euklides(left);
      
      let up = {x: dx, y: dy+1, f: 0, parent: current};
      up.f = euklides(up);

      current.neighbours.push(left, up);
    }

    else if(current.x == 19 && (current.y != 19 && current.y != 0)){
      let left = {x: dx-1, y: dy, f:0, parent: current};
      left.f = euklides(left);
      
      let up = {x: dx, y: dy+1, f: 0, parent: current};
      up.f = euklides(up);

      let down = {x: dx, y: dy-1, f: 0, parent: current};
      down.f = euklides(down);

      current.neighbours.push(left, up, down);
    }

    else if(current.x == 19 && current.y == 19){
      let left = {x: dx-1, y: dy, f:0, parent: current};
      left.f = euklides(left);

      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      current.neighbours.push(left, right);
    }

    else if((current.x != 19 && current.x != 0) && current.y == 19){
      let left = {x: dx-1, y: dy, f:0, parent: current};
      left.f = euklides(left);

      let down = {x: dx, y: dy-1, f: 0, parent: current};
      down.f = euklides(down);

      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      current.neighbours.push(left, down, right);
    }else{
      let down = {x: dx, y: dy-1, f: 0, parent: current};
      down.f = euklides(down);

      let left = {x: dx-1, y: dy, f:0, parent: current};
      left.f = euklides(left);

      let up = {x: dx, y: dy+1, f: 0, parent: current};
      up.f = euklides(up);

      let right = {x: dx+1, y: dy, f: 0, parent: current};
      right.f = euklides(right);

      current.neighbours.push(down, left, up, right);
    }
  }

  function euklides(current){
    let result =  1 + Math.sqrt(Math.pow(current.x - goal.x, 2) + Math.pow(current.y - goal.y, 2));
    return result;
  }
}



const start = {x:0 , y:0, f:0, parent: undefined};
const goal = {x: 19, y: 19};
AStar(start, goal);






































// start = {x: 0, y: 0, f: 0, parent: undefined};
// end = {x: 19, y:19};

// class Graph{
//   constructor(size){
//     this.tab = new Array(size)
//     this.size = size-1;
//     this.createTab();
//     this.show();
//   }

//   createTab = () => {
//     for(let i=0; i<this.size; i++){
//       this.tab[i] = new Array(this.size)
//       for(let j=0; j<this.size; j++){
//         this.tab[i][j] = 0;
//       }
//     }
//   }

//   show  = () => {
//     for(let i=0; i<this.size; i++){
//       for(let j=0; j<this.size; j++){
//         console.log(this.tab[i][j]);
//       }
//     }
//   }
// }

// class Path{
//   constructor(start, end){
//     this.start = start;
//     this.end = end;
//     this.openList = [this.start];
//     this.closedList = [];
//     this.findPath(this.start, this.end);
//   }

//   findPath = (start, end) => {
//     let current;
//     let temp;
//     while(this.openList.length > 0){
//       current = this.openList[0];
//       for(let i=0; i<graph.size; i++){
//         for(let j=0; j<graph.size; j++){
//           if(graph.tab[i][j] == graph.tab[current.x][current.y]){
//             temp = graph.tab[i][j];
//             this.move(temp, i, j);
//           }
//         }
//       }
//       console.log(current)
//       this.openList.pop();
//     }
//   }

//   move = (current, x, y) => {
//     if(x == 0 && y == 0){
//       const up =

//     }

//   }

//   euklides = (current) => {
//     let result = 1 + Math.sqrt((current.x - this.end.x) ** 2 + (current.y - this.end.y) ** 2);
//     return result;
//   }
// }

// const graph = new Graph(20);
// const path = new Path(start, end);














// class Path{
//   constructor(start, end){
//     this.start = start;
//     this.end = end;
//     this.openList = [start];
//     this.closedList = [];
//   }

//   findPath = () => {
//     let current = this.openList[0];
//     let bestWay = {};
//     while(this.openList.length > 0){
//       if(current.x == this.end.x && current.y == this.end.y){
//         console.log('koniec');
//         return;
//       }
//       bestWay = this.move(current);
//       this.minFromOpen();
//       return;
//     }
//   }

//   euklides = (current) => {
//     let result = 1 + Math.sqrt((current.x - this.end.x) ** 2 + (current.y - this.end.y) ** 2);
//     return result;
//   }

//   move = (current) => { // tu zamiast nowej wartosci jest referencja do current
//     if(this.closedList.includes(current)){
//       return;
//     }
//     let down = {x: current.x += 0, y: current.y -= 1};
//     let tempCurrX = current.x;
//     let tempCurY = current.y
//     down.f = this.euklides(down);
//     down.parent = current;
//     if(!this.openList.includes(down)) this.openList.push(down);

//     let left = {x: tempCurrX -= 1, y: tempCurY += 0};
//     left.f = this.euklides(left);
//     left.parent = current;
//     if(!this.openList.includes(left)) this.openList.push(left);


//     let up = {x: tempCurrX += 0, y: tempCurY += 1};
//     up.f = this.euklides(up);
//     up.parent = current;
//     if(!this.openList.includes(up)) this.openList.push(up);
    

//     let right = {x: tempCurrX += 1, y: tempCurY += 0};
//     right.f = this.euklides(right);
//     right.parent = current;
//     if(!this.openList.includes(right)) this.openList.push(right);
    
//     const bestWay = this.minValue(down, left, up, right);
//     bestWay.parent = current;
//     this.openList = this.openList.filter(element => element !== bestWay);
//     this.closedList.push(bestWay);
//     return bestWay;
//   }

//   minValue = (down, left, up, right) => {
//     const minValue = Math.min(down.f, left.f, up.left, right.f);

//     if(minValue == down.f){
//       console.log(1);
//       return down;
//     }else if(minValue == left.f){
//       console.log(1534);
//       return left;
//     }else if(minValue == up.f){
//       console.log(1111);
//       return up;
//     }else{
//       console.log(165);
//       return right;
//     }
//   }

//   minFromOpen = () => {
//     this.openList.forEach( el => {
//       console.log(el);
//     })
//     this.closedList.forEach( el => {
//       console.log(el);
//     })
//   }

//   size = (obj) => {
//     if((obj.x > 19 || obj.x < 0) || (obj.y > 19 || obj.y < 0)){
//       return false;
//     }else{
//       return true;
//     }
//   }
// }

// start = {x: 0, y: 0, f: 0, parent: undefined};
// end = {x: 19, y: 19};

// obj = new Path(start, end);
// obj.findPath();
