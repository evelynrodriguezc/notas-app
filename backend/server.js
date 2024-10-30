const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Note = require("./data/notes");

const app = express();
const PORT = 3001;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// DB Connection
mongoose.connect("mongodb://localhost:27017/notes-app-mern", {
})
.then(() => {
    console.log("Conectando a la Base de Datos MongoDB");
})
.catch(err => {
    console.error("Error al conectar la BD MongoDB", error);
})

app.get("/notas", async(req, res) => {
    try {
        const notas = await Note.find();
        res.json(notas);
    } catch (error) {
        console.log("Error al obtener notas", error);
        res.status(500).send("Error al obtener las notas");
    }
})

app.post("/notas", async(req, res) => {
    try {
        const nuevaNota = new Note({ text: req.body.text});
        await nuevaNota.save();
        res.status(201).json(nuevaNota);
    } catch (error) {
        console.error("Error al agregar la nota", error);
        res.status(400).send("Error al agregar la nota");
    }
});

app.delete('/notas/:id', async(req, res ) => {
    try {
        const nota = await Note.findByIdAndDelete(req.params.id)
        if(!nota){
            return res.status(404).send('Nota no encontrada')
        }
        res.status(204).send()
    } catch(error){
        console.error("Error al eliminar la nota", error);
        res.status(404).send("ID no válida");
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})