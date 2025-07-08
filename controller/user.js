const use=require("/Users/AARONICA/OneDrive/Desktop/mongo/models/models.js");
const userRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await use.create({ username, email, password });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { userRegistration };