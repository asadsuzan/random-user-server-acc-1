const fs = require("fs");
let rawData = fs.readFileSync("users.json");
let usersData = JSON.parse(rawData);

// get all random users
module.exports.getAllUsers = (req, res, next) => {
  if (!usersData) {
    res.status(400).json({
      status: false,
      error: "internal server error",
      data: [],
    });
  }
  res.status(200).json({
    status: true,
    massage: "succeed",
    data: usersData,
  });
};

// get  a random user
module.exports.getRandomUser = (req, res, next) => {
  if (!usersData) {
    res.status(400).json({
      status: false,
      error: "internal server error",
      data: {},
    });
  }
  const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  res.status(200).json({
    status: true,
    massage: "succeed",
    data: randomUser,
  });
};

// save a user
module.exports.saveAUser = (req, res, next) => {
  const newUserData = req.body;
  if (!usersData) {
    res.status(400).json({
      status: false,
      error: "internal server error",
      data: {},
    });
  } else {
    usersData.push(newUserData);
    res.status(200).json({
      status: true,
      massage: "succeed",
      newUser: req.body,
    });
  }
};

// update a user using id
module.exports.updateAUser = (req, res, next) => {
  const { Id } = req.params;
  const newDoc = req.body;
  const updatedDoc = usersData.find((user) => user.Id === Number(Id));
  if (updatedDoc === undefined) {
    res
      .status(404)
      .json({ status: false, error: `No doc found with this Id = ${Id}` });
  }

  updatedDoc.gender = newDoc.gender ? newDoc.gender : updatedDoc.gender;
  updatedDoc.name = newDoc.name ? newDoc.name : updatedDoc.name;
  updatedDoc.contact = newDoc.contact ? newDoc.contact : updatedDoc.contact;
  updatedDoc.address = newDoc.address ? newDoc.address : updatedDoc.address;
  updatedDoc.photoUrl = newDoc.photoUrl ? newDoc.photoUrl : updatedDoc.photoUrl;

  res
    .status(200)
    .json({ status: true, message: "succeed", updatedDoc: updatedDoc });
};

// deleteAUser using its id
module.exports.deleteAUser = (req, res, next) => {
  const { Id } = req.params;
  const toDeleteUser = usersData.find((user) => user.Id === Number(Id));
  if (toDeleteUser === undefined) {
    res
      .status(404)
      .json({ status: false, error: `No doc found with this Id = ${Id}` });
  }

  const newDoc = usersData.filter((user) => user.Id !== Number(Id));

  res.status(200).json({ status: true, message: "succeed", newDoc: newDoc });
};
