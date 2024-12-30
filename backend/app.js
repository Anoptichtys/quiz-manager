
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
