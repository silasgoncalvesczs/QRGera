const form = document.querySelector('#qr-form');
const qrCodeDiv = document.querySelector('#qrcode');
const btnSalvar = document.getElementById('salvar');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = document.querySelector('#link').value;

    if (link) {
        qrCodeDiv.innerHTML = '';
        qrCodeDiv.style.display = 'block';

        // Gerando o QR Code
        new QRCode(qrCodeDiv, {
            text: link,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        btnSalvar.style.display = 'block';
    }
});

function salvarQRCode() {
    // Captura apenas a área branca do QR Code
    html2canvas(qrCodeDiv, {
        backgroundColor: "#ffffff", // Força fundo branco
        scale: 4,                   // Salva em 4x a resolução (muito mais nítido)
        useCORS: true,
        logging: false
    }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qrcode-qrgera.png';
        link.href = image;
        link.click();
    });
}

btnSalvar.addEventListener('click', salvarQRCode);