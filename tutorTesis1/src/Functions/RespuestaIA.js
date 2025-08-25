const URL_API_MODEL_AI = import.meta.env.VITE_URL_API_MODEL_AI;
const MODEL_DEFAULT = import.meta.env.VITE_MODEL_DEFAULT;

export async function RepuestaIA({ systemText, userText }) {
  // Validar que `systemText` y `userText` no sean undefined o vacíos
  if (!systemText || !userText) {
    console.error("Error: `systemText` o `userText` están vacíos o no definidos.");
    return;
  }

  try {
    const chatCompletion = await getAPINETChatCompletion({ systemText, userText });
    
    const respuesta = chatCompletion.message.content || "";
    return respuesta;
  } catch (error) {
    console.error("Error al obtener la respuesta de la IA:", error);
    throw error;
  }
}

async function getAPINETChatCompletion({ systemText, userText }) {
  // Validar que los parámetros no sean undefined o null
  if (!systemText || !userText) {
    throw new Error("systemText y userText son obligatorios.");
  }

  // Declarar correctamente la variable response
  const response = {
    messages: [
      {
        role: "system",
        content: systemText,
      },
      {
        role: "user",
        content: userText,
      },
    ],
    model: MODEL_DEFAULT || 'llama3.2',
    stream: false,
  };

  try {
    // Realizar la solicitud fetch
    const res = await fetch(`${URL_API_MODEL_AI}api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response), // Enviar directamente el objeto response
    });

    // Verificar si la respuesta es exitosa
    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
    }

    // Devolver la respuesta en formato JSON
    return await res.json();
  } catch (error) {
    console.error("Error al obtener la respuesta del modelo:", error);
    throw error; // Propagar el error para que pueda manejarse externamente
  }
}


