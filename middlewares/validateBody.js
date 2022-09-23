const keys = ["Id", "gender", "name", "contact", "address", "photoUrl"];

const validateBody = (req, res, next) => {
  const newUser = req.body;
  const hasOnlyTheKeys =
    JSON.stringify(Object.keys(newUser).sort()) === JSON.stringify(keys.sort());

  if (!hasOnlyTheKeys) {
    res.status(406).json({
      status: false,
      error:
        '["Id", "gender", "name", "contact", "address", "photoUrl"] all fields are required ',
    });
  } else {
    next();
  }
};

module.exports = validateBody;
