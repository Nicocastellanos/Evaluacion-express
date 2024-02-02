require('dotenv').config()
const express = require('express');
const server = express();

const moongose = require('mongoose')

//Contraseña CLuster = dFYV17zNjuq5OTy5

const taskRouter = require('./routes/taskRouter')
const userRouter = require('./routes/singRouter')

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//Middlewares
server.use(express.json())
server.use(express.static('public'))

//Conexion a la base de datos 
moongose.connect(MONGO_URI);
//Rutas
server.use('/task', taskRouter);
server.use('/user', userRouter);

//Endpoint seguro
server.get('/', (req, res) =>{
    res.status(202).json({msg: 'servidor funcionando'})
})

//servidor corriendo
server.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})