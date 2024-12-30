
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Błąd podczas ładowania pytań", err));
  }, []);

  const saveQuestions = () => {
    fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questions),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Zapisano"))
      .catch((err) => console.error("Błąd podczas zapisywania", err));
  };

  return (
    <div style={{ padding: "20px", color: "#fff", textAlign: "center" }}>
      <motion.h1 animate={{ scale: 1.2 }} transition={{ duration: 0.5 }}>
        Quiz Manager
      </motion.h1>
      <div>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {index + 1}. {q.question}
          </div>
        ))}
      </div>
      <button onClick={saveQuestions}>Zapisz zmiany</button>
    </div>
  );
};

export default App;
