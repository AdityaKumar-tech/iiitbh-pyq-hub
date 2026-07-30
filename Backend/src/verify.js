import dotenv from 'dotenv';
import User from './models/User.model.js';
import { generateToken } from './utils/jwt.util.js';
import jwt from 'jsonwebtoken';

dotenv.config();

console.log('==========================================');
console.log('      RUNNING AUTH API VERIFICATION      ');
console.log('==========================================\n');

let passCount = 0;
let failCount = 0;

const assert = (condition, message) => {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
};

// -------------------------------------------------------------
// Test Suite 1: JWT Utility
// -------------------------------------------------------------
console.log('--- Test Suite 1: JWT Utility ---');
try {
  const secretKey = 'test-verification-secret-key-12345';
  process.env.JWT_SECRET = secretKey;

  const testPayload = {
    mongo_id: '64c123456789abcdef123456',
    rollNo: '2023CSB1001',
    email: 'student@college.edu'
  };

  const token = generateToken(testPayload);
  assert(typeof token === 'string', 'Token should be a string');

  const decoded = jwt.verify(token, secretKey);
  assert(decoded.mongo_id === testPayload.mongo_id, 'Decoded mongo_id should match');
  assert(decoded.rollNo === testPayload.rollNo, 'Decoded rollNo should match');
  assert(decoded.email === testPayload.email, 'Decoded email should match');
  assert(typeof decoded.exp === 'number', 'Decoded token should contain expiry timestamp');

} catch (error) {
  console.error('[ERROR] JWT Utility Test Suite encountered error:', error);
  failCount++;
}

console.log('');

// -------------------------------------------------------------
// Test Suite 2: Mongoose Schema Validation
// -------------------------------------------------------------
console.log('--- Test Suite 2: Mongoose Schema Validation ---');
try {
  const emptyUser = new User({});
  const validationError = emptyUser.validateSync();
  assert(validationError !== undefined, 'Validation should fail on empty body');
  assert(!!validationError.errors.name, 'Name field should be required');
  assert(!!validationError.errors.email, 'Email field should be required');
  assert(!!validationError.errors.password, 'Password field should be required');
  assert(!!validationError.errors.rollNumber, 'Roll Number field should be required');

  const badEmailUser = new User({
    name: 'Alice Smith',
    email: 'not-an-email',
    password: 'password123',
    rollNumber: '2023ECB1020'
  });
  const badEmailErr = badEmailUser.validateSync();
  assert(badEmailErr !== undefined, 'Validation should fail on bad email format');
  assert(badEmailErr.errors.email.message.includes('not a valid email format'), 'Error message should complain about format');

  const validUser = new User({
    name: 'Alice Smith',
    email: 'alice@college.edu',
    password: 'password123',
    rollNumber: '2023ECB1020'
  });
  const validErr = validUser.validateSync();
  assert(validErr === undefined, 'Validation should pass on properly formatted user schema data');

} catch (error) {
  console.error('[ERROR] Schema Validation Test Suite encountered error:', error);
  failCount++;
}

console.log('\n==========================================');
console.log(`Verification Complete: ${passCount} Passed, ${failCount} Failed.`);
console.log('==========================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
