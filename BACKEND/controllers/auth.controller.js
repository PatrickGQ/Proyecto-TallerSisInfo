import generateJWT from '../libs/generateJwt.libs.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { name, email, password, role } = req.body; // Asegúrate de que el rol se pase en el cuerpo de la solicitud

    try {
        const userFound = await User.findOne({ email: email });

        if (userFound) return res.status(400).json({ message: `User ${email} already exists` });

        const hashPassword = await bcrypt.hash(password, 10);

        // Cambia el rol para que use el rol proporcionado o default a 'user'
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role: role || 'client' // Asigna 'user' como rol por defecto si no se proporciona
        });

        const userSaved = await newUser.save();

        const token = await generateJWT({ id: userSaved._id });
        res.cookie('token', token); // Guarda el token en las cookies
        res.status(201).json({ message: "User registered successfully", userSaved });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email: email });

        if (!foundUser) return res.status(401).json({ message: "Email or password incorrect" });

        const coincidence = await bcrypt.compare(password, foundUser.password);

        if (!coincidence) return res.status(401).json({ message: "Email or password incorrect" });

        const token = await generateJWT({ id: foundUser._id });
        res.cookie('token', token); // Guarda el token en las cookies
        res.status(200).json({ message: "Login successful", foundUser });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('token', '', { expires: new Date(0) }); 
        return res.status(200).json({ message: "Logout successful" });
    } catch (e) {
        res.status(500).json({ message: "Logout failed", error: e });
    }
};

export const verifyPassword = async (req, res) => {
    const { email, password } = req.body; 

    try {
        const foundUser = await User.findOne({ email: email });

        if (!foundUser) return res.status(401).json({ message: "User not found" });

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) return res.status(401).json({ message: "Incorrect password" });

        res.json({ message: "Authentication successful", user: foundUser });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const verifyToken = (req, res) => {
    // Esta función se puede eliminar si no planeas usarla en ninguna parte
    return res.status(200).json({ message: "Token verification not required" });
};
