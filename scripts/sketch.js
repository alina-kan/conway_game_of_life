/*
  How this game works:
  - set up the canvas for visualization and create the grid by making
   a 2D array with make2DArray with specified rows and columns (20, 20)
  - fill the grid with random 0s and 1s, then center the canvas so it's
   not all weird and wonky on the HTML
  - after setup(), draw the current points on the canvas
  - after drawing those first points, create a copy of the grid and start
   looking for neighbors and check the rules:
      1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
      2. Any live cell with two or three live neighbors lives on to the next generation.
      3. Any live cell with more than three live neighbors dies, as if by over-population.
      4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
   using the rules, the cell in the 'next' grid will change to either 1/0 based on the results
  - change the grid on the canvas to use the 'next' grid
  - draw is called for each frame, so the program runs infinitely as draw is called continuously

  the game operates on a torus (occasionally seen when there are moving cell blocks)

*/

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
        next[i][j] = 1; //rule 4
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0; //rules 1 and 3
      } else {
        next[i][j] = state; //rule 2, cell lives on
      }

    }
  }

  grid = next;

}


function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + 20) % 20; //check top and bottom cells
      let row = (y + j + 20) % 20; //check left and right cells
      sum += grid[col][row]; //since modulus is being used, answer will be either 1/0,
      // then that is added to the total sum of neighbors around that cell
    }
  }
  sum -= grid[x][y];
  return sum;
}

//make game reset more accessible
document.querySelector('.restart-btn').addEventListener('click', function () {
  window.location.reload();
  return false;
});

//button to create glider
document.querySelector('.glider-btn').addEventListener('click', function () {
  console.log('glider');
  grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
});

//button to create just regular game of life
document.querySelector('.regular-btn').addEventListener('click', function () {
  console.log('regular');
  grid = make2DArray(20, 20);
  for (let i = 0; i < 20; i++) { //cols
    for (let j = 0; j < 20; j++) { //rows
      grid[i][j] = floor(random(2)); //fill with random 0 or 1
    }
  }
});

//button to create pulsar
document.querySelector('.pulsar-btn').addEventListener('click', function () {
  console.log('pulsar');
  grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
});