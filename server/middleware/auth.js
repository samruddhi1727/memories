import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const { jwttoken } = req.cookies;

    if (!jwttoken) {
        return res.json({ success: false, message: "Not Authorized, login Again" });
    }

    try {
        const tokenDecode = jwt.verify(jwttoken, process.env.JWT_SECRET);
        if (tokenDecode.id && tokenDecode.name) {
            req.userId = tokenDecode.id;
            req.userName = tokenDecode.name;
        } else {
            return res.json({ success: false, message: "Not Authorized token not decode, Login Again" });
        }

        next();

    } catch (error) {

        return res.json({ success: false, message: error.message });
    }
}
export default auth;