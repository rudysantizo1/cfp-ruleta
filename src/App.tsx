import { useEffect, useRef, useState } from 'react';
import './App.css';
import elements from './Elements/elements.json';
import Ruleta from './Components/Ruleta.tsx';

interface Elementos {
  [key: string]: string[];
}

function App() {
  const [elementos, setElementos] = useState<string[]>([]);
  const [ganador, setGanador] = useState<string>("");
  const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(true);
  const timeoutRef = useRef<number | null>(null);

  const girarRuleta = () => {
    setMostrarMensaje(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const indice = Math.floor(Math.random() * elementos.length);
    setGanador(elementos[indice]);
    timeoutRef.current = setTimeout(() => setMostrarMensaje(true), 5800);
  }

  useEffect(() => {
    if ((elements as Elementos)) {
      setElementos((elements as Elementos).default);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'Enter'){
        girarRuleta()
      }
    };

    console.log(window)

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

  }, []);


  return (
    <div className="App">
      <Ruleta elementos={elementos} ganador={ganador} girarRuleta={girarRuleta} />
      <p className={`mensaje ${mostrarMensaje ? 'mostrar' : ''}`}>
        {ganador ? `El ganador es: ${ganador}` : "Haz click en el circulo para girar la ruleta"}
      </p>
    </div>
  );
}

export default App;
