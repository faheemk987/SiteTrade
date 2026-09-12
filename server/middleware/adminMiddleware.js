// Must run AFTER authMiddleware, so req.user is already set.
// Only allows users with role === "admin" to continue.
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden: admin access only" });
  }
  next();
};

module.exports = adminMiddleware;
