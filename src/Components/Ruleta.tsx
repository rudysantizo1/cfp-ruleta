import React, { useEffect } from 'react';
import './Ruleta.css';

interface RuletaProps {
  elementos: string[];
  ganador: string;
  girarRuleta: () => void;
}

const Ruleta: React.FC<RuletaProps> = ({ elementos, ganador, girarRuleta }) => {
  const tamanyoRuleta = 450;
  const numeroCasillas = elementos.length;
  const anguloCasillas = 360 / numeroCasillas;
  const grados = (180 - anguloCasillas) / 2;
  const alturaCasilla = Math.tan(grados * Math.PI / 180) * (tamanyoRuleta / 2);

  useEffect(() => {
    const ruleta = document.querySelector('.ruleta') as HTMLDivElement;
    ruleta.innerHTML = ''; // Clear previous options
    ruleta.style.width = `${tamanyoRuleta}px`;
    ruleta.style.height = `${tamanyoRuleta}px`;

    elementos.forEach((elemento, i) => {
      const opcion = document.createElement('div');
      opcion.className = `opcion opcion-${i}`;
      opcion.style.transform = `rotate(${anguloCasillas * i}deg)`;
      opcion.style.borderBottomColor = getRandomColor();
      ruleta.appendChild(opcion);

      const estiloBefore = document.createElement('style');
      estiloBefore.innerHTML = `.opcion-${i}::before { content: '${elemento}'; }`;
      document.head.appendChild(estiloBefore);
    });

    const opciones = document.querySelectorAll('.opcion') as NodeListOf<HTMLDivElement>;
    opciones.forEach(opcion => {
      opcion.style.borderBottomWidth = `${alturaCasilla}px`;
      opcion.style.borderRightWidth = `${tamanyoRuleta / 2}px`;
      opcion.style.borderLeftWidth = `${tamanyoRuleta / 2}px`;
    });

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }, [elementos, tamanyoRuleta, anguloCasillas, alturaCasilla]);

  useEffect(() => {
    if (ganador) {
      const indice = elementos.indexOf(ganador);
      const numID = `number-${indice}`;
      const style = document.createElement('style');
      style.id = 'animacionRuleta';
      style.innerHTML = `
        #${numID} {
          animation-name: number-${indice};
        }
        @keyframes number-${indice} {
          from { transform: rotate(0); }
          to { transform: rotate(${396 * 5 - anguloCasillas * indice}deg); }
        }
      `;
      document.head.appendChild(style);
      document.querySelector('.ruleta')!.id = numID;
    }
  }, [ganador, elementos, anguloCasillas]);

  return <div className="contenedor-ruleta">
        <div className="ruleta" onClick={girarRuleta}/>
    </div>;
};

export default Ruleta;
