const venom = require('venom-bot');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let qrCodeBase64 = '';

venom
  .create(
    'sessionName',
    (base64Qrimg, asciiQR) => {
      qrCodeBase64 = base64Qrimg;
      console.log('QR Code gerado!');
    },
    (statusSession) => {
      console.log('Status da sessão:', statusSession);
    },
    {
      multidevice: true,
    }
  )
  .then((client) => {
    console.log('Bot iniciado com sucesso!');
    // Aqui você pode adicionar a lógica para lidar com mensagens
  })
  .catch((erro) => {
    console.log('Erro ao iniciar o bot:', erro);
  });

app.get('/', (req, res) => {
  if (qrCodeBase64) {
    res.send(`<img src="${qrCodeBase64}" alt="QR Code">`);
  } else {
    res.send('QR Code ainda não gerado. Aguarde alguns segundos e atualize a página.');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
