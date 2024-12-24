import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css";
import ChatInput from "./components/ChatInput";
import ChatResponse from "./components/ChatResponse";
import { fetchChatResponse } from "./services/api";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    setError(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      setError("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App main-app container mt-2">
      <header className="nav-card  text-white text-center py-4 rounded">
        <h1>Spring Gemini App</h1>
      </header>

      <div className="my-4">
        <ChatInput onSubmit={handleQuestionSubmit} />
      </div>

      {loading && <h2 className="text-center text-info">Loading...</h2>}
      {error && <h2 className="text-center text-danger">{error}</h2>}

      <div className="mt-4">
        <ChatResponse response={response} />
      </div>
    </div>
  );
}

export default App;
