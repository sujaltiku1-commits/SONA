// ===== SORRY WEBSITE - INTERACTIVE SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    initHearts();
    initSparkles();
    initEnvelope();
    initNavigation();
    initMusic();
});

// ===== FLOATING HEARTS =====
const MAX_HEARTS = 20;
const MAX_SPARKLES = 15;

function initHearts() {
    const container = document.getElementById('hearts-container');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '🤍', '💜', '🩵'];

    function createHeart() {
        // Cap DOM elements
        if (container.childElementCount >= MAX_HEARTS) return;

        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        heart.style.animationDuration = (8 + Math.random() * 6) + 's';
        container.appendChild(heart);

        heart.addEventListener('animationend', () => heart.remove());
    }

    // Initial burst (fewer)
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 300);
    }

    // Continuous — slower rate
    setInterval(createHeart, 1500);
}

// ===== SPARKLES =====
function initSparkles() {
    const container = document.getElementById('sparkles-container');

    function createSparkle() {
        if (container.childElementCount >= MAX_SPARKLES) return;

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
        const size = (4 + Math.random() * 4) + 'px';
        sparkle.style.width = size;
        sparkle.style.height = size;
        container.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 5000);
    }

    // Initial sparkles (fewer)
    for (let i = 0; i < 10; i++) {
        setTimeout(createSparkle, i * 200);
    }

    setInterval(createSparkle, 1200);
}

// ===== ENVELOPE =====
function initEnvelope() {
    const envelope = document.getElementById('envelope');

    envelope.addEventListener('click', () => {
        if (envelope.classList.contains('opened')) return;

        envelope.classList.add('opened');

        // Create burst of hearts on click
        createClickBurst(envelope);

        // Transition to scene 2 after animation
        setTimeout(() => {
            transitionToScene('scene-1', 'scene-2');
            setTimeout(() => startScene2(), 400);
        }, 1200);
    });
}

// ===== CLICK BURST EFFECT =====
function createClickBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const emojis = ['💖', '💕', '✨', '💗', '🌸', '💝'];

    for (let i = 0; i < 12; i++) {
        const emoji = document.createElement('span');
        emoji.className = 'explosion-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = centerX + 'px';
        emoji.style.top = centerY + 'px';

        const angle = (i / 12) * Math.PI * 2;
        const distance = 80 + Math.random() * 120;
        emoji.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        emoji.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

        document.getElementById('hug-explosion').appendChild(emoji);
        setTimeout(() => emoji.remove(), 2000);
    }
}

// ===== SCENE TRANSITIONS =====
function transitionToScene(fromId, toId) {
    const fromScene = document.getElementById(fromId);
    const toScene = document.getElementById(toId);

    fromScene.classList.add('slide-out');
    fromScene.classList.remove('active');

    setTimeout(() => {
        fromScene.classList.remove('slide-out');
        fromScene.style.visibility = 'hidden';
        fromScene.style.opacity = '0';

        toScene.classList.add('active', 'slide-in');
        toScene.style.visibility = 'visible';
        toScene.style.opacity = '1';

        setTimeout(() => {
            toScene.classList.remove('slide-in');
        }, 800);
    }, 600);
}

// ===== TYPEWRITER EFFECT =====
function typeWriter(element, text, speed = 60, callback) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// ===== SCENE 2: SORRY MESSAGE =====
function startScene2() {
    const title = document.getElementById('sorry-title');
    const subtitle = document.getElementById('sorry-subtitle');
    const divider = document.querySelector('.heart-divider');
    const image = document.getElementById('cute-image');

    typeWriter(title, "I'm So Sorry, My Love 💗💗💗", 70, () => {
        divider.classList.add('visible');

        setTimeout(() => {
            subtitle.classList.add('visible');
            typeWriter(subtitle, "I never meant to hurt you. You deserve so much better.", 50, () => {
                setTimeout(() => {
                    image.classList.add('visible');
                }, 400);
            });
        }, 500);
    });
}

// ===== SCENE 3: LETTER ANIMATION =====
function startScene3() {
    const lines = document.querySelectorAll('.letter-line');
    const signature = document.querySelector('.letter-signature');

    lines.forEach((line) => {
        const delay = parseInt(line.getAttribute('data-delay'));
        setTimeout(() => {
            line.classList.add('visible');
        }, delay);
    });

    // Show signature after all lines
    setTimeout(() => {
        signature.classList.add('visible');
    }, 3000);
}

// ===== SCENE 4: PROMISES ANIMATION =====
function startScene4() {
    const items = document.querySelectorAll('.promise-item');

    items.forEach((item) => {
        const delay = parseInt(item.getAttribute('data-delay'));
        setTimeout(() => {
            item.classList.add('visible');
        }, delay);
    });
}

// ===== SCENE 5: FINALE =====
function startScene5() {
    const finaleText = document.getElementById('finale-text');
    const finaleSub = document.querySelector('.finale-sub');

    // Epic emoji explosion
    createHugExplosion();

    typeWriter(finaleText, "I Love You More Than Words Can Say. Please Forgive Me My Sona 🥺🫶", 60, () => {
        setTimeout(() => {
            finaleSub.classList.add('visible');
        }, 500);
    });
}

function createHugExplosion() {
    const container = document.getElementById('hug-explosion');
    const emojis = ['💖', '💕', '💗', '🤗', '💝', '✨', '🌸', '💓', '🥰', '💘'];
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('span');
            emoji.className = 'explosion-emoji';
            emoji.textContent = emojis[i % emojis.length];
            emoji.style.left = startX + 'px';
            emoji.style.top = startY + 'px';

            const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.3;
            const distance = 120 + Math.random() * 200;
            emoji.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            emoji.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            emoji.style.fontSize = (1.8 + Math.random() * 1.2) + 'rem';

            container.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2500);
        }, i * 120);
    }
}

// ===== NAVIGATION BUTTONS =====
function initNavigation() {
    document.getElementById('next-btn-1').addEventListener('click', (e) => {
        createClickBurst(e.target);
        transitionToScene('scene-2', 'scene-3');
        setTimeout(() => startScene3(), 800);
    });

    document.getElementById('next-btn-2').addEventListener('click', (e) => {
        createClickBurst(e.target);
        transitionToScene('scene-3', 'scene-4');
        setTimeout(() => startScene4(), 800);
    });

    document.getElementById('hug-btn').addEventListener('click', (e) => {
        createClickBurst(e.target);
        transitionToScene('scene-4', 'scene-5');
        setTimeout(() => startScene5(), 800);
    });

    document.getElementById('replay-btn').addEventListener('click', () => {
        // Reset all animations
        resetAllScenes();
        transitionToScene('scene-5', 'scene-1');
    });
}

// ===== RESET =====
function resetAllScenes() {
    // Reset envelope
    document.getElementById('envelope').classList.remove('opened');

    // Reset scene 2
    document.getElementById('sorry-title').textContent = '';
    document.getElementById('sorry-subtitle').textContent = '';
    document.querySelector('.sorry-subtitle').classList.remove('visible');
    document.querySelector('.heart-divider').classList.remove('visible');
    document.getElementById('cute-image').classList.remove('visible');

    // Reset scene 3
    document.querySelectorAll('.letter-line').forEach(l => l.classList.remove('visible'));
    document.querySelector('.letter-signature').classList.remove('visible');

    // Reset scene 4
    document.querySelectorAll('.promise-item').forEach(p => p.classList.remove('visible'));

    // Reset scene 5
    document.getElementById('finale-text').textContent = '';
    document.querySelector('.finale-sub').classList.remove('visible');
}

// ===== MUSIC =====
function initMusic() {
    const btn = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');

    let audioCtx = null;
    let isPlaying = false;
    let oscillators = [];
    let musicStarted = false;

    // Auto-start music on first user interaction (browsers require a gesture)
    function autoStartOnce() {
        if (!musicStarted) {
            musicStarted = true;
            playMusic();
            btn.classList.add('playing');
            icon.textContent = '🎶';
            isPlaying = true;
        }
        document.removeEventListener('click', autoStartOnce);
        document.removeEventListener('touchstart', autoStartOnce);
    }

    document.addEventListener('click', autoStartOnce);
    document.addEventListener('touchstart', autoStartOnce, { passive: true });

    // Toggle button still works to pause/resume
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent double-trigger with autoStart
        if (!musicStarted) return; // autoStartOnce handles first play

        if (isPlaying) {
            stopMusic();
            btn.classList.remove('playing');
            icon.textContent = '🎵';
            isPlaying = false;
        } else {
            playMusic();
            btn.classList.add('playing');
            icon.textContent = '🎶';
            isPlaying = true;
        }
    });

    function playMusic() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Simple melody notes (frequencies)
        const melody = [
            { freq: 523.25, dur: 0.5 }, // C5
            { freq: 587.33, dur: 0.5 }, // D5
            { freq: 659.25, dur: 0.75 }, // E5
            { freq: 587.33, dur: 0.25 }, // D5
            { freq: 523.25, dur: 0.5 }, // C5
            { freq: 493.88, dur: 0.5 }, // B4
            { freq: 523.25, dur: 1.0 }, // C5
            { freq: 392.00, dur: 0.5 }, // G4
            { freq: 440.00, dur: 0.5 }, // A4
            { freq: 493.88, dur: 0.75 }, // B4
            { freq: 440.00, dur: 0.25 }, // A4
            { freq: 392.00, dur: 0.5 }, // G4
            { freq: 349.23, dur: 0.5 }, // F4
            { freq: 392.00, dur: 1.0 }, // G4
        ];

        function playMelody(startTime) {
            let time = startTime;
            melody.forEach(note => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = 'sine';
                osc.frequency.value = note.freq;

                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.08, time + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, time + note.dur);

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(time);
                osc.stop(time + note.dur + 0.1);
                oscillators.push(osc);

                time += note.dur;
            });
            return time;
        }

        // Play and loop
        let nextStart = audioCtx.currentTime;
        function loopMelody() {
            nextStart = playMelody(nextStart);
            setTimeout(loopMelody, (nextStart - audioCtx.currentTime) * 1000 - 100);
        }
        loopMelody();
    }

    function stopMusic() {
        if (audioCtx) {
            audioCtx.close();
            audioCtx = null;
            oscillators = [];
        }
    }
}

// ===== CURSOR TRAIL HEARTS (Throttled) =====
let lastTrailTime = 0;
const TRAIL_THROTTLE = 80; // ms between trail particles
const trailContainer = document.getElementById('hug-explosion');
const trailEmojis = ['💕', '✨', '💗'];

function createTrailHeart(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < TRAIL_THROTTLE) return;
    lastTrailTime = now;

    const heart = document.createElement('span');
    heart.className = 'explosion-emoji';
    heart.textContent = trailEmojis[Math.floor(Math.random() * 3)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '0.9rem';
    heart.style.setProperty('--tx', (Math.random() - 0.5) * 50 + 'px');
    heart.style.setProperty('--ty', -25 - Math.random() * 30 + 'px');
    heart.style.animationDuration = '0.8s';

    trailContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) createTrailHeart(e.clientX, e.clientY);
});

// ===== TOUCH TRAIL HEARTS FOR MOBILE =====
document.addEventListener('touchmove', (e) => {
    if (Math.random() > 0.75) {
        const touch = e.touches[0];
        createTrailHeart(touch.clientX, touch.clientY);
    }
}, { passive: true });
