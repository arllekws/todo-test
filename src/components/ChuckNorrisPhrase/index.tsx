import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface ChuckNorrisApiResponse {
  value: string;
}

const ChuckNorrisPhrase: React.FC = () => {
  const [phrase, setPhrase] = useState('Loading a fact...'); 

  const fetchPhrase = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ChuckNorrisApiResponse = await response.json();
      setPhrase(data.value); // Atualiza o estado com a nova frase
    } catch (error) {
      console.error("Failed to fetch Chuck Norris phrase:", error);
      setPhrase("Chuck Norris is too powerful for this API right now."); // Mensagem de erro divertida
    }
  };

  useEffect(() => {
    fetchPhrase();

    const intervalId = setInterval(() => {
      fetchPhrase();
    }, 5000); // 5000 milissegundos = 5 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []); // O array de dependências vazio `[]` garante que este useEffect rode apenas uma vez (na montagem).

  return (
    <div className={styles.phraseContainer}>
      <p className={styles.phrase}>"{phrase}"</p>
      <span className={styles.author}>- By Chuck Norris</span>
    </div>
  );
};

export default ChuckNorrisPhrase;
