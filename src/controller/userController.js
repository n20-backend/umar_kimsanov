import { getUsers, getUserID, createNewUser, deleteUserByID } from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserID(id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await createNewUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export const updateUser = async (req, res) => {
//   const id = req.params.id;
//   const user = req.body;
//   try {
//     const updatedUser = await updateUserByID(id, user);
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'user not found' });
//     }
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await deleteUserByID(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


