import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { createToken } from '../lib/auth.js';

export async function createUserController(req, res) {
  try {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function loginUserController(req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    //console.log('logged user', user);

    if (user) {
      const isMatching = await bcrypt.compare(req.body.password, user.password);
      if (isMatching) {
        const token = await createToken({ customerId: user.customerId, userId: user._id }, { expiresIn: '1h' });
        // console.log(token);
        return res
          .status(200)
          .cookie('accessToken', token, { httpOnly: true, domain: 'localhost', secure: true })
          .send(user);
      }
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).send('ok, login');
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getUserController = async (req, res) => {
  const userId = req.params.id;
  // console.log('User ID:', userId);

  try {
    const user = await userModel.findById(userId);
    console.log('Fetched user:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('Error fetching user:', error);
    res.status(500).json(error);
  }
};
