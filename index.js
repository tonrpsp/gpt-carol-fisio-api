// gpt-carol-fisio-api/index.js

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/gpt-carol-fisio', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }],
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Erro na API:', error);
        res.status(500).json({ response: 'Erro ao conectar ao GPT.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API GPT Carol Fisio rodando na porta ${PORT}`));
