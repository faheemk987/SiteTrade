// Must run after authMiddleware. Admins and approved users may use protected user actions.
const approvalMiddleware = (req, res, next) => {
  if (req.user?.role === "admin") return next();

  // Existing accounts created before approval was introduced remain usable.
  if (!req.user?.status || req.user.status === "approved") return next();

  const message = req.user.status === "rejected"
    ? "Your account has been rejected by the administrator."
    : "Your account is waiting for admin approval.";

  return res.status(403).json({ success: false, message });
};

module.exports = approvalMiddleware;
