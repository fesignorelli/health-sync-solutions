/* ── NAV TOGGLE ── */
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
const icon = toggle.querySelector('i');

toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
});

/* ── FECHAR AO CLICAR EM LINK ── */
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

/* ── FECHAR AO CLICAR FORA ── */
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
});

/* ── ANIMAÇÕES DE SCROLL ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));