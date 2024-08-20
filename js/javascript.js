const gridSizes = {
  ceilSize: 10,
  gridSize: {
    width: 32,
    height: 32
  }
}


const container = document.querySelector('.container');
const gridWidthInput = document.querySelector('.size-grid__width');
const gridHeigthInput = document.querySelector('.size-grid__height');
const ceilSizeInput = document.querySelector('.size-ceil__input');
const createBtn = document.querySelector('.create');
const resetBtn = document.querySelector('.reset');

function getRandomNumber(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getRGB() {
  return `rgb(${getRandomNumber(10, 250)}, ${getRandomNumber(10, 250)}, ${getRandomNumber(10, 250)})`;
}

function createGrid(wh, hg) {
  const size = wh * hg;
  const c = new DocumentFragment();
  container.style.width = `${gridSizes.ceilSize * wh}px`;
  container.style.height = `${gridSizes.ceilSize * hg}px`;
  for (let i = 1; i <= size; i++) {
    const ceil = document.createElement('div');
    ceil.setAttribute('class', `ceil ceil${i}`);
    ceil.style.width = `${gridSizes.ceilSize}px`;
    ceil.style.height = `${gridSizes.ceilSize}px`;
    ceil.style.opacity = 1;
    c.appendChild(ceil);
  }
  return c;
}
container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('ceil')) {
    const markCount = e.target.dataset.markCount ? +e.target.dataset.markCount + 1 : 0;
    if (e.target.dataset.markCount < 10) {
      e.target.style.opacity = `${1 - (markCount / 10)}`
    }
    console.log(markCount)
    e.target.setAttribute('data-mark-count', `${markCount}`)
    const color = getRGB();
    e.target.style.backgroundColor = color;
  }
});
createBtn.addEventListener('click', (e) => {
  gridSizes.gridSize.width = gridWidthInput.value ? gridWidthInput.value : 32;
  gridSizes.gridSize.height = gridHeigthInput.value ? gridHeigthInput.value : 32
  gridSizes.ceilSize = ceilSizeInput.value ? ceilSizeInput.value : 10;
  if (gridSizes.gridSize.width < 90 && gridSizes.gridSize.height < 90) {
    container.textContent = '';
    container.appendChild(createGrid(gridSizes.gridSize.width, gridSizes.gridSize.height));
  }
});
resetBtn.addEventListener('click', (e) => {
  if (gridSizes.gridSize.width < 90 && gridSizes.gridSize.height < 90) {
    container.textContent = '';
    container.appendChild(createGrid(gridSizes.gridSize.width, gridSizes.gridSize.height));
  }
})