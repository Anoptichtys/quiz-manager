const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://usqbldgbbvnzrdlnsqnr.supabase.co'; // Zastąp swoim Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzcWJsZGdiYnZuenJkbG5zcW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NDkzMjksImV4cCI6MjA1MTEyNTMyOX0.WJdGrabmHksoJofmrAeOzdkyIrH1ri-yJKdUOuWSWKM'; // Zastąp swoim Anon Key
const supabase = createClient(supabaseUrl, supabaseKey);
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to get JSON questions
app.get("/api/questions", (req, res) => {
    const filePath = path.join(__dirname, "questions.json");
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "Plik JSON nie istnieje" });
    }
});

// Endpoint to save JSON questions
app.post("/api/questions", (req, res) => {
    const filePath = path.join(__dirname, "questions.json");
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            res.status(500).json({ error: "Błąd zapisu pliku JSON" });
        } else {
            res.status(200).json({ message: "Pomyślnie zapisano plik" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend działa na porcie ${PORT}`);
});
