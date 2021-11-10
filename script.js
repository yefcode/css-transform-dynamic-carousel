let carousel = document.querySelector('.carousel');
let cells = carousel.querySelectorAll('.cell');
let cellCount; // cellCount set from cells-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let isHorizontal = true;
let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta; // theta = 360 / cellCount;

function rotateCarousel() {
  let angle = theta * selectedIndex * -1;
  console.log(`translateZ(${-radius}px) ${rotateFn}(${angle}deg)`);
  carousel.style.transform = `translateZ(${-radius}px) ${rotateFn}(${angle}deg)`;
  // transform: translateZ(0px) rotateX(0deg);
  // transform: translateZ(0px) rotateY(0deg);
}

let prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});

let nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});

let cellsRange = document.querySelector('.cells-range');
// cellsRange.addEventListener( 'change', changeCarousel );
cellsRange.addEventListener( 'input', changeCarousel );

function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  console.log(`theta1: ${theta}`);
  console.log(`theta2: ${((Math.PI * 2) / cellCount) / 2}`);
  let cellSize = isHorizontal ? cellWidth : cellHeight;
  console.log(`Tan1: ${Math.tan( Math.PI / cellCount )}`);
  console.log(`Tan2: ${Math.tan((( theta * Math.PI)/180) / 2 )}`);
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  cells.forEach((cell, index) => {
    if ( index < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      let cellAngle = theta * index;
      console.log(rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)');
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
      // transform: rotateX(0deg) translateZ(0px);
      // transform: rotateY(0deg) translateZ(0px);
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  })
  rotateCarousel();
}

let orientationRadios = document.querySelectorAll('input[name="orientation"]');
orientationRadios.forEach(radio => {
  radio.addEventListener( 'change', onOrientationChange );
});

function onOrientationChange() {
  let checkedRadio = document.querySelector('input[name="orientation"]:checked');
  isHorizontal = checkedRadio.value === 'horizontal';
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  changeCarousel();
}

// set initials
onOrientationChange();
