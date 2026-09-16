const express = require('express');
const path = require('path');
const fs = require('fs'); // Módulo do Node para ler arquivos (File System)
const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Rota de Login (Porta de entrada)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Verificador de Senha
app.post('/login', (req, res) => {
    if (req.body.usuario === 'admin' && req.body.senha === 'admin') {
        res.redirect('/dashboard'); 
    } else {
        res.send('<h1>❌ Acesso Negado!</h1><a href="/">Voltar</a>');
    }
});

// O Dashboard protegido
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// NOVA ROTA: A ponte de dados (API)
app.get('/api/dados', (req, res) => {
    // Lê o arquivo dados.json e envia para a tela
    const dados = JSON.parse(fs.readFileSync(path.join(__dirname, 'dados.json')));
    res.json(dados);
});

app.listen(porta, () => {
    console.log(`✅ Motor ligado! Acesse: http://localhost:${porta}`);
});