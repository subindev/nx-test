import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import  './signalr.css'

const SignalRComponent = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://pocsignalrfunction.azurewebsites.net/api')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('SignalR Connected!');

          connection.on('updateSales', message => {
            console.log('Message received:', message);

            setMessages(prevMessages => [...prevMessages, message]);
          });
        })
        .catch(err => console.log('SignalR Connection Error: ', err));
    }
  }, [connection]);

  return (
    <div className="signalr-component">
      <h2>Messages:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SignalRComponent;
