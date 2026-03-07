import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login an existing user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
    await user.update({ token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout the current user
 */
export const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await User.update({ token: null }, { where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged in user details
 */
export const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user subscription
 */
export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;
    
    await User.update({ subscription }, { where: { id } });
    
    res.status(200).json({
      email: req.user.email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};
