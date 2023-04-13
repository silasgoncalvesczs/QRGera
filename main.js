const form = document.querySelector('form');
const qrCodeDiv = document.querySelector('#qrcode');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const link = document.querySelector('#link').value;

    if (link) {
        qrCodeDiv.innerHTML = '';
        new QRCode(qrCodeDiv, link);
    }
});

html2canvas(document.querySelector("#qrcode")).then(canvas => {
    document.body.appendChild(canvas)
});

function salvarQRCode() {
    const qrCodeDiv = document.querySelector('#qrcode');

    html2canvas(qrCodeDiv).then(canvas => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

const botaoSalvar = document.querySelector('#salvar');
botaoSalvar.addEventListener('click', salvarQRCode);
