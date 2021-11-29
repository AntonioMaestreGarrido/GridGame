var tamGrid = 7;
var Grid = createArray(tamGrid, tamGrid);
var level = 00000;
var tamMax = 500;
const domLevel=document.querySelector("#level")
soundClick = new Audio(".//");


inicio()
//creaLevel();

function inicio(){
  var divInicio= document.querySelector("#inicio")
  creaDomElemento("p","Hi!,welcome to this little game with no name yet.","",divInicio)
  var b1=creaDomElemento("button","Start","boton",divInicio)
  b1.addEventListener("click",startGame)
  var b2=creaDomElemento("button","Help","boton",divInicio)
}
function startGame(){
  document.querySelector("#inicio").style.display="none"
  document.querySelector("#body").style.display="flex"
  
  resetGrid();
  dibujaGrid(tamGrid);
  creaLevel()
}

function creaLevel() {
  level++;
  domLevel.textContent="Level:"+level
  let x = 0;
  let y = 0;
  for (let i = 0; i < level; i++) {
    x = Math.ceil(Math.random() * tamGrid) - 1;
    y = Math.ceil(Math.random() * tamGrid) - 1;
    clickedOnGrid(y, x);
  }
}
function checkEndGame() {
  var gameState = true;
  for (let i = 0; i < tamGrid; i++) {
    for (let ii = 0; ii < tamGrid; ii++) {
      let n = Grid[i][ii];
      if (n != 0) {
        gameState = false;
        return gameState;
      }
      console.log(i,ii,n, gameState);
    }
  }
 
  if(gameState){
      creaLevel()
  }
    return gameState;
  
}
function dibujaGrid(tamGrid) {
  //calcula el tamaño de cada casilla y la pasa a CSS
 
  var tamCas = tamMax / tamGrid;
  document
    .querySelector(":root")
    .style.setProperty("--tamCasilla", tamCas + "px");
  //y añade al DOM las casillas añadiendo un elemento index
  board = document.querySelector("#board");
  for (let i = 0; i < tamGrid; i++) {
    let gridRow = creaDomElemento("div", "", "row", board);

    for (let j = 0; j < tamGrid; j++) {
      let casilla = creaDomElemento("div", "", "casilla", gridRow);
      casilla.setAttribute("X", i);
      casilla.setAttribute("Y", j);
      casilla.addEventListener("click", indexAttToIndexArray);
    }
  }
}
function clickedOnGrid(x, y) {
  Grid[x][y] = toggleValue(Grid[x][y]);
  toggleClass(x, y);
  if (x > 0) {
    toggleClass(x - 1, y);
    Grid[x - 1][y] = toggleValue(Grid[x - 1][y]);
  }
  if (y > 0) {
    toggleClass(x, y - 1);
    Grid[x][y - 1] = toggleValue(Grid[x][y - 1]);
  }
  if (x < tamGrid - 1) {
    toggleClass(x + 1, y);
    Grid[x + 1][y] = toggleValue(Grid[x + 1][y]);
  }
  if (y < tamGrid - 1) {
    toggleClass(x, y + 1);
    Grid[x][y + 1] = toggleValue(Grid[x][y + 1]);
  }
  console.log(checkEndGame());
}
function indexAttToIndexArray(e) {
  let x = parseInt(e.target.getAttribute("X"));
  let y = parseInt(e.target.getAttribute("Y"));
  clickedOnGrid(x, y);
}

function checkDimen(n) {
  if (n < 0) {
    n = 0;
  }
  if (n > tamGrid - 1) {
    n = tamGrid;
  }
  return n;
}

function toggleClass(x, y) {
  var t = 'div[X="' + x + '"][Y="' + y + '"]';
  var c = document.querySelector(t);
  c.classList.toggle("on");
}

function toggleValue(v) {
  if (v === 1) {
    v = 0;
  } else {
    v = 1;
  }
  return v;
}

function resetGrid() {
  for (let i = 0; i < tamGrid; i++) {
    for (let j = 0; j < tamGrid; j++) {
      Grid[i][j] = 0;
    }
  }
}

function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}
function creaDomElemento(tag, innerText, clase, parent) {
  var newElement;
  newElement = document.createElement(tag);
  newElement.innerHTML = innerText;
  if (clase) {
    newElement.classList.add(clase);
  }
  parent.appendChild(newElement);
  return newElement;
}
