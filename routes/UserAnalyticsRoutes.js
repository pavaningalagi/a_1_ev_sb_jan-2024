// routes/UserAnalyticsRoutes.js
const express = require('express');
const {
    UserAnalyticsController
} = require('../controllers/UserAnalyticsController');

const UserAnalyticsRoutes = express.Router();

UserAnalyticsRoutes.get('/sumLoginActionByUserId', UserAnalyticsController.getSumLoginActionByUserId);
UserAnalyticsRoutes.get('/mostActiveUserByDate', UserAnalyticsController.getMostActiveUserByDate);

module.exports = {
    UserAnalyticsRoutes
};