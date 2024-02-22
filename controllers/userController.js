const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get single user
  async getSoloUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');

      if (!user) {
        res.status(404).json({ message: 'User Id not found'});
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {new: true}
      );

      if (!user) {
        res.status(404).json({ message: 'User Id not found'});
        return;
    }

    res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        {_id: req.params.userId}
      );

      if (!user) {
        res.status(404).json({ message: 'User Id not found'});
        return;
    }

    res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: {friends: req.body.friendId}},
        {new: true}
      );

      if (!user) {
        res.status(404).json({ message: 'User Id not found'});
        return;
    }

    res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.body.friendId}},
        {new: true}
      );

      if (!user) {
        res.status(404).json({ message: 'User Id not found'});
        return;
    }

    res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};