const DB = require("./database");

async function user_verification(req, res, next) {
  const { uuid_Personne: userId } = req.body;
  const [potential_user] = await DB.queryAsync(
    `SELECT id FROM users WHERE id="${userId}"`
  );
  if (!potential_user.id) {
    res.status(401).json({ message: "Unknown user" });
    res.end();
  }
  next();
}

async function technician_verification(req, res, next) {
  const { uuid_Technicien: technicianId } = req.body;
  const [potential_technician] = await DB.queryAsync(
    `SELECT id FROM technician WHERE id="${technicianId}"`
  );
  if (!potential_technician.id) {
    res.status(401).json({ message: "Unknown technician" });
    res.end();
  }
  next();
}

module.exports = { user_verification, technician_verification };
