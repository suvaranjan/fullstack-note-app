const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authController');

// Public routes
router.post('/signup', authController.signup);
router.route("/authenticate").post(authController.verifyUser, (req, res) => res.end());
router.post('/signin', authController.signin);
router.post('/generateOTP', authController.generateOTP);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/resetPassword', authController.resetPassword);

// Protected routes (Require authentication)
router.use(authMiddleware); // Middleware to protect routes below

router.get('/user', authController.getUser);
router.put('/profileupdate', authController.updateProfile);
router.post('/notes', noteController.createNote);
router.get('/notes', noteController.getNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);
// router.put('/notes/:id', noteController.updateNote);
// router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;
