window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // --- Hearts Animation & Overheat/Break on Short Link ---
    let heartClickCount = 0;
    let overheated = false;
    let broken = false;
    let breakTimeout = null;
    const shortLink = document.querySelector('.short-link');
    if (shortLink) {
        shortLink.addEventListener('click', (e) => {
            if (broken) return;
            heartClickCount++;
            // hearts
            for (let i = 0; i < 6; i++) {
                const heart = document.createElement('span');
                heart.textContent = '❤️';
                heart.className = 'heart-emit';
                const angle = Math.random() * 2 * Math.PI;
                const distance = 60 + Math.random() * 40;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                heart.style.left = `${e.clientX - 10}px`;
                heart.style.top = `${e.clientY - 10}px`;
                heart.style.setProperty('--tx', `${x}px`);
                heart.style.setProperty('--ty', `${y}px`);
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1200);
            }
            // Overheat effect
            if (!overheated && heartClickCount >= 10) {
                overheated = true;
                shortLink.classList.add('overheat');
            }
            // Break effect
            if (!broken && heartClickCount >= 18) {
                broken = true;
                shortLink.classList.remove('overheat');
                shortLink.classList.add('break');
                // EXPLODE the short-link
                explodeShortLink(shortLink);
                // Swing the remaining piece (optional, can be removed if you want only explosion)
                shortLink.classList.add('swing');
                if (breakTimeout) clearTimeout(breakTimeout);
                breakTimeout = setTimeout(() => {
                    shortLink.classList.remove('swing');
                }, 10000);
            }
        });

        // --- hover message ---
        let hoverTimeout20 = null;
        let hoverTimeout40 = null;
        let hoverTimeout80 = null;
        let hoverDisabled = false;
        shortLink.addEventListener('mousedown', () => {
            hoverDisabled = true;
        });
        shortLink.addEventListener('mouseup', () => {
            hoverDisabled = false;
        });
        shortLink.addEventListener('mouseleave', () => {
            hoverDisabled = false;
        });
        shortLink.addEventListener('mouseenter', () => {
            if (hoverDisabled) return;
            hoverTimeout20 = setTimeout(() => {
                showHoverMsg('why are you doing this?');
            }, 8000); // 8 seconds
            hoverTimeout40 = setTimeout(() => {
                showHoverMsg('You have been hovering for a while...');
            }, 16000); // 16 seconds
            hoverTimeout80 = setTimeout(() => {
                showHoverMsg('Maybe you should stop?');
            }, 30000); // 30 seconds
        });
        shortLink.addEventListener('mouseleave', () => {
            if (hoverTimeout20) clearTimeout(hoverTimeout20);
            if (hoverTimeout40) clearTimeout(hoverTimeout40);
            if (hoverTimeout80) clearTimeout(hoverTimeout80);
        });
        function showHoverMsg(text) {
            if (hoverDisabled) return;
            const msg = document.createElement('div');
            msg.className = 'long-hover-message';
            msg.textContent = text;
            document.body.appendChild(msg);
            // Position message below the short-link
            const rect = shortLink.getBoundingClientRect();
            msg.style.left = rect.left + rect.width / 2 - 80 + 'px';
            msg.style.top = rect.bottom + 10 + 'px';
            setTimeout(() => msg.remove(), 4000);
        }
    }
    // Explode animation for the short-link
    function explodeShortLink(el) {
        const chars = el.textContent.split('');
        el.textContent = '';
        chars.forEach((c, i) => {
            const span = document.createElement('span');
            span.textContent = c;
            span.className = 'short-link-explode';
            el.appendChild(span);
            const angle = (Math.PI * 2 * i) / chars.length + Math.random() * 0.5;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            span.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(1.7) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], {
                duration: 1200 + Math.random() * 400,
                fill: 'forwards',
                easing: 'cubic-bezier(.7,.2,.2,1.2)'
            });
            setTimeout(() => span.remove(), 1400);
        });
    }

    // --- dev badge hover message ---
    const badgeDev = document.querySelector('.badge-dev');
    let badgeDevMsgTimeout = null;
    if (badgeDev) {
        badgeDev.addEventListener('mouseenter', () => {
            const msg = document.createElement('div');
            msg.className = 'badge-dev-hover-message';
            msg.innerHTML = `<span class="fade-text">i'm tired</span><span class="badge-dev-typing"><span></span><span></span><span></span></span>`;
            document.body.appendChild(msg);
            // Position message above the badge
            const rect = badgeDev.getBoundingClientRect();
            msg.style.left = rect.left + rect.width / 2 - 70 + 'px';
            msg.style.top = rect.top - 38 + 'px';
            badgeDevMsgTimeout = msg;
        });
        badgeDev.addEventListener('mouseleave', () => {
            if (badgeDevMsgTimeout) {
                badgeDevMsgTimeout.remove();
                badgeDevMsgTimeout = null;
            }
        });
    }

    // --- Custom tooltip for top-bar buttons (badge-dev style, robust, by class, FINAL FIX) ---
    const tooltipMap = [
        { selector: '12projects', text: 'My projects', target: 'projects' },
        { selector: '23resume', text: 'My resume', target: 'nothing' },
        { selector: '34contact', text: 'My contacts', target: 'contactme' },
    //{ selector: '45accounts', text: 'My accounts', target: 'contactme#accounts' }
    ];
    tooltipMap.forEach(({ selector, text, target }) => {
        const btns = document.getElementsByClassName(selector);
        Array.from(btns).forEach(btn => {
            let tooltipDiv = null;
            btn.addEventListener('mouseenter', function () {
                document.querySelectorAll('.badge-dev-hover-message').forEach(el => el.remove());
                tooltipDiv = document.createElement('div');
                tooltipDiv.className = 'badge-dev-hover-message';
                tooltipDiv.innerHTML = `<span class=\"fade-text\">${text}</span>`;
                document.body.appendChild(tooltipDiv);
                requestAnimationFrame(() => {
                    const rect = btn.getBoundingClientRect();
                    const tipRect = tooltipDiv.getBoundingClientRect();
                    let left = rect.left + rect.width / 2 - tipRect.width / 2;
                    let top = rect.top - tipRect.height - 8;
                    if (left < 4) left = 4;
                    if (left + tipRect.width > window.innerWidth - 4) left = window.innerWidth - tipRect.width - 4;
                    if (top < 4) top = rect.bottom + 8;
                    tooltipDiv.style.left = left + 'px';
                    tooltipDiv.style.top = top + 'px';
                });
            });
            btn.addEventListener('mouseleave', function () {
                if (tooltipDiv) {
                    tooltipDiv.remove();
                    tooltipDiv = null;
                }
            });
            btn.addEventListener('mousedown', function () {
                if (tooltipDiv) {
                    tooltipDiv.remove();
                    tooltipDiv = null;
                }
            });
            if (target) {
                btn.addEventListener('click', function () {
                    window.location.href = target;
                });
            }
        });
    });

    /* --- Animated website title (running awhly.dev) ---
    const titleBase = 'awhly.dev';
    let titleIndex = 0;
    let titleDirection = 1; // 1 = forward, -1 = backward
    function animateTitle() {
        document.title = titleBase.slice(0, titleIndex);
        if (titleDirection === 1) {
            if (titleIndex < titleBase.length) {
                titleIndex++;
            } else {
                titleDirection = -1;
                titleIndex--;
            }
        } else {
            if (titleIndex > 0) {
                titleIndex--;
            } else {
                titleDirection = 1;
                titleIndex++;
            }
        }
        setTimeout(animateTitle, 600);
    }
    animateTitle(); */

    
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
