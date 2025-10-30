import React from 'react';
// ResponsiveContainer é essencial para fazer o gráfico se adaptar ao tamanho do pai
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from './styles.module.css';

interface CompletionPercentProps {
  value: number; // A porcentagem que vamos receber (ex: 90)
}

const CompletionPercent: React.FC<CompletionPercentProps> = ({ value }) => {
  // O PieChart precisa de um array de dados.
  // Vamos criar dois segmentos: o valor preenchido e o que falta para 100.
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  // As cores para cada segmento
  const COLORS = ['#FFA5A5', '#3C3C3C']; // Rosa para o preenchido, cinza escuro para o fundo

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Finished tasks percent %</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value" // A propriedade do objeto 'data' que tem o valor numérico
              cx="50%" // Posição X no centro
              cy="50%" // Posição Y no centro
              innerRadius={60} // Raio interno (cria o buraco do "donut")
              outerRadius={75} // Raio externo
              startAngle={90} // Onde o desenho começa (topo)
              endAngle={-270} // Onde termina (dá a volta completa)
              stroke="none" // Remove a linha de contorno entre os segmentos
            >
              {/* Mapeia os dados para aplicar as cores */}
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}

              {/* O texto "90%" no centro do gráfico */}
              <Label
                value={`${value}%`}
                position="center"
                fill="white"
                fontSize="28px"
                fontWeight="bold"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompletionPercent;
