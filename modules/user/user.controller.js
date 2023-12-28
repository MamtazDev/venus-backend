import { generateToken } from "../../utils/auth.js";
import User from "./user.model.js";

export const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        success: false,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrcypt.hashSync(req.body.password),
        country: req.body.country,
        gender: req.body.gender,
      });

      const user = await newUser.save();
      const token = await generateToken(user);
      res.status(200).send({
        message: "Account created  successfully",
        success: true,
        user,
        accessToken: token,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        success: false,
        type: "email",
        message: "User not found",
      });
    }

    if (user && bcrcypt.compareSync(req.body.password, user.password)) {
      const accessToken = await generateToken(user);
      return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user,
        accessToken,
      });
    } else {
      res.status(401).send({
        success: false,
        type: "password",
        message: "Invalid password",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getloggedInUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req?.user?._id });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.status(200).send({
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          success: true,
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: err.message,
          success: false,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { ...info } = req.body;
    const isExist = await User.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        info,
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "User Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};
