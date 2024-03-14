const db = require("../models");
const {
  comparePassword,
  generateAuthToken,
  createPassword,
} = require("../services/utils");
const { registerSchema } = require("../Schema/index");

let resJSon;

//Login Api

const login = async (req, res) => {
  let accessToken;
  const { email, password } = req.body;
  const user = await db.sequelize.models.User.unscoped().findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      accessToken = await generateAuthToken({
        id: user.id,
        email: user.email,
      });
      user.accessToken = accessToken;
      await user.save();

      const userData = user.dataValues;
      await delete userData["password"];

      resJSon = {
        data: {
          user: userData,
        },
        status: 200,
        message: "User registered successfully!",
      };
    } else {
      resJSon = {
        error: "Authentication failed!",
        status: 401,
        message: "Authentication failed!",
      };
    }
  } else {
    resJSon = {
      error: "Authentication failed!",
      status: 401,
      message: "Authentication failed!",
    };
  }
  res.status(resJSon.status).send(resJSon);
};

//Register Api

const register = async (req, res) => {
  const result = await registerSchema.validate(req.body, {
    abortEarly: false,
  });
  const arr = {};
  if (result.err) {
    for (const element of result.error.details) {
      arr[element.path[0]] = element.message;
    }
  }

  const {
    firstName,
    lastName,
    email,
    contactNo,
    address,
    latitude,
    longitude,
  } = req.body;
  const password = await createPassword(req.body.password, 10);
  const { id } = await db.sequelize.models.Role.findOne({
    raw: true,
    attributes: ["id"],
    where: {
      slug: "user",
    },
  });
  const role_id = id;

  const alreadyRegisterUser = await db.sequelize.models.User.findOne({
    where: {
      email: email,
    },
  });

  if (alreadyRegisterUser) {
    resJSon = {
      error: "user already Register With This Email",
      status: 403,
    };
  } else if (result.error) {
    resJSon = {
      error: "validation Fail",
      status: 403,
      message: arr,
    };
  } else {
    const savedUser = await db.sequelize.models.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      contactNo: contactNo,
      address: address,
      latitude: latitude,
      longitude: longitude,
      role_id: role_id,
    });

    resJSon = {
      data: savedUser,
      status: 200,
      message: "User registered successfully!",
    };
  }
  res.send(resJSon);
};

const logout = async (req, res) => {
  const userId = req.userId;
  try {
    await db.sequelize.models.User.update(
      { accessToken: null },
      { where: { id: userId } }
    );

    resJSon = {
      status: 200,
      message: "user succesfully logout",
    };
    res.status(200).send(resJSon);
  } catch (error) {
    res.status(500).send("something went Wrong");
  }
};

module.exports = {
  login,
  register,
  logout,
};
