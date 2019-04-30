const $ = document.querySelector.bind(document);

// use SVG basic shapes: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes#Basic_shapes
const SHAPES = ['circle', 'rect']

let MAX_WIDTH = 0, MAX_HEIGHT = 0, MAX_INITIAL_RADIUS = 90, SELECTED_SHAPE = 0, MAX_REVEAL_SHAPES = 40;

function main(){
  // select any image to get max width nad max height possible for us
  let image = $('.last');
  
  MAX_WIDTH = image.offsetWidth;
  MAX_HEIGHT = image.offsetHeight;
  
  
  $('container').addEventListener("click", (e) => renderNewShape(e.clientX, e.clientY));
  $('#reset').addEventListener("click", reset);
}


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPathShape(x, y) {
  // HTML element name
  let name = SHAPES[SELECTED_SHAPE];
  
  let radius = random(10, MAX_INITIAL_RADIUS);
  let attributes =  {
    stroke: "#000000",
    cx: x - radius / 2,
    cy: y - radius / 2,
    r: radius,
    class: ""
  }
  
  let el = document.createElementNS("http://www.w3.org/2000/svg", name)
  
  Object.keys(attributes).forEach( attrKey => {
    let attr = document.createAttribute(attrKey);
    attr.value = attributes[attrKey]
    el.setAttributeNode(attr);
  })
  
  return el;
}


function renderNewShape(x, y) {

  let svgClipPath = $("#shapes-clip-path")
  
  svgClipPath.appendChild(createPathShape(x, y))
  
}

function reset() {
  let svgClipPath = $("#shapes-clip-path")
  svgClipPath.innerHTML = '';
  
}

main();