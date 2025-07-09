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
const getAllUsers = async (req, res) => {
    try {
        // Fetch all documents from the 'users' collection
        const users = await use.find({});

        // Map users to exclude sensitive data like password before sending
        const usersResponse = users.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }));

        // Respond with the fetched users as JSON
        if (usersResponse.length > 0) {
            res.status(200).json({
                message: "Users fetched successfully",
                count: usersResponse.length,
                users: usersResponse
            });
        } else {
            res.status(200).json({
                message: "No users found in the database.",
                count: 0,
                users: []
            });
        }

    } catch (error) {
        console.error("Error fetching users:", error);
        // Handle specific Mongoose or MongoDB errors if needed
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { userRegistration, getAllUsers };