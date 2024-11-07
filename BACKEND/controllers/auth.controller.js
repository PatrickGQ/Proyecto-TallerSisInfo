import generateJWT from '../libs/generateJwt.libs.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Ruta para registrar un usuario
export const register = async (req, res) => {
  const { name, email, password, role, university, phone, position } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const newUser = new User({
      name,
      email,
      password, // La contraseña se cifrará automáticamente antes de guardarse
      role,
      university,
      phone,
      position
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error });
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

// Función para actualizar la información del usuario, incluyendo el rol
export const updateUser = async (req, res) => {
  const { userId, name, email, phone, university, position, role } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.university = university || user.university;
    user.position = position || user.position;
    user.role = role || user.role;  // Actualizar el rol

    // Guardar los cambios
    await user.save();

    res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};
