const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  sendNotificationToUser, 
  sendTestNotification,
  sendTopicNotification 
} = require('../services/notification-sender');
const { 
  checkNewPropertyMatch,
  checkPriceDropOnWishlist,
  checkInactiveUsers,
  getUserNotificationStats
} = require('../services/notification-rules');
const User = require('../models/User');

/**
 * @route   POST /api/notifications/test
 * @desc    Send test notification
 * @access  Private
 */
router.post('/test', protect, async (req, res) => {
  try {
    const { fcmToken } = req.body;
    
    if (!fcmToken) {
      return res.status(400).json({
        success: false,
        message: 'FCM token is required'
      });
    }

    const result = await sendTestNotification(fcmToken);

    res.json({
      success: true,
      message: 'Test notification sent',
      result
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test notification',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/notifications/send
 * @desc    Send custom notification to user
 * @access  Private (Admin only)
 */
router.post('/send', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { userId, eventData } = req.body;

    if (!userId || !eventData) {
      return res.status(400).json({
        success: false,
        message: 'userId and eventData are required'
      });
    }

    // Get user's FCM token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const result = await sendNotificationToUser(userId, eventData, user.fcmToken);

    res.json({
      success: true,
      message: 'Notification sent',
      result
    });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/notifications/stats
 * @desc    Get notification stats for current user
 * @access  Private
 */
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = getUserNotificationStats(req.user._id.toString());

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notification stats',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/notifications/update-token
 * @desc    Update user's FCM token
 * @access  Private
 */
router.post('/update-token', protect, async (req, res) => {
  try {
    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({
        success: false,
        message: 'FCM token is required'
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      fcmToken,
      notificationsEnabled: true
    });

    res.json({
      success: true,
      message: 'FCM token updated successfully'
    });
  } catch (error) {
    console.error('Update token error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FCM token',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/notifications/toggle
 * @desc    Enable/disable notifications
 * @access  Private
 */
router.post('/toggle', protect, async (req, res) => {
  try {
    const { enabled } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      notificationsEnabled: enabled
    });

    res.json({
      success: true,
      message: `Notifications ${enabled ? 'enabled' : 'disabled'} successfully`
    });
  } catch (error) {
    console.error('Toggle notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle notifications',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/notifications/broadcast
 * @desc    Send broadcast notification to topic
 * @access  Private (Admin only)
 */
router.post('/broadcast', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { topic, eventData } = req.body;

    if (!topic || !eventData) {
      return res.status(400).json({
        success: false,
        message: 'topic and eventData are required'
      });
    }

    const result = await sendTopicNotification(topic, eventData);

    res.json({
      success: true,
      message: 'Broadcast notification sent',
      result
    });
  } catch (error) {
    console.error('Broadcast notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send broadcast notification',
      error: error.message
    });
  }
});

module.exports = router;
