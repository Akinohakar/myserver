
var cors = require('cors');
const { response } = require('express');
const express = require("express");

const app = express();
app.use(express.json());//middle es es un cosa que intercepota una peticion y le hace algUNA COSA
//El app.use es que calquier peticion pase por el use y va de arriba hacia abajo para seguir con la siguiente cosa utilizas un calback next(),ejemplo de app.use hasta abajo
app.use(cors())//conrs esta abierto para cualquier localhost
var jsonfile = [{
    "id": 1,
    "content": "Alan"
}, {
    "id": 2,
    "content": "Alan"
}]



app.get("/", function (req, res) {
    res.send('<h1>Hola tinaco</h1>'); //automaticamente el send detecta que el content type es html
})
app.get("/api/notes", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(jsonfile);

})
app.get("/api/notes/:id", function (req, res) {
    const id = req.params.id; //se recupera el segmento dinamico del url
    const result = jsonfile.find(function (note) {
        return note.id === Number(id)
    });

    //si se encuentra alguna nota
    if (result) {
        res.json(result);
    } else {
        res.status(404).end();
    }


})


app.delete("/api/notes/:id", function (request, response) {
    const id = Number(request.params.id);
    jsonfile = jsonfile.filter(note => note.id !== id); //se guarrdan todas las notas expeto la que es igual
    response.status(204).end(); //el punto end es para terminar la respuesta
})
app.post("/api/notes",cors(), function (req, res) { //para las post necesitas un body parser anterirormente se utilizaba el module externo se vio asi en el bootcamp de udemy pero ya viene incluida en express
    const note = req.body //para parsear el post y obtener el cuerpo donde viene la informacion
    // if (!note || note.content) {
    //     return response.status(400).json({
    //         error: "note content is missing"
    //     })
    // }

    const ids = jsonfile.map(note => note.id);
    const maxId = Math.max(...ids);
    const newNote = {
        id: maxId + 1,
        content: note.content

    }
    jsonfile = [...jsonfile, newNote];
    
    res.status(201).json(jsonfile);
})

app.use((req,res,next)=>{
    console.log(res.path);//cual es el url que se visito 
    console.log(res.method);//que metodo http se uso 
    res.status(404).json({
        error:"Not found"
    })
    //sdsd
})

const PORT= process.env.PORT || 3001 ;//USAR el puerto adecuado
app.listen(PORT, function () {
    console.log(`Adamos escuchando ${3001}`);
})
//se hace heroku create
//para deployear en heroku primero se suben los cambios a github con push y depues se suben a heroku con git push heroku main