export function fit(isMobile) {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  const initScale = 10;
  let currentScale = 1;
  let widthScale = 1;
  let heightScale = 1;
  currentScale = Math.min(widthScale, heightScale);
  if (isMobile) {
      widthScale = currentWidth / 360;
      heightScale = currentHeight / 720;
  }else{
      widthScale = currentWidth / 1920;
      heightScale = currentHeight / 1080;
  }
  const fontSize = Math.floor(currentScale * initScale);
  document.documentElement.style.fontSize = `${fontSize}px`;
  window.__REM_VALUE__ = fontSize;
}


function init(isMobile=false) {
  fit(isMobile);
  window.addEventListener('resize', () => fit(isMobile));
}

export default init;
