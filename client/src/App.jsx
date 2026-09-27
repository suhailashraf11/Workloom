import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    const connectBackend = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/health`
        );

        const data = await response.json();

        setMessage(data.message);
      } catch (error) {
        setMessage("Could not connect to backend");
        console.error(error);
      }
    };

    connectBackend();
  }, []);

  return (
    <div>
      <h1>CollabFlow</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;