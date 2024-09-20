import bcrypt from 'bcryptjs';
import { Auth } from '../models/auth.js'; 
import jwt from 'jsonwebtoken'


export const login = async (req,res) => {
    const {username, password} = req.body
    const user = await Auth.findOne({username})
    
    if(!user) return res.status(404).json({status: 'error', message: 'utente o password errata'})

    if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign(
            {
               id: user._id,
               username: user.username,
            }, process.env.JWT_SECRETE
           
        )
        return res.json({status: 'ok', data: token})
    }
        res.status(401).json({status: 'error', message: 'utente o password errata'})
}

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', message: 'Username non valido' });
    }
    if (!password || typeof password !== 'string') {
        return res.json({ status: 'error', message: 'Password non valida' });
    }
    if (password.length < 8) {
        return res.json({ status: 'error', message: 'Password troppo corta, minimo 8 caratteri' });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const auth = new Auth({
        username: username,
        password: passwordHashed, // password hashata
    });

    try {
        await auth.save();
        res.status(201).json({ status: 'success', data: auth });
    } catch (error) {
        if (error.code === 11000) { // username già esistente
            return res.status(409).json({ status: 'error', message: 'Username già esistente' });
        }
        res.status(500).json({ status: 'error', message: 'Errore del server' });
    }
};
