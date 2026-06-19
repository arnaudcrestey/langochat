import nodemailer from "nodemailer";
import type { TalkInput } from "@/lib/talk";

export async function sendTalkSurveyEmail(input: TalkInput) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.TALK_SURVEY_EMAIL_TO;

  if (!host || !user || !pass || !to) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });

  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris"
  });

  await transporter.sendMail({
    from: `"LANGOCHAT" <${user}>`,
    to,
    subject: "LANGOCHAT — Nouvelle utilisation Comment en parler",
    text: `
Nouvelle utilisation anonyme de l'outil "Comment en parler"

Date et heure :
${now}

Informations utiles :
- Âge : ${input.age}
- Lien avec l'enfant : ${input.relation}
- Sujet : ${input.subject}
- Ton souhaité : ${input.tone}
- Longueur du contexte : ${input.context.length} caractères

Anonymisation :
- Aucun nom demandé
- Aucun email visiteur collecté
- Aucun contexte complet envoyé
- Aucune IP envoyée
    `.trim()
  });
}