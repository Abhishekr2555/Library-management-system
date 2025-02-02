const jwt = require("jsonwebtoken");
const User = require("../Model/user");

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    console.log("Received Token:", token); // Debugging: Check token received

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging: Check token payload

    req.user = decoded;

    // Check if user exists and is admin
    const user = await User.findById(req.user.id);
    if (!user || user.userRole !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }

    next();
  } catch (err) {
    console.error("Token Verification Error:", err);
    res.status(400).json({ message: "Invalid Token" });
  }
};
