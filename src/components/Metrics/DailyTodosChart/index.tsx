import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import styles from './styles.module.css';

// A "forma" dos dados que este componente espera
export interface DailyData {
  day: string;
  completed: number;
  goal: number; // A "meta" para desenhar a parte cinza da barra
}

interface DailyTodosChartProps {
  data: DailyData[];
}

const DailyTodosChart: React.FC<DailyTodosChartProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Your Daily Todos</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            {/* Eixo X (horizontal) - os dias da semana */}
            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false} 
              stroke="#888" 
            />
            {/* Eixo Y (vertical) - os números. Vamos escondê-lo para um visual limpo. */}
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              width={0} 
            />
            {/* A barra de fundo (cinza escuro) */}
            <Bar dataKey="goal" fill="#3C3C3C" radius={[8, 8, 8, 8]} barSize={30}>
              {/* O Recharts desenha uma barra sobre a outra. Esta é a de fundo. */}
            </Bar>
            {/* A barra da frente (rosa), que representa as tarefas completas */}
            <Bar dataKey="completed" fill="#FFA5A5" radius={[8, 8, 8, 8]} barSize={30}>
              {/* Adicionando uma cor diferente para a barra do dia "Today" */}
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.day === 'Today' ? '#FF8080' : '#FFA5A5'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTodosChart;
