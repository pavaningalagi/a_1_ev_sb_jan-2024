// routes/EnergyUsageRoutes.js
const express = require('express');
const {
    EnergyUsageController
} = require('../controllers/EnergyUsageController');

const EnergyUsageRoutes = express.Router();

EnergyUsageRoutes.get('/totalEnergyByStationId', EnergyUsageController.getTotalEnergyByStationId);
EnergyUsageRoutes.get('/totalMinutesByDate', EnergyUsageController.getTotalMinutesByDate);
EnergyUsageRoutes.get('/mostBusyHour', EnergyUsageController.getMostBusyHour);
EnergyUsageRoutes.get('/sumHourlyPortByHour', EnergyUsageController.sumHourlyPortByHour);
// Add other routes for EnergyUsageController as needed

module.exports = {
    EnergyUsageRoutes
};