/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { TemaContext } from "./TemaContext"
import { useContext, useState, useEffect, useRef} from "react"
import "./temaAprendiendo.css"
import { LeerBDTemas } from "../../../Functions/leerBDTemas"
import { LeerBDUsuario } from "../../../Functions/leerBDUsuario"
import { RepuestaIA } from "../../../Functions/RespuestaIA"
import { useUsuario } from "./usuarioContext"
import imagenes from "./imagenesArreglo"
import imagenesTema from "./arregloImgTemas"
import Robot from "../../../imagenes/Robot.png"
export function TemaAprendiendo(){
  const {seleccionTema} = useContext(TemaContext)
  
  return(
    <div className="tema">
      <VentanaEstudio tema={seleccionTema}/>
    </div>
  )
}


const VentanaEstudio = ({ tema }) => {
  const [ideasInvestigacion, setIdeasInvestigacion] = useState();
  const [etapa, setEtapa] = useState(1);
  const [problemaActual, setProblemaAcutual] = useState(1);
  const [problema, setProblema] = useState(null);
  const [urlImagen, setUrlImagen] = useState(null);
  const usuarioBD = new LeerBDUsuario();
  const leerBD = new LeerBDTemas();
  const [resultado, setResultado] = useState('');
  const[procedimiento,setProcedimiento] = useState("")
  const [next, setNext] = useState(true)
  const [evaluacion, setEvaluacion] = useState("null")
  const { idUsuario } = useUsuario();
  const [problemaResueltos, setProblemasResueltos]=useState([])
  const [cantidadProblemas, setcantidadProblemas]=useState()
  // Usamos useEffect para manejar la obtención del problema cuando se monta el componente o se cambia el tema
  useEffect(() => {
    const obtenerProblema = async () => {
      const cantidadPro= await leerBD.devolverCantidadDeProblemas(tema);
      setcantidadProblemas(cantidadPro)
      const problemasResueltosBD = await usuarioBD.devolverProblemasResueltosDelTema(idUsuario, tema);
      setProblemasResueltos(problemasResueltosBD);
     
      try {
        
        const problema = await leerBD.devolverProblemas(tema, problemaActual);
        setProblema(problema);
        if (problema) {
          obtenerImagenes(problema.problema.id);
        }
      } catch (error) {
        console.error("Error al obtener el problema:", error);
      }
    };
    obtenerProblema();
  }, [tema, evaluacion]);  // Este useEffect se ejecuta cada vez que cambia el tema

  // useEffect para manejar la actualización del problemaActual
  useEffect(() => {
    if (problemaActual) {
      const obtenerNuevoProblema = async () => {
        try {
          
          const nuevoProblema = await leerBD.devolverProblemas(tema, problemaActual);
          
          setProblema(nuevoProblema);
          if (nuevoProblema) {
            obtenerImagenes(nuevoProblema.problema.id);
          }
        } catch (error) {
          console.error("Error al obtener el nuevo problema:", error);
        }
      };
      obtenerNuevoProblema();
    }
  }, [problemaActual, tema]); // Este useEffect depende de problemaActual y tema
 
  useEffect(() => {
    if (!problema || !problema.problema) {
      
      return; // Salimos del useEffect si problema es null o no tiene datos
    }
  
    const conclusion = evaluacion[0] + evaluacion[1];
  
    usuarioBD.registraridea(idUsuario, problema.problema.id, ideasInvestigacion, procedimiento, conclusion);
  }, [ideasInvestigacion]); // registrar ideas
  
  const obtenerImagenes = async (idProblema) => {
    try {
      const respuesta = await leerBD.obtenerRutaDeImagen(idProblema);
      // Verifica si la respuesta tiene un arreglo válido de URLs
      if (Array.isArray(respuesta) && respuesta.length > 0) {
        setUrlImagen(respuesta); // Asigna directamente el arreglo de imágenes
      } else {
        console.warn("La respuesta no tiene imágenes o el formato no es válido:", respuesta);
        setUrlImagen([]); // Si no hay imágenes o es inválido, establece un arreglo vacío
      }
    } catch (error) {
      console.error("Error al obtener las imágenes:", error.message);
      setUrlImagen([]); // Establece un arreglo vacío en caso de error
    }
  };
  


  const renderVentanas = () => {
    const ventanas = [];

    if (etapa >= 1) ventanas.push(<VentanaIntroduccion key={1} tema={tema} />);
    if (etapa >= 2) ventanas.push(<VentanaAuxProblema />, <CadenaBotones numProblemas={leerBD.devolverCantidadDeProblemas(tema)} problemaActual={problemaActual} setEtapa={setEtapa} setProblemaAcutual={setProblemaAcutual} problemaResueltos={problemaResueltos} setNext={setNext} cantidadProblemas={cantidadProblemas}/>);
    if (etapa >= 3 && problema) ventanas.push(<VentanaPlantearProblema key={2} problema={problema} urlImagen ={urlImagen}/>);
    if (etapa >= 4) ventanas.push(<VentanaAuxDeInvestigacion />, <VentanaInvestigacion key={3} tema={tema} usuarioBD={usuarioBD} ideasInvestigacion={ideasInvestigacion} setIdeasInvestigacion={setIdeasInvestigacion} setNext={setNext} etapa={etapa}/>);
    if (etapa >= 5 && problema) ventanas.push(<VentanaGuia key={4} problema={problema.problema} ideasInvestigacion={ideasInvestigacion} />);
    if (etapa >= 6) ventanas.push(<VentanaProceso key={5} />);
    if (etapa >= 7) ventanas.push(<VentanaConclucion key={6} setResultado={setResultado} problema={problema} procedimiento={procedimiento} setProcedimiento={setProcedimiento} setNext={setNext} />);
    if (etapa >= 8) ventanas.push(<VentanaResultado key={6} problemaAct={problema.problema} respuestaAlumno={resultado} setEvaluacion={setEvaluacion} usuarioBD={usuarioBD} idUsuario={idUsuario} ideasInvestigacion={ideasInvestigacion} procedimiento={procedimiento} evaluacion={evaluacion}/>);
    if (etapa >= 9) ventanas.push(<VentanaRetroalimentacion key={7} procedimiento={procedimiento} respuestaAlumno={resultado} problemaAct={problema.problema} evaluacion= {evaluacion}/>);

    return ventanas;
  };

  const clickSiguiente = () => {
    setEtapa(etapa + 1);
  };

  return (
    <div className="estudio">
      {renderVentanas()}
      <button
        onClick={() => {
          if (etapa === 9 && evaluacion) {
            setEtapa(2); // Regresa a la etapa 2 si la evaluación es true
            setEvaluacion(false)
            setProcedimiento("")
            usuarioBD.registrarIntento(idUsuario, problema.problema.id, ideasInvestigacion, procedimiento, evaluacion, resultado);
          } else if (etapa === 9 && !evaluacion) {
            setEtapa(3); // Regresa a la etapa 4 si la evaluación es false
            setProcedimiento("")
            usuarioBD.registrarIntento(idUsuario, problema.problema.id, ideasInvestigacion, procedimiento, evaluacion, resultado);
          } else if (next) {
            clickSiguiente(); // Avanza normalmente
          }
        }} 
        className={`boton ${next || etapa === 10 ? 'activo' : 'desactivado'}`} // Clase dinámica para etapa 9
        disabled={!next && etapa !== 10} // Deshabilita si no está activo y no está en la etapa 9
      >
        {etapa === 9
          ? evaluacion 
            ? "Terminar" 
            : "Intentar otra vez" 
          : "🡆"}
      </button>
    </div>
  );
};





const VentanaIntroduccion = ({ tema }) => {
  const [datosTema, setDatosTema] = useState({ nombre: "Cargando...", descripcion: "" });
  useEffect(() => {
    const leerBD = new LeerBDTemas();
  
    const fetchTema = async () => {
      try {
        const { nombre, descripcion } = await leerBD.obtenerDetallesDelTema(tema);
        setDatosTema({ nombre, descripcion }); // Actualiza el estado con el nombre y la descripción del tema
      } catch (error) {
        console.error(error);
        setDatosTema({ nombre: "Error al cargar el tema", descripcion: "" });
      }
    };
  
    fetchTema();
  }, [tema]);
  
  return (
    <div className="ventana-etapa">
      <h1>{datosTema.nombre}</h1>
      <p>{datosTema.descripcion}</p>
      <img 
        className="imgenes-problema"
        key={`$el${tema}`} // Usa el nombre del archivo como clave
        src={ imagenesTema[tema-1]} 
        alt={`Imagen ${tema}`} // Opcionalmente, incluye más contexto en el alt
      />
    </div>
  );
};
  
  
const VentanaAuxProblema=()=>{
  return(
    <div className="ventana-auxiliar">
      <p>Resuelve los problemas y esfuerzate lo mas que puedas!</p>
    </div>
  )
}

const VentanaPlantearProblema = ({ problema, urlImagen }) => {
  // Verificar si el problema está disponible antes de renderizar
  if (!problema) {
    return <div>Loading...</div>; // Mostrar un mensaje mientras se carga el problema
  }
  return (
    <div className="ventana-etapa">
      <h1>{problema.problema.titulo}</h1>
      <p>{problema.problema.descripcion}</p>
      <div>
        {urlImagen && urlImagen.length > 0 ? (
          urlImagen.map((url, index) => (
            <img 
              className="imgenes-problema"
              key={`${url}-${index}`} // Usa el nombre del archivo como clave
              src={ imagenes[url]} 
              alt={`Imagen ${url}`} // Opcionalmente, incluye más contexto en el alt
            />
          ))
        ) : (
          <p>No hay imágenes disponibles.</p> // Mensaje si no hay imágenes
        )}
      </div>
    </div>
  );
};
  

const VentanaAuxDeInvestigacion=()=>{
  return(
    <div className="ventana-auxiliar">
      <p>¡Vas por buen camino! Toma el tiempo que necesites para pensar en como resolver el problema </p>
    </div>
  )
}


const VentanaInvestigacion = ({ setIdeasInvestigacion, etapa }) => {
  const inputRef = useRef(null);
  const [guardado, setGuardar] = useState(false);
  const [texto, setTexto] = useState(""); // Estado para el textarea
  const { grabando, iniciarGrabacion, detenerGrabacion } = useSpeechRecognition(setTexto);

  const manejarGrabacion = () => {
    if (grabando) {
      detenerGrabacion();
    } else {
      iniciarGrabacion();
    }
  };

  const clickGuardarIdeas = () => {
    if (texto.trim()) {
      setIdeasInvestigacion(texto.trim());
      setGuardar(true);
    }
  };

  return (
    <div className="ventana-etapa">
      <h2>Escribe tu razonamiento para resolver el problema o has preguntas al tutor virtual.</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <textarea
          className="entrada-bloc"
          value={texto} // Se actualiza en tiempo real
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tus ideas aquí..."
          rows="5"
        />
        <button className="boton grabar" onClick={manejarGrabacion}>
          {grabando ? "🔴 Grabando..." : "🎤 Grabar"}
        </button>
      </div>
      <button className={`boton guardar ${guardado ? "guardado" : ""}`} onClick={clickGuardarIdeas}>
        {guardado ? (etapa > 5 ? "Consultar" : "Guardado") : "Consultar"}
      </button>
    </div>
  );
};



const VentanaGuia = ({ problema, ideasInvestigacion }) => {
  const problemaAct = problema.descripcion;
  const respuestaIA = useRepuestaGuia({ problemaAct, ideasInvestigacion });

  // Usar el hook de lectura de texto
  const { leerTexto, leyendo } = useTextToSpeech();

  return (
    <div className="ventana-auxiliar">
      <div className="guiaRobot">
        <img src={Robot} alt="Asistente Robot" />
        <p>{respuestaIA.respuesta}</p>
        <button className="boton leer" onClick={() => leerTexto(respuestaIA.respuesta)}>
          {leyendo ? "🔊 Leyendo..." : "🔊 Leer"}
        </button>
      </div>
    </div>
  );
};



const VentanaProceso=()=>{
  return(
    <div className="ventana-auxiliar">
      <p>Ahora es tiempo de que resuelvas el problema; si necesitas más consejos, puedes hacer preguntas al tutor en la etapa anterior.</p>
      
    </div>
  )
}

const VentanaConclucion = ({ setResultado, setProcedimiento, procedimiento, setNext, problema }) => {
  const [enviado, setEnviado] = useState(false);
  const [tempResultado, setTempResultado] = useState();
  const [tempProcedimiento, setTempProcedimiento] = useState(procedimiento);
  const [selectedUnidad, setSelectedUnidad] = useState("");
  const inputRef = useRef(null);
  const unidades = problema.problema.unidadopciones ? problema.problema.unidadopciones.split(",") : [];
  
  // Usar el hook de reconocimiento de voz
  const { grabando, iniciarGrabacion, detenerGrabacion } = useSpeechRecognition(setTempProcedimiento);

  const handleTempResultadoChange = (e) => {
    setTempResultado(e.target.value);
  };

  const handleUnidadChange = (e) => {
    setSelectedUnidad(e.target.value);
  };

  const handleSubmit = () => {
    const resultado = [tempResultado, selectedUnidad];
    setResultado(resultado);
    setProcedimiento(tempProcedimiento);
    setEnviado(true);
  };

  if (!enviado) {
    setNext(false);
  } else {
    setNext(true);
  }

  return (
    <div className="ventana-etapa">
      <div>
        <h1>Ingresa la respuesta del ejercicio</h1>
        <div className="linea">
          <input
            className="entrada-respuesta"
            type="number"
            onChange={handleTempResultadoChange}
            placeholder="Resultado.."
            disabled={enviado}
          />
          <select className="entrada-unidad" value={selectedUnidad} onChange={handleUnidadChange} disabled={enviado}>
            {unidades.map((unidad, index) => (
              <option key={index} value={unidad.trim()}>
                {unidad.trim()}
              </option>
            ))}
          </select>
          <p>tolerancia 2%</p>
        </div>

        <h2>Explica el procedimiento que utilizaste</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <textarea
            className="entrada-bloc"
            value={tempProcedimiento} // Aquí va el texto generado
            placeholder="Describe el procedimiento"
            ref={inputRef}
            rows="4"
            cols="50"
            disabled={enviado}
            onChange={(e) => setTempProcedimiento(e.target.value)} // <-- Agregado
          />
          <button className="boton grabar" onClick={iniciarGrabacion} disabled={grabando}>
            {grabando ? "🔴 Grabando..." : "🎤 Grabar"}
          </button>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={enviado} className={`boton ${enviado ? "enviado" : ""}`}>
        {enviado ? "Enviado" : "Enviar"}
      </button>
    </div>
  );
};

const VentanaResultado = ({ problemaAct, respuestaAlumno, setEvaluacion, usuarioBD, idUsuario, ideasInvestigacion, procedimiento }) => {
  const respuestaCorrecta = Number(problemaAct.respuesta);
  const unidadCorrecta = problemaAct.unidad ? problemaAct.unidad.trim() : "";
  const respuestavalor = parseFloat(respuestaAlumno[0]);
  const respuestaunidad = respuestaAlumno[1] ? respuestaAlumno[1].trim() : "";

  if (isNaN(respuestaCorrecta) || isNaN(respuestavalor)) {
    return (
      <div className="ventana-auxiliar evaluacion">
        <h1>Evaluación</h1>
        <p>Error: La respuesta correcta no es un número válido.</p>
      </div>
    );
  }

  const margen = respuestaCorrecta * 0.02; // 2% de margen de error
  const diferencia = Math.abs(respuestaCorrecta - respuestavalor);
  const esRespuestaCorrecta = diferencia <= margen && unidadCorrecta === respuestaunidad;
  setEvaluacion(esRespuestaCorrecta); // Asegura que el estado refleje la evaluación

  return (
    <div className="ventana-auxiliar evaluacion">
      <h1>Evaluación</h1>
      <p>
        {esRespuestaCorrecta ? (
          <span className="resultado-correcto">✔ Respuesta correcta</span>
        ) : (
          <span className="resultado-incorrecto">✘ Respuesta incorrecta</span>
        )}
      </p>
    </div>
  );
};





const VentanaRetroalimentacion=({procedimiento, respuestaAlumno,  problemaAct })=>{
  const respuestaIA = useRepuestaRetroalimentacion({procedimiento,respuestaAlumno, problemaAct})
  const { leerTexto, leyendo } = useTextToSpeech();
  return(
    <div className="ventana-auxiliar">
      <div className="guiaRobot">
        <img src={Robot} alt="" />
        <p>{respuestaIA.respuesta}</p>
        <button className="boton leer" onClick={() => leerTexto(respuestaIA.respuesta)} disabled={leyendo}>
          {leyendo ? "🔊 Leyendo..." : "🔊 Leer"}
        </button>
      </div>
    </div>
  )
}


const CadenaBotones = ({ cantidadProblemas, problemaActual, setProblemaAcutual, setNext, setEtapa, problemaResueltos }) => {
  // Validar si cantidadProblemas es un número válido
  if (typeof cantidadProblemas !== "number" || cantidadProblemas <= 0) {
    setNext(false); // Desactiva el botón al oprimirlo
    return (
      <div className="lista-botones">
        <p style={{ margin: "12px auto" }}>{ "No hay ejercicios disponibles"}</p>
      </div>
    );
  }

  const botones = Array.from({ length: cantidadProblemas }, (_, index) => index + 1);

  const clickCanenaBoton = (num) => {
    setProblemaAcutual(num);
    setEtapa(3);
    setNext(true);
  };

  return (
    <div className="lista-botones">
      <p>Lista de Problemas</p>
      {botones.map((num) => (
        <button
          className={`boton selectorProblema ${num === problemaActual ? "boton-actual" : ""} ${problemaResueltos.includes(num) ? "boton-resuelto" : ""}`}
          onClick={() => clickCanenaBoton(num)} 
          key={num}
        >
          {problemaResueltos.includes(num) && (
            <span>
              <i className="fas fa-check"></i> {/* Palomita verde */}
            </span>
          )}
          {num}
        </button>
      ))}
    </div>
  );
};

const useRepuestaGuia = ({ problemaAct, ideasInvestigacion }) => {
  const [respuesta, setRespuesta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Definir el texto de contexto del sistema
  const contextoSistema = `Le vas a dar apoyo a un alumno que está estudiando solo,  el tema es Formulación, justificación y uso del teorema de Pitágoras al resolver problemas . tienes que tomar el papel de un tutor apoyarlo en sus preguntas y brindarle un consejo para que avence. el alumno te va dar su razonamiento del siguiente problema:  ${problemaAct}. Es importante que no le des la respuesta al problema, solo un apoyo. Responde como si fueras el maestro del alumno, no le des la respuesta correcta, en caso de que el alumno de una respuesta incorrecta sugierele regresar a las etapas anteriores`;
    
  useEffect(() => {
    // Llamar a la API cuando el componente se monta
    const obtenerRespuestaIA = async () => {
      const prop = {
        systemText: contextoSistema,
        userText: ideasInvestigacion,
      };
  
      try {
        setLoading(true); // Indica que la solicitud está en curso
        const respuestaIA = await RepuestaIA(prop);
        setRespuesta(respuestaIA);
      } catch (error) {
        setError("Error al obtener la respuesta de la IA"); // Guarda el error en el estado
        console.error("Error al obtener la respuesta de la IA:", error);
      } finally {
        setLoading(false); // Cambia el estado de carga una vez que finaliza
      }
    };

  
    obtenerRespuestaIA();
  }, [contextoSistema, ideasInvestigacion]);
  
  return { respuesta, loading, error }; // Devuelve respuesta, estado de carga y error
};
  
const useRepuestaRetroalimentacion = ({ respuestaAlumno, procedimiento, problemaAct }) => {
  const [respuesta, setRespuesta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let comprobacionUnidad=""
  if(respuestaAlumno[1]==problemaAct.unidad){
    comprobacionUnidad = "la unidad es correcta"
  }else{
    comprobacionUnidad = "la unidad es incorrecta"
  } 
  
  // Definir el texto de contexto del sistema
  const contextoSistema = 
  `El alumno se enfrenta al siguiente problema: ${problemaAct.descripcion}.  
  
  La respuesta correcta del problema es ${problemaAct.respuesta} ${problemaAct.unidad}.  
  Se considera correcta cualquier respuesta que se encuentre dentro de un margen de tolerancia del 2%.  
  Recuerda que es muy importante que la unidad de medida sea la correcta si es incorrecta mensiona el error
  El alumno va a compartir su procedimiento y resultado.  

**Instrucciones para la retroalimentación:**  
- Si la respuesta del alumno está dentro del margen de tolerancia, considera su respuesta como correcta y felicítalo. **No sugieras revisar cálculos ni mencionar que hay un margen de tolerancia.**  
- Si la respuesta está fuera del margen de tolerancia o el procedimiento es incorrecto, guíalo para que vuelva a realizar el ejercicio.  
- **no le des la respuesta correcta ni le resuelvas el ejercicio**  
- **No hagas preguntas ni le pidas más información, ya que no puede responderte.**  

Tu objetivo es ayudarlo a identificar errores sin darle la respuesta final. `;

  const respuestaAl = `respuesta ${respuestaAlumno[0]} ${respuestaAlumno[1]} ${comprobacionUnidad}, metodo para resolverlo ${procedimiento}`
  useEffect(() => {
    // Llamar a la API cuando el componente se monta
    const obtenerRespuestaIA = async () => {
      const prop = {
        systemText: contextoSistema,
        userText: respuestaAl
      };
  
      try {
        setLoading(true); // Indica que la solicitud está en curso
        const respuestaIA = await RepuestaIA(prop);
        setRespuesta(respuestaIA);
      } catch (error) {
        setError("Error al obtener la respuesta de la IA"); // Guarda el error en el estado
        console.error("Error al obtener la respuesta de la IA:", error);
      } finally {
        setLoading(false); // Cambia el estado de carga una vez que finaliza
      }
    };

  
    obtenerRespuestaIA();
  }, [contextoSistema, procedimiento]);
  
  return { respuesta, loading, error }; // Devuelve respuesta, estado de carga y error
};
const useTextToSpeech = () => {
  const [leyendo, setLeyendo] = useState(false);
  const [voz, setVoz] = useState(null);

  // Nombre de la voz preferida
  const nombreVozPreferida = "Microsoft Dalia Online (Natural) - Spanish (Mexico)";

  // Cargar las voces disponibles cuando el hook se inicializa
  useEffect(() => {
    const cargarVoces = () => {
      const vocesDisponibles = window.speechSynthesis.getVoices();

      // Buscar la voz preferida o una en español de México
      const vozSeleccionada =
        vocesDisponibles.find((v) => v.name === nombreVozPreferida) ||
        vocesDisponibles.find((v) => v.lang === "es-MX");

      setVoz(vozSeleccionada || null);
    };

    window.speechSynthesis.onvoiceschanged = cargarVoces;
    cargarVoces();
  }, []);

  // Función para leer o detener la lectura de texto
  const leerTexto = (texto) => {
    if (window.speechSynthesis.speaking) {
      // Si ya está hablando, detener la lectura
      window.speechSynthesis.cancel();
      setLeyendo(false);
    } else {
      if (!texto.trim()) return alert("No hay texto para leer.");

      // Reemplazos para leer correctamente los exponentes
      texto = texto
        .replace(/²/g, " al cuadrado")
        .replace(/³/g, " al cubo")
        .replace(/(\w+)\^2/g, "$1 al cuadrado")
        .replace(/(\w+)\^3/g, "$1 al cubo")
        .replace(/(\w+)\^(\d+)/g, (match, base, exp) => {
          return `${base} a la ${convertirNumero(exp)}`;
        });

      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "es-MX";
      if (voz) utterance.voice = voz;

      setLeyendo(true);
      utterance.onend = () => setLeyendo(false); // Cambia el estado cuando termine

      window.speechSynthesis.speak(utterance);
    }
  };

  // Función para convertir números a palabras
  const convertirNumero = (num) => {
    const numeros = {
      "1": "uno", "2": "dos", "3": "tres", "4": "cuatro", "5": "cinco",
      "6": "seis", "7": "siete", "8": "ocho", "9": "nueve", "10": "diez",
    };
    return numeros[num] || num; // Si el número no está en la lista, lo deja igual
  };

  return { leerTexto, leyendo };
};

const useSpeechRecognition = (setTexto) => {
  const [grabando, setGrabando] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // No sigue grabando después de la pausa
      recognitionRef.current.lang = "es-MX"; // Configura el idioma
      recognitionRef.current.interimResults = false; // Solo muestra resultados finales

      recognitionRef.current.onresult = (event) => {
        let nuevoTexto = event.results[0][0].transcript.trim();
        setTexto((prevTexto) => prevTexto + " " + nuevoTexto); // Agregar texto al textarea
      };

      recognitionRef.current.onend = () => {
        setGrabando(false); // Se detiene automáticamente cuando ya no hay más voz
      };
    }
  }, [setTexto]);

  const iniciarGrabacion = () => {
    if (!recognitionRef.current) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }
    setGrabando(true);
    recognitionRef.current.start(); // Inicia el reconocimiento de voz
  };

  const detenerGrabacion = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Detiene el reconocimiento de voz
      setGrabando(false);
    }
  };
  return { grabando, iniciarGrabacion, detenerGrabacion };
};

export default useRepuestaGuia;