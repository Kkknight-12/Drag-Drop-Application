// const userOperations = require("../db/services/user-operations");
import User from "../models/users.js"
////////////////////
// User Login,    //
// token is given //
////////////////////
export const login = async (req, resp) => {
  const body = req.body
  const { email, password } = body
  // console.log("body", body);

  try {
    const user = await User.findByCredentials(email, password)
    // console.log("USER", user);

    const token = await user.generateAuthToken()
    // const token = jwt.sign(
    //     { id: existingUser._id.toString() },
    //     "learningNode",
    //     {
    //         expiresIn: "1h",
    //     }
    // );

    resp.status(200).json({
      user: user.email,
      name: user.name,
      token: token,
      isLoggedIn: true,
    })
  } catch (error) {
    resp.status(509).json({
      message: error.message,
    })
  }
}

/////////////////////
// User is created //
// token is given  //
/////////////////////

export const register = async (req, resp) => {
  const { name, email, password } = req.body
  // console.log(req.body);
  const userExists = await User.findOne({ email })

  if (userExists) {
    resp.status(400)
    return resp.status(400).send({ error: "User already exists" })
    // throw new Error("User already exists");
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    })
    // const user = new User(req.body);
    // await user.save();
    console.log("user", user)
    const token = await user.generateAuthToken()
    // console.log(token);
    resp.status(210).json({
      user: user.email,
      name: user.name,
      token: token,
      isLoggedIn: true,
    })
  } catch (error) {
    resp.status(509).json({
      message: error.message,
    })
  }
}
