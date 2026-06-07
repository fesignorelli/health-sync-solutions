/* ── LUCIDE — renderiza todos os ícones ao carregar ── */
lucide.createIcons();

/* ── NAV TOGGLE ── */
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');
const icon   = toggle.querySelector('i');

// Acessibilidade: estado inicial
toggle.setAttribute('aria-expanded', 'false');
toggle.setAttribute('aria-controls', 'nav-menu');

toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    toggle.setAttribute('aria-expanded', String(isOpen)); // acessibilidade
    lucide.createIcons();
});

/* ── FECHAR AO CLICAR EM LINK ── */
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        icon.setAttribute('data-lucide', 'menu');
        toggle.setAttribute('aria-expanded', 'false');
        lucide.createIcons();
    });
});

/* ── FECHAR AO CLICAR FORA ── */
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        icon.setAttribute('data-lucide', 'menu');
        toggle.setAttribute('aria-expanded', 'false');
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

/* ── FORMULÁRIO — EmailJS ── */
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
        nome:        document.getElementById('nome').value,
        email:       document.getElementById('email').value,
        instituicao: document.getElementById('instituicao').value,
        cargo:       document.getElementById('cargo').value,
        porte:       document.getElementById('porte').value,
        telefone:    document.getElementById('telefone').value,
        desafio:     document.getElementById('desafio').value,
    };

    try {
        await emailjs.send('service_002wob6', 'template_czlxoj3', dados);
        await emailjs.send('service_002wob6', 'template_tv60m7s', dados);

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

/* ── FORMULÁRIO — validação de acessibilidade ── */
form.addEventListener('submit', (e) => {
    let temErro = false;

    form.querySelectorAll('[required]').forEach((campo) => {
        if (!campo.value.trim()) {
            campo.setAttribute('aria-invalid', 'true');
            campo.setAttribute('aria-describedby', campo.id + '-erro');

            let msgErro = document.getElementById(campo.id + '-erro');
            if (!msgErro) {
                msgErro = document.createElement('span');
                msgErro.id = campo.id + '-erro';
                msgErro.className = 'campo-erro';
                msgErro.setAttribute('role', 'alert');
                campo.parentNode.appendChild(msgErro);
            }
            msgErro.textContent = 'Este campo é obrigatório.';
            temErro = true;
        } else {
            campo.removeAttribute('aria-invalid');
            const msgErro = document.getElementById(campo.id + '-erro');
            if (msgErro) msgErro.textContent = '';
        }
    });

    if (temErro) {
        e.preventDefault();
        const primeiro = form.querySelector("[aria-invalid='true']");
        if (primeiro) primeiro.focus();
    }
});

form.querySelectorAll('[required]').forEach((campo) => {
    campo.addEventListener('input', () => {
        if (campo.value.trim()) {
            campo.removeAttribute('aria-invalid');
            const msgErro = document.getElementById(campo.id + '-erro');
            if (msgErro) msgErro.textContent = '';
        }
    });
});

/* ── CALCULADORA DE ROI ── */
(function () {
    const REDUCAO_HORAS     = 0.875;
    const REDUCAO_INCIDENTE = 0.95;
    const INVEST_MENSAL     = 2990;

    const sliders = {
        medicos       : document.getElementById('medicos'),
        dias          : document.getElementById('dias'),
        horas         : document.getElementById('horas'),
        custoHora     : document.getElementById('custo-hora'),
        incidentes    : document.getElementById('incidentes'),
        custoIncidente: document.getElementById('custo-incidente'),
    };

    const displays = {
        medicos       : document.getElementById('medicos-val'),
        dias          : document.getElementById('dias-val'),
        horas         : document.getElementById('horas-val'),
        custoHora     : document.getElementById('custo-hora-val'),
        incidentes    : document.getElementById('incidentes-val'),
        custoIncidente: document.getElementById('custo-incidente-val'),
    };

    const resultados = {
        horas  : document.getElementById('res-horas'),
        equipe : document.getElementById('res-equipe'),
        risco  : document.getElementById('res-risco'),
        total  : document.getElementById('res-total'),
        roi    : document.getElementById('res-roi'),
        payback: document.getElementById('res-payback'),
        tempo  : document.getElementById('res-tempo'),
    };

    if (!sliders.medicos || !resultados.horas) return;

    function formatarMoeda(valor) {
        if (valor >= 1_000_000) {
            return 'R$ ' + (valor / 1_000_000).toFixed(1).replace('.', ',') + ' M';
        }
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0,
        });
    }

    function formatarHoras(h) {
        return h.toLocaleString('pt-BR') + ' h';
    }

    function atualizarLabel(id, valor) {
        const el = displays[id];
        if (!el) return;
        switch (id) {
            case 'dias':          el.textContent = valor + ' dias'; break;
            case 'horas':         el.textContent = valor + ' h'; break;
            case 'custoHora':     el.textContent = 'R$ ' + valor + '/h'; break;
            case 'custoIncidente':el.textContent = formatarMoeda(Number(valor)); break;
            default:              el.textContent = valor;
        }
        if (sliders[id]) sliders[id].setAttribute('aria-valuenow', valor);
    }

    function calcular() {
        const medicos        = Number(sliders.medicos.value);
        const horasPorProc   = Number(sliders.horas.value);
        const custoHora      = Number(sliders.custoHora.value);
        const incidentes     = Number(sliders.incidentes.value);
        const custoIncidente = Number(sliders.custoIncidente.value);

        const horasEconomizadas = Math.round(medicos * horasPorProc * REDUCAO_HORAS);
        const economiaEquipe    = horasEconomizadas * custoHora;
        const economiaRisco     = Math.round(incidentes * custoIncidente * REDUCAO_INCIDENTE);
        const totalEconomizado  = economiaEquipe + economiaRisco;
        const investAnual       = INVEST_MENSAL * 12;
        const roi               = totalEconomizado > 0
            ? Math.round(((totalEconomizado - investAnual) / investAnual) * 100)
            : 0;
        const economizadoPorMes = totalEconomizado / 12;
        const paybackMeses      = economizadoPorMes > 0
            ? Math.ceil(INVEST_MENSAL / economizadoPorMes)
            : null;

        resultados.horas.textContent   = formatarHoras(horasEconomizadas);
        resultados.equipe.textContent  = formatarMoeda(economiaEquipe);
        resultados.risco.textContent   = formatarMoeda(economiaRisco);
        resultados.total.textContent   = formatarMoeda(totalEconomizado);
        resultados.roi.textContent     = roi > 0 ? roi + '%' : '—';
        resultados.payback.textContent = paybackMeses
            ? paybackMeses + (paybackMeses === 1 ? ' mês' : ' meses')
            : '—';
        resultados.tempo.textContent   = '~2 dias';
    }

    Object.keys(sliders).forEach((id) => {
        const slider = sliders[id];
        if (!slider) return;
        slider.addEventListener('input', () => {
            atualizarLabel(id, slider.value);
            calcular();
        });
    });

    calcular();
})();