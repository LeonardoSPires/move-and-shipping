// Botão flutuante do WhatsApp

function setupWhatsappMessages() {
    const text = document.querySelector('.whatsapp-message');

    if (!text) return;

    const msgs = [
        '📦 Solicite sua cotação!',
        '🌎 Mudanças Nacionais e Internacionais.',
        '💬 Fale com um especialista agora!'
    ];

    let i = 0;

    setInterval(() => {
        text.style.opacity = 0;
        text.style.transform = 'translateY(8px)';

        setTimeout(() => {
            i = (i + 1) % msgs.length;
            text.textContent = msgs[i];

            text.style.opacity = 1;
            text.style.transform = 'translateY(0)';
        }, 500);

    }, 5500);
}
