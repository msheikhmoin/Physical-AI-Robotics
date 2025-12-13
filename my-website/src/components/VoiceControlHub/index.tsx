import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './VoiceControlHub.module.css'; // Assuming local CSS for component

type Status = 'idle' | 'listening' | 'command' | 'error';

const VoiceControlHub: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [commandText, setCommandText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const activateAssistant = async () => {
    setStatus('listening');
    setCommandText('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/listen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No body needed for this simple listen request, but good practice to include
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.command) {
        setCommandText(data.command);
        setStatus('command');
      } else {
        setErrorMessage('No command recognized.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error activating assistant:', error);
      setErrorMessage(`Failed to connect or recognize: ${error.message}`);
      setStatus('error');
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return 'Press Activate to start listening.';
      case 'listening':
        return 'Listening... Speak now!';
      case 'command':
        return `Command: "${commandText}"`;
      case 'error':
        return `Error: ${errorMessage}`;
      default:
        return '';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'listening':
        return styles.statusListening;
      case 'command':
        return styles.statusCommand;
      case 'error':
        return styles.statusError;
      default:
        return '';
    }
  };

  return (
    <div className={styles.voiceControlHub}>
      <h3 className={styles.hubTitle}>Voice Control Hub</h3>
      <button
        className={clsx('button button--primary button--lg', styles.activateButton)}
        onClick={activateAssistant}
        disabled={status === 'listening'}
      >
        {status === 'listening' ? 'Listening...' : 'Activate Assistant'}
      </button>
      <div className={clsx(styles.statusWindow, getStatusClass())}>
        <p>{getStatusMessage()}</p>
      </div>
      {status === 'command' && (
        <p className={styles.lastCommand}>Last Recognized: <span>{commandText}</span></p>
      )}
    </div>
  );
};

export default VoiceControlHub;
