// controllers/EnergyUsageController.js
const {
    client
} = require('../db/config');


const EnergyUsageController = {
    getTotalEnergyByStationId: async (req, res) => {
        try {
            const db = client.db('obe-sample');
            const collection = db.collection('energyusages');

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;

            const result = await collection.aggregate([{
                    $group: {
                        _id: '$stationId',
                        totalEnergy: {
                            $sum: '$totalEnergy'
                        }
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]).toArray();

            if (result.length === 0) {
                res.status(404).json({
                    error: 'No data found'
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },
    getTotalMinutesByDate: async (req, res) => {
        try {
            const db = client.db('obe-sample');
            const collection = db.collection('energyusages');

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;

            const result = await collection.aggregate([{
                    $group: {
                        _id: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$date'
                            }
                        },
                        totalMinutes: {
                            $sum: {
                                $multiply: ['$totalHours', 60]
                            }
                        }
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]).toArray();

            if (result.length === 0) {
                // No data found
                res.status(404).json({
                    error: 'No data found'
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },
    getMostBusyHour: async (req, res) => {
        try {
            const db = client.db('obe-sample');
            const collection = db.collection('energyusages');

            // const page = parseInt(req.query.page) || 1;
            // const limit = parseInt(req.query.limit) || 10;

            // const skip = (page - 1) * limit;

            const result = await collection.aggregate([{
                    $group: {
                        _id: '$hourly_port',
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 1
                }
            ]).toArray();

            if (result.length === 0) {
                // No data found
                res.status(404).json({
                    error: 'No data found'
                });
            } else {
                res.status(200).json(result[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },
    sumHourlyPortByHour: async (req, res) => {
        try {
            const db = client.db('obe-sample');
            const collection = db.collection('energyusages');

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;

            const result = await collection.aggregate([{
                    $group: {
                        _id: '$hourly_port',
                        totalPortSum: {
                            $sum: '$portNumber'
                        }
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]).toArray();

            if (result.length === 0) {
                // No data found
                res.status(404).json({
                    error: 'No data found'
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },
};

module.exports = {
    EnergyUsageController
};