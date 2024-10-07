export const registerEmployee = async (req, res) => {
    console.log("Hola", req.body);
    return res.status(200).json({ message: "ok" }); // Devuelve un estado 200 con un mensaje de "ok"
};
