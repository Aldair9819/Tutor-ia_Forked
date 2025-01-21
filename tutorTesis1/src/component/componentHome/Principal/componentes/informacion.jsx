/* eslint-disable react/react-in-jsx-scope */
import "./informacion.css"; // Asegúrate de tener el archivo CSS para los estilos
import img1 from "../imagenesInformacion/img1.jpg"
import img2 from "../imagenesInformacion/img2.jpg"
import img3 from "../imagenesInformacion/img3.jpg"

console.log("imprime info")
export function Informacion() {
  return (
    <div className="informacion-container">
      <div className="informacion-columna">
        <img src={img1} alt="Imagen 1" className="informacion-imagen" />
        <h2>Aprendizaje Personalizado con Tutor IA</h2>
        <p>
        Con el apoyo de un tutor inteligente basado en IA, el aprendizaje se adapta a las necesidades individuales de cada estudiante, proporcionando una experiencia personalizada y eficiente. La inteligencia artificial es capaz de identificar las fortalezas y debilidades de cada estudiante, ajustando los contenidos y ejercicios para optimizar su progreso
        </p>
      </div>
      <div className="informacion-columna">
        <img src={img2} alt="Imagen 2" className="informacion-imagen" />
        <h2>Aprendizaje Basado en Problemas</h2>
        <p>
        El aprendizaje basado en problemas (ABP) es una metodología educativa innovadora que fomenta la resolución de desafíos reales como medio para adquirir conocimiento. Este enfoque permite a los estudiantes enfrentarse a problemas complejos, investigar posibles soluciones y desarrollar habilidades críticas y de pensamiento independiente. 
        </p>
      </div>
      <div className="informacion-columna">
        <img src={img3} alt="Imagen 3" className="informacion-imagen" />
        <h2>Aprendizaje Personalizado en Matemáticas con Tutor IA</h2>
        <p>
        En el contexto de las matemáticas, un tutor IA puede guiar a los estudiantes paso a paso, brindar explicaciones detalladas, ofrecer ejercicios prácticos y dar retroalimentación instantánea. De esta manera, los estudiantes no solo aprenden a su propio ritmo, sino que también tienen acceso a una tutoría continua, mejorando su comprensión y confianza en las matemáticas.
        </p>
      </div>
    </div>
  );
}