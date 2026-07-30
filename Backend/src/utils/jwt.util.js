import jwt from 'jsonwebtoken';

/**
 * Utility to generate a JWT token containing the user's mongo_id, rollNo, and email.
 * 
 * @param {Object} userData - User details
 * @param {string} userData.mongo_id - User's MongoDB ID
 * @param {string} userData.rollNo - User's Roll Number
 * @param {string} userData.email - User's email address
 * @returns {string} Signed JWT token
 */
export const generateToken = ({ mongo_id, rollNo, email }) => {
  if (!mongo_id || !rollNo || !email) {
    throw new Error('Token creation failed: mongo_id, rollNo, and email are required');
  }

  const payload = {
    mongo_id,
    rollNo,
    email
  };

  const secret = process.env.JWT_SECRET || 'supersecretjwtkey1234567890';

  return jwt.sign(payload, secret, { expiresIn: '24h' });
};
