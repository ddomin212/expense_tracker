const Timestamp = require("../models/Timestamp");

const getTimestamp = async (connection, user) => {
  try {
    const timestamp = await Timestamp.findOne({ connection, user });
    if (!timestamp) {
      const newTimestamp = Timestamp.create({ connection, user });
    }
    timestamp.connection = connection;
    timestamp.save();
    res.status(200).json({ timestamp });
  } catch (err) {
    console.log(err);
  }
};
