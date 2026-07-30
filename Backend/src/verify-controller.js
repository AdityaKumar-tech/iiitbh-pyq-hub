import dotenv from 'dotenv';
import User from './models/User.model.js';
import { signup } from './controllers/User.controller.js';

dotenv.config();

console.log('==========================================');
console.log('   RUNNING SIGNUP CONTROLLER INTEGRATION  ');
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

const mockDb = [];

// Stub findOne
User.findOne = async (query) => {
  if (query.email) {
    return mockDb.find(u => u.email === query.email) || null;
  }
  if (query.rollNumber) {
    return mockDb.find(u => u.rollNumber === query.rollNumber) || null;
  }
  return null;
};

// Stub save method
User.prototype.save = async function() {
  const mockId = 'mock_mongo_id_' + Math.random().toString(36).substr(2, 9);
  const userRecord = {
    _id: mockId,
    name: this.name,
    email: this.email,
    password: this.password,
    rollNumber: this.rollNumber
  };
  mockDb.push(userRecord);
  this._id = mockId;
  return this;
};

const runController = async (reqBody) => {
  const req = { body: reqBody };
  let statusResult = 200;
  let jsonResult = {};

  const res = {
    status: (code) => {
      statusResult = code;
      return res;
    },
    json: (data) => {
      jsonResult = data;
      return res;
    }
  };

  await signup(req, res);
  return { status: statusResult, body: jsonResult };
};

const runTests = async () => {
  try {
    process.env.ALLOWED_EMAIL_DOMAIN = 'college.edu';

    // Test 1: Missing name field
    const res1 = await runController({
      email: 'john@college.edu',
      password: 'password123',
      rollNumber: 'CS1001'
    });
    assert(res1.status === 400, 'Should reject missing fields with 400');
    assert(res1.body.success === false, 'Response success should be false');
    assert(res1.body.message.includes('required'), 'Message should flag required fields');

    // Test 2: Invalid email domain
    const res2 = await runController({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password123',
      rollNumber: 'CS1001'
    });
    assert(res2.status === 400, 'Should reject invalid college domain with 400');
    assert(res2.body.success === false, 'Response success should be false');
    assert(res2.body.message.includes('restricted to college email addresses'), 'Message should specify domain restriction');

    // Test 3: Successful registration
    const res3 = await runController({
      name: 'John Doe',
      email: 'john@COLLEGE.edu',
      password: 'password123',
      rollNumber: 'CS1001'
    });
    assert(res3.status === 201, 'Should register new user with 201 status');
    assert(res3.body.success === true, 'Response success should be true');
    assert(res3.body.user.email === 'john@college.edu', 'Email should be normalized to lowercase');
    assert(res3.body.user.rollNumber === 'CS1001', 'Roll number should be returned');
    assert(!!res3.body.token, 'Should return signed JWT token');

    // Test 4: Duplicate email check
    const res4 = await runController({
      name: 'John Another',
      email: 'john@college.edu',
      password: 'newpassword123',
      rollNumber: 'CS1002'
    });
    assert(res4.status === 400, 'Should reject duplicate email registration with 400');
    assert(res4.body.success === false, 'Duplicate response success should be false');
    assert(res4.body.message.includes('already registered'), 'Duplicate message should state already registered');

    // Test 5: Duplicate roll number check
    const res5 = await runController({
      name: 'John Another',
      email: 'john2@college.edu',
      password: 'newpassword123',
      rollNumber: 'CS1001'
    });
    assert(res5.status === 400, 'Should reject duplicate roll number registration with 400');
    assert(res5.body.success === false, 'Duplicate response success should be false');
    assert(res5.body.message.includes('Roll number is already registered'), 'Duplicate roll number message should state already registered');

  } catch (error) {
    console.error('[ERROR] Controller Test Suite failed:', error);
    failCount++;
  }

  console.log('\n==========================================');
  console.log(`Controller Tests Complete: ${passCount} Passed, ${failCount} Failed.`);
  console.log('==========================================');
  
  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};

runTests();
