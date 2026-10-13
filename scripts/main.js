const splash = document.querySelector('#launch-splash');
const languageSwitch = document.querySelector('#language-switch');
let activeLanguage = 'ar';

const englishCopy = {
  splashTitle: 'A universe of digital health platforms',
  splashLoading: 'Preparing the platform network',
  splashSkip: 'Skip intro',
  eyebrow: 'Healthcare, in digital form',
  heroTitle: 'One digital universe<br />for closer care',
  subtitle: 'Connected platforms, with services built around people',
  supporting: 'One gateway for health, service and awareness platforms — growing as needs grow.',
  flagship: 'Flagship platform',
  online: 'Online now',
  platformOneTitle: 'Digital platform<br />for health services',
  platformOneDescription: 'Waili services, all in one place',
  platformTwoTitle: 'Smart Assistant<br />for health offices',
  platformTwoDescription: 'Ask and get clear guidance at the right time',
  platformThreeTitle: 'Family awareness<br />platform',
  platformThreeDescription: 'Trusted information for every home',
  updated: 'Last updated · 13/10/2026',
  explore: 'Explore platform',
  scroll: 'Explore the network',
  directoryTitle: 'Platform directory',
  directorySupport: 'Platforms available today, with new digital paths joining the orbit over time.',
  choiceOneTitle: 'Health Services',
  choiceOneDescription: 'All Waili Medical Area services in one place: appointments, news, maps and updates.',
  choiceTwoTitle: 'Smart Assistant',
  choiceTwoDescription: 'Ask a question and get clear health guidance with simple next steps.',
  choiceThreeTitle: 'Family Awareness',
  choiceThreeDescription: 'Practical, trusted information that helps families make better health choices.',
  enter: 'Enter platform ↗',
  futureTitle: 'New platform, soon',
  futureDescription: 'New platforms and services are joining as the network grows with people’s needs.',
  futureStatus: 'Preparing',
  closingTitle: 'Every platform brings care closer.<br />Every service arrives on time.',
  closingSupport: 'A health network growing to bring people service<br />with clarity and care.',
  finalCta: 'Explore the network',
};

const applyEnglish = () => {
  activeLanguage = 'en';
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
  document.body.classList.add('is-english');
  document.title = 'Digital Health Universe';
  document.querySelector('meta[name="description"]')?.setAttribute('content', 'An integrated digital ecosystem for health services.');
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = englishCopy[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const value = englishCopy[element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });
  if (languageSwitch) {
    languageSwitch.textContent = 'AR';
    languageSwitch.setAttribute('aria-label', 'التحويل إلى العربية');
  }
};

try {
  if (window.localStorage.getItem('health-showcase-language') === 'en') applyEnglish();
} catch {
  // Arabic remains the dependable default if local storage is unavailable.
}

languageSwitch?.addEventListener('click', () => {
  try {
    window.localStorage.setItem('health-showcase-language', activeLanguage === 'en' ? 'ar' : 'en');
  } catch {
    // Refresh still gives the visitor a clean Arabic default if storage is unavailable.
  }
  window.location.reload();
});

if (splash) {
  splash.addEventListener('click', () => {
    splash.classList.add('is-skipped');
  }, { once: true });
}

const stage = document.querySelector('#stage');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (stage && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
  stage.addEventListener('pointermove', (event) => {
    const box = stage.getBoundingClientRect();
    stage.style.setProperty('--camera-x', `${((event.clientX - box.left) / box.width - 0.5) * 5}px`);
    stage.style.setProperty('--camera-y', `${((event.clientY - box.top) / box.height - 0.5) * 4}px`);
  }, { passive: true });
  stage.addEventListener('pointerleave', () => {
    stage.style.removeProperty('--camera-x');
    stage.style.removeProperty('--camera-y');
  });
}

const clock = {
  hours: document.querySelector('#clock-hours'),
  minutes: document.querySelector('#clock-minutes'),
  seconds: document.querySelector('#clock-seconds'),
  date: document.querySelector('#clock-date'),
};

if (Object.values(clock).every(Boolean)) {
  const number = new Intl.NumberFormat(activeLanguage === 'en' ? 'en-GB' : 'ar-EG', { minimumIntegerDigits: 2, useGrouping: false });
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  });
  const date = new Intl.DateTimeFormat(activeLanguage === 'en' ? 'en-GB' : 'ar-EG', {
    timeZone: 'Africa/Cairo', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const updateClock = () => {
    const now = new Date();
    const parts = Object.fromEntries(time.formatToParts(now).map(({ type, value }) => [type, value]));
    clock.hours.textContent = number.format(Number(parts.hour));
    clock.minutes.textContent = number.format(Number(parts.minute));
    clock.seconds.textContent = number.format(Number(parts.second));
    clock.date.textContent = date.format(now);
  };
  updateClock();
  window.setInterval(updateClock, 1000);
}
