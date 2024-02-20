const router = require('express').Router();
const {
  getUser,
  getSingleCourse,
  createUser,
  updateCourse,
  deleteCourse,
} = require('../../controllers/userController');

// /api/courses
router.route('/').get(getUser).post(createUser);

module.exports = router