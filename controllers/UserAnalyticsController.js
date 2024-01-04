const {
    client
} = require('../db/config');

const UserAnalyticsController = {
    getSumLoginActionByUserId: async (req, res) => {
        try {
            const db = client.db('obe-sample');
            const collection = db.collection('useranalytics');

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;

            const result = await collection.aggregate([{
                    $match: {
                        action: 'LOGIN'
                    }
                },
                {
                    $group: {
                        _id: '$userId',
                        totalLogins: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        totalLogins: -1
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
    getMostActiveUserByDate: async (req, res) => {
        try {
            const db = client.db('obe-sample');
            const collection = db.collection('useranalytics');


            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;

            const result = await collection.aggregate([{
                    $group: {
                        _id: {
                            userId: '$userId',
                            createdAt: '$createdAt'
                        },
                        totalActions: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        totalActions: -1
                    }
                },
                {
                    $group: {
                        _id: '$_id.createdAt',
                        mostActiveUser: {
                            $first: '$_id.userId'
                        },
                        totalActions: {
                            $first: '$totalActions'
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
    UserAnalyticsController
};