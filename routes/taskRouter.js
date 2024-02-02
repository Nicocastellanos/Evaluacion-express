const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');
const verifyToken = require('../verificarToken');

//CRUD 
//Create
router.post('/createTask', async(req,res) =>{
        try{
            const newTask = new taskModel(req.body);
            const saveTask = await newTask.save();      
            res.status(201).json({saveTask, msg : 'La tarea fue creada con exito'})
        }catch(error){
            console.error(error);
        res.status(500).json({ error: 'Error interno del servidor', msg: 'Error al crear la tarea' });
        }
});
//Read 
router.get('/viewTask', async(req,res)=>{
    try {
        const getTasks = await taskModel.find();
        res.json(getTasks); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor', msg: 'Error al obtener las tareas' });
    }
})
router.get('/findTaskId/:id', async(req,res)=>{
    const getTaskId = req.params.id
    try {
        const task = await taskModel.findById(getTaskId);
        if(!task){
            res.status(500).json({error: 'No se encontro la tarea'})
        }else{
            res.json(task); 
        }
    } catch (error) {
        res.status(500).json({error: 'Error no se encontro la tarea'})
    }
})
//Update
router.put('/updateTask/:id', async(req,res)=>{
    const getTaskId = req.params.id;
    try {
        if (!Object.keys(req.body).length) {
            return res.status(400).json({error: 'El cuerpo de la solicitud esta vacion'})
        }

        const updateTask = await taskModel.findByIdAndUpdate(getTaskId, req.body, {new: true});

        if (!updateTask) {
            return res.status(400).json({error: 'No se encontro la tarea para actualizarla'});
        }

        res.status(201).json({task: updateTask, msg : 'Tarea actualizada con exito' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor', msg: 'Error al actualizar la tarea' });
    }
})
//Delete
router.delete('/deleteTask/:id', verifyToken,async(req,res)=>{
    const getTaskId = req.params.id
    try {
        const deleteTask = await taskModel.findByIdAndDelete(getTaskId);
        if (!deleteTask) {
            res.status(404).json({error : 'Tarea no encontrada'});
        }else{
            res.status(200).json({deleteTask, msg: 'La tarea fue borrada con exito'})
        }
    } catch (error) {
        res.status(500).json({error: 'Error al borrar la tarea'})
    }
})


module.exports= router;