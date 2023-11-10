const Timestamp = require("../models/Timestamp");

/**
 * Retrieves or creates a timestamp for a given connection and user.
 * @param {string} connection - The connection identifier.
 * @param {string} user - The user identifier.
 */
const getTimestamp = async (connection, user) => {
  try {
    // Find the timestamp for the given connection and user.
    const timestamp = await Timestamp.findOne({ connection, user });
    if (!timestamp) {
      // If no timestamp exists, create a new one.
      const newTimestamp = Timestamp.create({ connection, user });
    }
    // Update the connection and save the timestamp.
    timestamp.connection = connection;
    timestamp.save();
    // Return the timestamp as a JSON response.
    res.status(200).json({ timestamp });
  } catch (err) {
    console.log(err);
  }
};
