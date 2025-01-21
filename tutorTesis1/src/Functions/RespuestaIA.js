import { GROQ_API_KEY } from './config.js';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });


export async function RepuestaIA({ systemText, userText }) {
  // Validar que `systemText` y `userText` no sean undefined o vacíos
  if (!systemText || !userText) {
    console.error("Error: `systemText` o `userText` están vacíos o no definidos.");
    return;
  }

  try {
    const chatCompletion = await getGroqChatCompletion({ systemText, userText });
    const respuesta = chatCompletion.choices[0]?.message?.content || "";
    return respuesta;
  } catch (error) {
    console.error("Error al obtener la respuesta de la IA:", error);
  }
}

async function getGroqChatCompletion({ systemText, userText }) {

  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemText  // Asegurarse de que `systemText` no sea undefined
      },
      {
        role: "user",
        content: userText  // Asegurarse de que `userText` no sea undefined
      },
    ],
    model: "llama-3.1-70b-versatile",
  });
}


