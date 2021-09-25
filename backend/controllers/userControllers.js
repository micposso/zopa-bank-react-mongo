import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";

// Import model
import UserModel from "../models/UserModel.js";

// Request: POST
// Route: POST /api/users/register
// Access: Public
export const userRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user is exist
  const isExists = await UserModel.findOne({ email });

  if (isExists) {
    throw new Error("User Already exist with this email address");
  }

  // Create new user
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (!user) {
    throw new Error("Some Error While Creating Account");
  }

  if (user) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: user.balance,
      email: user.email,
      token: generateWebToken(user._id),
    });
  }
});

// Request: POST
// Route: POST /api/users/login
// Access: Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Wrong Email or Password");
  }

  const isMatched = await user.matchPassword(password);

  if (!isMatched) {
    throw new Error("Wrong Email or Password");
  }

  if (!email || !password) {
    throw new Error("Please enter email and password");
  }

  if (user && isMatched) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: user.balance,
      email: user.email,
      token: generateWebToken(user._id),
    });
  }
});

// Request: GET
// Route: GET /api/users/profile
// Access: Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// Request: Update
// Route: PUT /api/users/deposit
// Access: Private

export const deposit = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const user = await UserModel.findById(userId).select("-password");
  const amount = req.body.amount;

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.update({
    balance: user.balance + Number(amount),
  });

  res.status(202).json({ message: "Deposit Successful", data: user });
});

// Request: Update
// Route: PUT /api/users/withdraw
// Access: Private

export const withdraw = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const user = await UserModel.findById(userId).select("-password");

  const amount = req.body.amount;

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (amount > user.balance) {
    res.status(400);
    throw new Error("Insufficient Balance");
  }

  await user.update({
    balance: user.balance - Number(amount),
  });

  res.status(202).json({ message: "Withdraw Successful", data: user });
});
