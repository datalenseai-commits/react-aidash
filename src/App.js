import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (input.toLowerCase().includes('@dash')) {
      setLoading(true);
      try {
        // Step 1: Call askgenai API with authorization header
        const askgenaiUrl = `https://major-distinctly-ringtail.ngrok-free.app/datalens/askgenai/?agentID=A555&userPrompt=${encodeURIComponent(input)}`;
        const res = await fetch(askgenaiUrl, {
          method: 'POST',
          headers: {
            'authorization': '25a85d72-aa25-4d01-872d-69558de142de',
            'ngrok-skip-browser-warning': 'true' // Added for the first API call
          }
        });

        if (!res.ok) throw new Error(`API 1 failed: ${res.status}`);
        const data = await res.json();

        // Extract chart_type from Content[1]
        const chartType = data.Content?.[1]?.chart_type;
        if (!chartType) throw new Error('chart_type not found in response');

        // Step 2: Fetch the image data directly with ngrok-skip-browser-warning header
        const dashUrl = `https://major-distinctly-ringtail.ngrok-free.app/datalens/dash/?filename=${chartType}`;
        const imageRes = await fetch(dashUrl, {
          headers: {
            'ngrok-skip-browser-warning': 'true', // This header is crucial for the image fetch
          },
        });

        if (!imageRes.ok) throw new Error(`Image fetch failed: ${imageRes.status}`);

        // Step 3: Create a blob and a temporary URL for the image
        const imageBlob = await imageRes.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImage(imageUrl);

        // Step 4: Set the new URL in your state
        const botMessage = { sender: 'bot', type: 'image', url: imageUrl };
        setMessages(prev => [...prev, botMessage]);

      } catch (err) {
        console.error(err);
        setImage(null);
        setMessages(prev => [...prev, { sender: 'bot', text: 'Failed to fetch chart.' }]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <h1>Chatbot with Dynamic Charts</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.type === 'image' ? (
              <img
                src={msg.url}
                alt="Chart"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        {loading && <div className="message bot"><p>Loading chart...</p></div>}
      </div>
      <div className="input-bar">
        <input
          type="text"
          value={input}
          placeholder="Type a message... (try @dash)"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default App;