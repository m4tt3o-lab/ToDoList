import express from 'express'
import todoRoutes from './routes/todo.js';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv';

const app = express()
const PORT = process.env.PORT || 3000 


app.use(express.json());
dotenv.config()

app.use(cors({
}));

app.use('/tasks', todoRoutes);
app.use('/auth', authRoutes)


app.get('/', (req, res) => res.send('benvenuto nella home page'));

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    app.listen(PORT, () => {
        console.log('connessione avvenuta con successo server running on port 3000');
        
    })

})
.catch(error=>console.error(error))


