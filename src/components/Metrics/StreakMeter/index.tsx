import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from './styles.module.css';

interface StreakMeterProps {
  streak: number; // O valor atual da sequência (ex: 3 dias)
  goal: number;   // A meta para o medidor ficar completo (ex: 7 dias)
}

const StreakMeter: React.FC<StreakMeterProps> = ({ streak, goal }) => {

  // O truque: criamos 3 segmentos de dados para o PieChart
  const data = [
    // 1. O segmento preenchido (rosa)
    { name: 'Streak', value: streak },
    // 2. O segmento restante (cinza)
    { name: 'Remaining', value: goal - streak },
    // 3. Um segmento INVISÍVEL que ocupa toda a metade de baixo do círculo
    { name: 'BottomHalf', value: goal }, 
  ];

  // As cores para cada segmento
  const COLORS = ['#FFA5A5', '#3C3C3C', 'transparent']; // Rosa, Cinza, Transparente

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Streak</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="100%" // Posição Y na base do container (isso "corta" o gráfico no meio)
              innerRadius={60}
              outerRadius={80}
              startAngle={180} // Começa na esquerda
              endAngle={0}     // Termina na direita (desenhando o arco de cima)
              stroke="none"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              
              {/* Adiciona o emoji sorridente no centro do arco */}
              <Label 
                value="😊" 
                position="center" 
                dy={-20} // Ajusta a posição vertical do emoji
                fontSize="32px"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className={styles.subtitle}>You're doing great!</p>
    </div>
  );
};

export default StreakMeter;
