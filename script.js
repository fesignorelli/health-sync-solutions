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
emailjs.init('fbGJwvpgoIab7GSF9');

const form = document.querySelector('.demo-form');

/* verifica se já enviou */
if (localStorage.getItem('hss_form_enviado')) {
    form.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
            
            <div style="width: 72px; height: 72px; background: #EAF7CF; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5C7457" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <h2 style="font-family: 'Lora', Georgia, serif; font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px;">
                Solicitação já enviada!
            </h2>

            <p style="font-family: 'Hind Madurai', sans-serif; font-size: 16px; line-height: 1.7; color: #555; max-width: 320px; margin: 0;">
                Já recebemos seus dados. Em breve um especialista entrará em contato.
            </p>

        </div>
    `;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        instituicao: document.getElementById('instituicao').value,
        cargo: document.getElementById('cargo').value,
        porte: document.getElementById('porte').value,
        telefone: document.getElementById('telefone').value,
        desafio: document.getElementById('desafio').value,
    };

    try {
        await emailjs.send('service_002wob6', 'template_czlxoj3', dados);
        await emailjs.send('service_002wob6', 'template_tv60m7s', dados);

        /* salva no localStorage após envio bem-sucedido */
        localStorage.setItem('hss_form_enviado', 'true');

        form.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
                
                <div style="width: 72px; height: 72px; background: #EAF7CF; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5C7457" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h2 style="font-family: 'Lora', Georgia, serif; font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px;">
                    Solicitação enviada!
                </h2>

                <p style="font-family: 'Hind Madurai', sans-serif; font-size: 16px; line-height: 1.7; color: #555; max-width: 320px; margin: 0 0 32px;">
                    Em breve um especialista entrará em contato.<br>
                    Verifique seu e-mail para a confirmação.
                </p>

            </div>
        `;
    } catch (err) {
        console.error(err);
        btn.textContent = 'Erro ao enviar. Tente novamente.';
        btn.disabled = false;
    }
});