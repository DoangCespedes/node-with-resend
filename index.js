const express = require("express");
const { Resend } = require("resend");
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

console.log('primer paso' , process.env.FROM_EMAIL)

app.use(cors()); 

// Primera ruta para Doang Cespedes
app.post('/doangcespedesform', async (req, res) => {
  const formData = req.body;
  const toEmail = formData.to || process.env.DEFAULT_RECIPIENT_EMAIL;


  const templatePath = path.join(__dirname, './html/DoangCespedes.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  htmlContent = htmlContent
    .replace(/\{\{name\}\}/g, formData.name || '')
    .replace(/\{\{email\}\}/g, formData.email || '')
    .replace(/\{\{subject\}\}/g, formData.subject || '')
    .replace(/\{\{message\}\}/g, formData.message || '');

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL , 
      to: toEmail,
      subject: 'Nuevo formulario recibido',
      html: htmlContent,
    });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Segunda ruta para Oscar Loreto
app.post('/oscarloretoform', async (req, res) => {
  const formData = req.body;
  const toEmail = formData.to || process.env.OL_EMAIL;


  const templatePath = path.join(__dirname, './html/OscarLoreto.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  htmlContent = htmlContent
    .replace(/\{\{name\}\}/g, formData.name || '')
    .replace(/\{\{email\}\}/g, formData.email || '')
    .replace(/\{\{subject\}\}/g, formData.subject || '')
    .replace(/\{\{message\}\}/g, formData.message || '');

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL , 
      to: toEmail,
      subject: 'Nuevo formulario recibido',
      html: htmlContent,
    });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Tercera ruta para Collision center
app.post('/collisioncenterform', async (req, res) => {
  const formData = req.body;
  const toEmail = "collicenterpdr@gmail.com"; // destinatario fijo para Render

  const templatePath = path.join(__dirname, './html/collisioncenter.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  htmlContent = htmlContent
    .replace(/\{\{fullName\}\}/g, formData.fullName || '')
    .replace(/\{\{phone\}\}/g, formData.phone || '')
    .replace(/\{\{email\}\}/g, formData.email || '')
    .replace(/\{\{vinNumber\}\}/g, formData.vinNumber || '')
    .replace(/\{\{damageType\}\}/g, formData.damageType || '')
    .replace(/\{\{insuranceCompany\}\}/g, formData.insuranceCompany || 'N/A')
    .replace(/\{\{description\}\}/g, formData.description || '');

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL , 
      to: toEmail,
      subject: 'Nueva cotización recibida - Collision Center',
      html: htmlContent,
    });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('API para enviar correos desde formularios');  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});