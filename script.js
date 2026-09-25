/* Minimal enhancement: a soft camera response on pointer devices only. */
const stage = document.querySelector('#stage');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (stage && hasFinePointer && !reduceMotion) {
  stage.addEventListener('pointermove', (event) => {
    const box = stage.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    stage.style.setProperty('--camera-x', `${x * 5}px`);
    stage.style.setProperty('--camera-y', `${y * 4}px`);
  });
  stage.addEventListener('pointerleave', () => {
    stage.style.removeProperty('--camera-x');
    stage.style.removeProperty('--camera-y');
  });
}
