const byId = (id) => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const heartPath = new Path2D('M80 130 C68 120 9 80 9 47 C9 13 55 4 80 34 C105 4 151 13 151 47 C151 80 92 120 80 130 Z');

function drawCat(canvas) {
  const ctx = canvas.getContext('2d');
  const kitty = canvas.dataset.cat === 'kitty';
  const outline = '#4b283c';
  const white = '#fffaf7';
  const pink = {lilac: '#be83d2', red: '#e44064'}[canvas.dataset.outfit] || '#ed527f';
  ctx.scale(2, 2);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = outline;
  ctx.lineWidth = 3.4;

  function shape(path, color, stroke = true) {
    const trace = new Path2D(path);
    ctx.fillStyle = color;
    ctx.fill(trace);
    if (stroke) ctx.stroke(trace);
  }

  function oval(x, y, rx, ry, color, stroke = true) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (stroke) ctx.stroke();
  }

  function bow(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size, size);
    shape('M0 0 Q-24 -22 -28 -13 Q-35 5 -24 13 Q-18 17 0 5 Q21 20 26 12 Q34 -2 24 -13 Q19 -17 0 0Z', color);
    oval(0, 1, 7, 7, color);
    ctx.restore();
  }

  oval(97, 201, 61, 8, '#7b315128', false);
  oval(67, 189, 22, 15, white);
  oval(120, 189, 22, 15, white);
  shape('M64 122 Q39 147 40 181 Q91 201 146 182 Q144 147 123 121Z', kitty ? pink : '#7e8ed1');
  if (kitty) {
    shape('M42 177 Q91 188 144 176 L146 183 Q91 202 40 183Z', '#f998ad');
  } else {
    shape('M69 124 L95 171 L123 124Z', white);
    bow(95, 145, .5, '#aa365f');
  }
  oval(47, 157, 13, 17, white);
  oval(142, 155, 13, 17, white);
  shape('M27 65 Q21 40 32 26 Q39 19 60 39 Q92 26 127 39 Q146 18 155 25 Q169 38 162 66 Q179 87 165 109 Q151 137 96 139 Q41 138 26 112 Q13 89 27 65Z', white);
  oval(64, 91, 4.5, 7, outline, false);
  oval(125, 91, 4.5, 7, outline, false);
  oval(95, 103, 6.2, 4.1, '#f4cb67');
  oval(49, 104, 9, 4, '#f4a5b295', false);
  oval(141, 104, 9, 4, '#f4a5b295', false);
  ctx.beginPath();
  [[31, 83, 12, 77], [29, 94, 9, 94], [33, 106, 16, 112],
    [160, 83, 177, 76], [163, 94, 182, 94], [159, 106, 176, 113]]
    .forEach(([x, y, endX, endY]) => { ctx.moveTo(x, y); ctx.lineTo(endX, endY); });
  ctx.stroke();
  if (kitty) {
    bow(138, 49, 1.04, pink);
    ctx.save();
    ctx.translate(73, 146);
    ctx.scale(.3, .3);
    ctx.fillStyle = '#df285d';
    ctx.fill(heartPath);
    ctx.lineWidth = 7;
    ctx.stroke(heartPath);
    ctx.restore();
  } else {
    shape('M75 44 Q81 25 93 19 L90 33 Q103 20 115 21 L106 36 Q119 29 130 33 Q119 45 108 49', white);
  }
}

document.querySelectorAll('[data-cat]').forEach(drawCat);

function drawBouquet(canvas) {
  const ctx = canvas.getContext('2d');
  const lilies = canvas.dataset.bouquet === 'lilies';
  const blooms = [[31, 51, -.35], [69, 32, 0], [109, 49, .35], [53, 74, -.18], [89, 73, .2]];
  ctx.scale(2, 2);
  ctx.lineWidth = 1.6;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  function shape(path, fill, outline) {
    const trace = new Path2D(path);
    ctx.fillStyle = fill;
    ctx.strokeStyle = outline;
    ctx.fill(trace);
    ctx.stroke(trace);
  }

  for (const [x, y] of blooms) {
    ctx.beginPath();
    ctx.strokeStyle = '#507653';
    ctx.moveTo(70, 143);
    ctx.quadraticCurveTo(70, 94, x, y);
    ctx.stroke();
  }
  shape('M67 108 Q36 99 25 77 Q54 77 67 108Z', '#8eb88a', '#507653');
  shape('M71 104 Q82 77 119 74 Q102 96 71 104Z', '#a8c997', '#507653');
  shape('M32 89 L69 103 L108 88 L79 146 Q70 151 59 146Z', '#f6b4c9', '#a95376');
  shape('M32 89 Q56 113 79 146 L59 146Z', '#ffdae4', '#a95376');
  shape('M70 129 Q49 116 50 129 Q51 136 70 132 Q87 139 90 128 Q88 120 70 129Z', '#c53160', '#8c3052');

  for (const [index, [x, y, angle]] of blooms.entries()) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    if (lilies) {
      ctx.strokeStyle = '#b96888';
      ctx.fillStyle = '#fff4f7';
      for (let petal = 0; petal < 6; petal++) {
        const trace = new Path2D('M0 1 Q-11 -8 0 -21 Q11 -8 0 1Z');
        ctx.fill(trace);
        ctx.stroke(trace);
        ctx.rotate(Math.PI / 3);
      }
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#e8ac63';
      ctx.fill();
    } else {
      const colors = ['#ed83a5', '#d74c78', '#ef9ab4', '#e67f9d', '#e4608a'];
      shape('M0 12 Q-15 10 -15 -12 L-6 -6 L0 -17 L6 -6 L15 -12 Q15 10 0 12Z', colors[index], '#9a3d61');
      shape('M-15 -12 Q-7 -9 0 6 Q7 -9 15 -12 Q15 10 0 12 Q-15 10 -15 -12Z', colors[index], '#9a3d61');
    }
    ctx.restore();
  }
}

document.querySelectorAll('[data-bouquet]').forEach(drawBouquet);

const screens = [...document.querySelectorAll('.screen')];
const previous = byId('previous');
const next = byId('next');
let screenIndex = 0;

function showScreen(index) {
  if (index < 0 || index >= screens.length || index === screenIndex) return;
  screens[screenIndex].hidden = true;
  screens[screenIndex].classList.remove('is-entering');
  screenIndex = index;
  const screen = screens[index];
  screen.hidden = false;
  screen.classList.add('is-entering');
  previous.disabled = index === 0;
  next.disabled = index === screens.length - 1;
  byId('page-count').textContent = (index + 1) + ' de ' + screens.length;
  const heading = byId(screen.getAttribute('aria-labelledby'));
  heading.tabIndex = -1;
  heading.focus({preventScroll: true});
  window.scrollTo({top: 0, behavior: 'instant'});
}

previous.addEventListener('click', () => showScreen(screenIndex - 1));
next.addEventListener('click', () => showScreen(screenIndex + 1));
byId('begin').addEventListener('click', () => showScreen(1));
document.querySelector('.brand').addEventListener('click', (event) => {
  event.preventDefault();
  showScreen(0);
});

function burst(element, count) {
  if (reducedMotion.matches) return;
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const angle = Math.PI * 2 * i / count;
    const distance = 42 + Math.random() * 105;
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.setAttribute('aria-hidden', 'true');
    particle.textContent = i % 3 === 0 ? '✦' : '♥';
    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + rect.height / 2 + 'px';
    particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
    particle.style.setProperty('--r', Math.random() * 180 - 90 + 'deg');
    document.body.append(particle);
    setTimeout(() => particle.remove(), 900);
  }
}

const floating = document.querySelector('.floating');
for (let i = 0; i < 15; i++) {
  const floater = document.createElement('span');
  floater.className = 'floater';
  floater.textContent = i % 4 === 0 ? '✦' : '♡';
  floater.style.left = (i * 29 % 98) + '%';
  floater.style.fontSize = (14 + i % 5 * 5) + 'px';
  floater.style.animationDuration = (13 + i % 6 * 3) + 's';
  floater.style.animationDelay = -(i * 4 % 21) + 's';
  floating.append(floater);
}

const audio = byId('audio');
const music = byId('music');
const musicLabel = byId('music-label');
const trackStatus = byId('track-status');
const AudioEngine = window.AudioContext || window.webkitAudioContext;
let audioContext;
let soundOn = false;
let audioRequest = 0;

function tone(midi, offset = 0, volume = .065, duration = .65) {
  const start = audioContext.currentTime + offset;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + .035);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .03);
}

function chime(notes) {
  if (!soundOn || audioContext?.state !== 'running') return;
  notes.forEach((note, index) => tone(note, index * .09));
}

function setSound(enabled) {
  soundOn = enabled;
  music.setAttribute('aria-pressed', String(enabled));
  musicLabel.textContent = enabled ? 'Pausar música' : 'Música';
}

function stopMusic() {
  document.removeEventListener('click', resumeOnFirstTouch, true);
  audioRequest++;
  audio.pause();
  if (audioContext?.state === 'running') audioContext.suspend().catch(() => {});
  setSound(false);
  trackStatus.textContent = '';
}

async function startMusic(interactive = true) {
  const request = ++audioRequest;
  if (interactive && AudioEngine) {
    try {
      audioContext ||= new AudioEngine();
      audioContext.resume().catch(() => {});
    } catch {
      // The soundtrack can still play if sound effects are unavailable.
    }
  }

  try {
    audio.volume = .45;
    await audio.play();
    if (request !== audioRequest) return;
    if (interactive) document.removeEventListener('click', resumeOnFirstTouch, true);
    setSound(true);
    trackStatus.textContent = 'Sonando «For Your Love».';
  } catch (error) {
    if (request !== audioRequest) return;
    setSound(false);
    if (interactive || error.name !== 'NotAllowedError') {
      trackStatus.textContent = 'No se pudo reproducir «For Your Love».';
    }
  }
}

music.addEventListener('click', () => {
  if (soundOn) stopMusic();
  else startMusic();
});

function resumeOnFirstTouch(event) {
  if (!music.contains(event.target)) startMusic();
}

document.addEventListener('click', resumeOnFirstTouch, true);
startMusic(false);

const envelope = byId('envelope');
envelope.addEventListener('click', () => {
  const opening = byId('letter').hidden;
  byId('letter').hidden = !opening;
  envelope.setAttribute('aria-expanded', String(opening));
  envelope.setAttribute('aria-label', opening ? 'Cerrar la carta' : 'Abrir la carta');
  if (opening) {
    burst(envelope, 13);
    chime([72, 76, 79]);
  }
});

const heart = byId('heart');
const heartContext = byId('heart-shape').getContext('2d');
heartContext.scale(2, 2);
const target = 7;
let taps = 0;
let currentFill = 0;
let heartFrame;

function drawHeart(fill) {
  heartContext.clearRect(0, 0, 160, 150);
  heartContext.save();
  heartContext.clip(heartPath);
  if (fill > 0) {
    const top = 132 - fill * 128;
    const gradient = heartContext.createLinearGradient(0, 10, 0, 135);
    gradient.addColorStop(0, '#f44767');
    gradient.addColorStop(1, '#ba1846');
    heartContext.fillStyle = gradient;
    heartContext.beginPath();
    heartContext.moveTo(0, top);
    heartContext.bezierCurveTo(53, top - 15, 101, top + 12, 160, top - 3);
    heartContext.lineTo(160, 150);
    heartContext.lineTo(0, 150);
    heartContext.fill();
  }
  heartContext.restore();
  heartContext.strokeStyle = '#b52d55';
  heartContext.lineWidth = 3.2;
  heartContext.stroke(heartPath);
}

drawHeart(0);
heart.addEventListener('click', () => {
  if (taps === target) return;
  taps++;
  const destination = taps / target;
  const from = currentFill;
  const start = performance.now();
  cancelAnimationFrame(heartFrame);
  function animateFill(now) {
    const progress = reducedMotion.matches ? 1 : Math.min(1, (now - start) / 340);
    currentFill = from + (destination - from) * (1 - (1 - progress) ** 3);
    drawHeart(currentFill);
    if (progress < 1) heartFrame = requestAnimationFrame(animateFill);
  }
  heartFrame = requestAnimationFrame(animateFill);
  burst(heart, taps === target ? 22 : 4);
  chime(taps === target ? [76, 79, 84] : [65 + taps]);
  byId('heart-progress').textContent = taps === target ? '¡Corazón lleno! ♥' : taps + ' de ' + target + ' toques';
  if (taps === target) {
    heart.setAttribute('aria-disabled', 'true');
    byId('heart-message').hidden = false;
  }
});

const wish = byId('wish');
wish.addEventListener('click', () => {
  if (wish.getAttribute('aria-expanded') === 'true') return;
  wish.setAttribute('aria-expanded', 'true');
  wish.textContent = 'Deseo pedido ♡';
  byId('wish-message').hidden = false;
  burst(wish, 28);
  chime([67, 71, 74, 79]);
});
