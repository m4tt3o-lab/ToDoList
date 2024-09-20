import express from 'express';
import { allTasks, postTask, deleteTask, deleteallTasks } from '../controllers/task.js';
const router = express.Router();

router.get('/', allTasks);
router.post('/', postTask);
router.delete('/', deleteallTasks)
router.delete('/:id', deleteTask);

export default router;