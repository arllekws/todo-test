import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

/**
 * Interface que define a estrutura da resposta da API Chuck Norris
 * A API retorna um objeto com a propriedade 'value' contendo a piada/fato
 */
interface ChuckNorrisApiResponse {
  value: string;
}

/**
 * Componente ChuckNorrisPhrase
 * 
 * Este componente busca e exibe frases/piadas aleatórias do Chuck Norris
 * utilizando a API pública Chuck Norris IO. As frases são atualizadas
 * automaticamente a cada 5 segundos.
 */
const ChuckNorrisPhrase: React.FC = () => {
  // Estado que armazena a frase atual do Chuck Norris
  // Inicializado com uma mensagem de carregamento
  const [phrase, setPhrase] = useState('Loading a fact...'); 

  /**
   * Função assíncrona que busca uma frase aleatória da API Chuck Norris
   * Atualiza o estado com a nova frase ou exibe mensagem de erro em caso de falha
   */
  const fetchPhrase = async () => {
    try {
      // Faz a requisição para a API
      const response = await fetch('https://api.chucknorris.io/jokes/random' );
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Converte a resposta para JSON com tipagem TypeScript
      const data: ChuckNorrisApiResponse = await response.json();
      
      // Atualiza o estado com a nova frase recebida da API
      setPhrase(data.value);
    } catch (error) {
      // Loga o erro no console para debug
      console.error("Failed to fetch Chuck Norris phrase:", error);
      
      // Define uma mensagem de erro divertida para o usuário
      setPhrase("Chuck Norris is too powerful for this API right now.");
    }
  };

  /**
   * Hook useEffect que gerencia o ciclo de vida do componente
   * Executa na montagem do componente e configura atualização automática
   */
  useEffect(() => {
    // Busca a primeira frase imediatamente ao montar o componente
    fetchPhrase();

    // Configura um intervalo para buscar novas frases a cada 5 segundos
    const intervalId = setInterval(() => {
      fetchPhrase();
    }, 5000); // 5000 milissegundos = 5 segundos

    // Função de limpeza (cleanup) que é executada quando o componente é desmontado
    // Remove o intervalo para evitar vazamento de memória e requisições desnecessárias
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Array de dependências vazio [] garante que este useEffect rode apenas uma vez (na montagem)

  return (
    <div className={styles.phraseContainer}>
      {/* Exibe a frase do Chuck Norris entre aspas */}
      <p className={styles.phrase}>"{phrase}"</p>
      
      {/* Exibe a atribuição da frase */}
      <span className={styles.author}>- By Chuck Norris</span>
    </div>
  );
};

export default ChuckNorrisPhrase;
