import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Terminal.module.css';

export default function TerminalComponent() {
  const [logs, setLogs] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await axios.get('http://localhost:4000/api/logs'); // Replace with your backend route
        setLogs(response.data); // Assuming response data is an array of log strings
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLogs(['Error fetching logs from server.']); // Fallback in case of error
      }
    }
    fetchLogs();
  }, []);

  return (
    <div className={`${styles.terminal} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <button className={styles.minimizeButton} onClick={toggleMinimize}></button>
        </div>
        <span>Terminal</span>
      </div>
      {!isMinimized && (
        <div className={styles.body}>
          <p>Error fetching logs from server.</p>
        </div>
      )}
    </div>
  );
};

