import { Task } from "../models/task.js";
export const allTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log(`i task da svolgere sono ${tasks.length}`);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const postTask = async (req, res) => {
    const task = req.body;
    const newTask = new Task(task);
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const deleteallTasks = async (req, res) => {
    try {
        await Task.deleteMany();
        res.status(200).send('i task sono stati rimossi con successo');
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).send('Errore durante la rimozione degli utenti');
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (task) {
            res.send('task eliminato con successo');
        } else {
            res.status(404).send('ID non trovato');
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};