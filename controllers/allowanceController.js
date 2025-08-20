import AllowanceRequest from '../models/AllowanceRequest.js';
import UserRequest from '../models/User.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const user = await UserRequest.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found.' });

    const newRequest = new AllowanceRequest({
      user: user._id,
      amount,
      description,
    });
    await newRequest.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.HR_EMAIL,
      subject: `New Allowance Request from ${user.name}`,
      text: `Allowance Request Details:
  User: ${user.name}
  Email: ${user.email}
  Department: ${user.department}
  Amount: ${amount}
  Description: ${description}
  Date: ${newRequest.date}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find().populate('user');
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value.' });
    }
    const request = await AllowanceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) return res.status(404).json({ msg: 'Request not found.' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await AllowanceRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found.' });
    res.json({ msg: 'Request deleted successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
