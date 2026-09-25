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

// Live Cairo time for the celestial clock, using Arabic numerals and date formatting.
const hoursElement = document.querySelector('#clock-hours');
const minutesElement = document.querySelector('#clock-minutes');
const secondsElement = document.querySelector('#clock-seconds');
const dateElement = document.querySelector('#clock-date');

if (hoursElement && minutesElement && secondsElement && dateElement) {
  const twoDigits = new Intl.NumberFormat('ar-EG', { minimumIntegerDigits: 2, useGrouping: false });
  const cairoTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  });
  const cairoDate = new Intl.DateTimeFormat('ar-EG', {
    timeZone: 'Africa/Cairo', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const updateCosmicClock = () => {
    const now = new Date();
    const values = Object.fromEntries(cairoTime.formatToParts(now).map(({ type, value }) => [type, value]));
    hoursElement.textContent = twoDigits.format(Number(values.hour));
    minutesElement.textContent = twoDigits.format(Number(values.minute));
    secondsElement.textContent = twoDigits.format(Number(values.second));
    dateElement.textContent = cairoDate.format(now);
  };
  updateCosmicClock();
  window.setInterval(updateCosmicClock, 1000);
}
