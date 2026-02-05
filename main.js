const form = document.querySelector('#qr-form');
const qrCodeDiv = document.querySelector('#qrcode');
const actionsContainer = document.getElementById('actions-container'); // Novo container
const btnSalvar = document.getElementById('salvar');
const btnCompartilhar = document.getElementById('compartilhar'); // Novo botão

let qrCodeInstance = null; // Para guardar a instância do QRCode

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = document.querySelector('#link').value;

    if (link) {
        // Limpa o anterior se houver
        if (qrCodeInstance) {
            qrCodeInstance.clear();
            qrCodeDiv.innerHTML = '';
        }

        qrCodeDiv.style.display = 'block';

        // Gerando o QR Code
        qrCodeInstance = new QRCode(qrCodeDiv, {
            text: link,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Mostra os botões de ação (agora dentro do container)
        actionsContainer.style.display = 'flex';
    }
});


// --- FUNÇÃO AUXILIAR: Gera o arquivo de imagem (Blob) ---
// Esta função retorna uma Promise que resolve com o arquivo da imagem.
function gerarImagemBlob() {
    return new Promise((resolve, reject) => {
        // Captura apenas a área branca do QR Code
        html2canvas(qrCodeDiv, {
            backgroundColor: "#ffffff", // Força fundo branco
            scale: 4,                   // Salva em 4x a resolução
            useCORS: true,
            logging: false
        }).then(canvas => {
            // Converte o canvas para um Blob (arquivo na memória)
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Falha ao gerar o arquivo de imagem."));
                }
            }, 'image/png');
        }).catch(err => reject(err));
    });
}


// --- FUNÇÃO DE DOWNLOAD (Atualizada) ---
async function salvarQRCode() {
    try {
        // Aguarda a geração da imagem
        const blob = await gerarImagemBlob();

        // Cria um link temporário para download a partir do Blob
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'qrcode-qrgera.png';
        link.href = url;
        link.click();

        // Limpa a memória
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Desculpe, ocorreu um erro ao tentar baixar a imagem.");
    }
}

// --- NOVA FUNÇÃO DE COMPARTILHAR ---
async function compartilharQRCode() {
    try {
        // Verifica se o navegador suporta compartilhamento
        if (!navigator.canShare) {
            alert("Seu navegador não suporta o compartilhamento nativo de arquivos.");
            return;
        }

        // Muda o texto do botão temporariamente para dar feedback
        const textoOriginal = btnCompartilhar.innerHTML;
        btnCompartilhar.innerText = "Gerando...";
        btnCompartilhar.disabled = true;

        // 1. Gera o arquivo da imagem (Blob)
        const blob = await gerarImagemBlob();

        // 2. Cria um objeto File a partir do Blob (necessário para a API de share)
        const file = new File([blob], "meu-qrcode.png", { type: "image/png" });

        // 3. Prepara os dados para compartilhamento
        const shareData = {
            title: 'QRGera',
            text: 'Criei este QR Code usando o QRGera!',
            files: [file] // Array de arquivos
        };

        // 4. Tenta compartilhar se os dados forem válidos
        if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            console.log('Compartilhado com sucesso');
        } else {
            alert("Não foi possível compartilhar este arquivo neste dispositivo.");
        }

    } catch (error) {
        // Se o usuário cancelar o compartilhamento, cai aqui também (AbortError)
        if (error.name !== 'AbortError') {
            console.error('Erro ao compartilhar:', error);
            alert('Ocorreu um erro ao tentar compartilhar. Tente baixar a imagem.');
        }
    } finally {
        // Restaura o botão
        btnCompartilhar.innerHTML = textoOriginal;
        btnCompartilhar.disabled = false;
    }
}

// Listeners
btnSalvar.addEventListener('click', salvarQRCode);
btnCompartilhar.addEventListener('click', compartilharQRCode);