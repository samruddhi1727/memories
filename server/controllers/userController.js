import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {

        const { userId } = req;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "user not Found" });
        }

        res.json({
            success: true,
            userData: {
                id: user._id,
                name: user.name
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

