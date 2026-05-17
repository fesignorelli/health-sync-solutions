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

/* ── FORMULÁRIO ── */
const form = document.querySelector('.demo-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.getElementById('replyto-hidden').value =
        document.getElementById('email').value;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
        form.innerHTML = `
            <div style="text-align:center; padding: 40px 0;">
                <p style="font-size: 48px;">✅</p>
                <h2 style="margin: 16px 0 8px; font-family: var(--font-display);">Recebemos sua solicitação!</h2>
                <p style="font-family: var(--font-body); color: #555;">Em breve um especialista entrará em contato.<br>Verifique seu e-mail para a confirmação.</p>
            </div>
        `;
    } else {
        btn.textContent = 'Erro ao enviar. Tente novamente.';
        btn.disabled = false;
    }
});