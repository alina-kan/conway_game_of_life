//import * as Canvas from 'canvas';

function make2DArray(num_cols, num_rows){
  let array = new Array(num_cols);
  for (let i = 0; i < num_cols; i++){
    array[i] = new Array(num_rows); //insert a new row for every column
  }
  return array;
}

let grid;

function setup() {
  canvas = createCanvas(400, 400);
  grid = make2DArray(20, 20);
  for (let i = 0; i < 20; i++) { //cols
    for (let j = 0; j < 20; j++) { //rows
      grid[i][j] = floor(random(2)); //fill with random 0 or 1
    }
  }
  canvas.style("visibility", "visible")
  canvas.center();
}

//console.log(grid);
//console.table(grid);

function draw() {
  background(67, 40, 24);
  //make another array so there are 
  let next = make2DArray(20,20);

  for (let i = 0; i < 20; i++) { //cols
    for (let j = 0; j < 20; j++) { //rows
      let w = 20;
      let x = i * 20;
      let y = j * 20;
      if (grid[i][j] == 1){
        fill(214, 171, 101);
        rect(x, y, w, w);
      }
    }
  }

  // Compute next based on grid
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      let state = grid[i][j];
      // Count live neighbors based on countNeighbors function
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }

    }
  }

  grid = next;

}


function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + 20) % 20;
      let row = (y + j + 20) % 20;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

document.querySelector('.restart-btn').addEventListener('click', function () {
  window.location.reload();
  return false;
});