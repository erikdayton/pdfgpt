import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';
// import {OPENAI_API_KEY} from ''



// Import the ChatOpenAI and PDFLoader libraries if they are available in your React project.
// These may need to be installed separately using npm or yarn.
// import ChatOpenAI from 'chat-openai-library';
// import PDFLoader from 'pdf-loader-library';
async function getchResponseFromAPI (text) {
  const apiKey = process.env.OPENAI_API_KEY;

  var config = {
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'post',
    headers: {
      "Authorization": 'Bearer ', //ADD API KEY HERE
      'Content-Type': 'application/json'
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: text,
      }]
      }
  };
  try {
    console.log("HDFGFDGFDGFDGFD")
    const response = await axios(config)
    console.log('response.data: ',  JSON.stringify(response.data.choices[0].message.content)) 
    return JSON.stringify(response.data.choices[0].message.content) 

  } catch (err) {
    console.log('HELLLLLLOOO ')

    console.log('err: ', err)
    console.log('err.data: ', err.response)

    return 'error ya dummy'
  }

}
function App() {
  const [responseText, setResponseText] = useState('');
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFetchResponse = async () => {
    // Adjust this part to suit your specific API interactions in your React app.
    // This code assumes you have a function called 'fetchResponseFromAPI' for fetching data from the API.

    try {
      // Replace 'query' with the data you want to send to your API.
      const response = await getchResponseFromAPI(query);

      // Assuming the API returns a JSON object with a 'text' property.
      setResponseText(response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  useEffect(() => {
    // You can perform any necessary initialization here when the component mounts.
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React App with OpenAI Integration</h1>
      </header>
      <main>
        <div>
          <label htmlFor="query">Enter your query:</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={handleQueryChange}
          />
          <button onClick={handleFetchResponse}>Fetch Response</button>
        </div>
        <div>
          <h2>Response:</h2>
          <p>{responseText}</p>
        </div>
      </main>
    </div>
  );
}

export default App;

