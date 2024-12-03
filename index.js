const express = require("express");
const { Resend } = require("resend");

const app = express();
const resend = new Resend("API_KEY_RESEND");//Aqui solo va el API_KEY_RESEND Solo eso necesitamos para el envio del correo

app.get("/", async (req, res) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <noreply@tu_dominio_registrado_en_resend.com>",//yo use collisioncenterpdr.com ===> El dominio te ayuda a enviar correos a todas las companias de correos.
      to: ["doangcespedesloreto@outlook.com"],
      subject: "hello world",
      html: "<strong>it works!</strong>",
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
