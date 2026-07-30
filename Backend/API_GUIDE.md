# IIIT BH PYQ Hub - API Testing Guide

Welcome to the IIIT BH PYQ API! This guide will explain how to set up your environment and test the available endpoints using Postman or Thunder Client.

## 🛠️ Initial Setup
1. Clone the repository and navigate to the `Backend/` folder.
2. Create a `.env` file and copy the contents from `.env.sample`.
3. Ask the team lead for the secret keys (`JWT_SECRET`, `ADMIN_SECRET_KEY`, `MONGODB_URL`, and Cloudinary credentials) to paste into your `.env`.
4. Run `npm install` to install dependencies.
5. Run `npm run dev` to start the local server on `http://localhost:5000`.

---

## 🔒 1. Authentication & User Flows

**Important:** Registration is strictly restricted to `@iiitbh.ac.in` email addresses.

### A. Generate OTP
Before a user can sign up, they must verify their email.
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/sendotp`
- **Body (JSON):**
  ```json
  {
    "email": "yourname.250101016@iiitbh.ac.in"
  }
  ```

### B. Sign Up
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/signup`
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "yourname.250101016@iiitbh.ac.in",
    "password": "securepassword123",
    "rollNumber": "250101016",
    "otp": "123456" 
  }
  ```
  *(Note: This automatically logs the user in by sending a `token` cookie).*

### C. Login
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "yourname.250101016@iiitbh.ac.in",
    "password": "securepassword123"
  }
  ```
  *(Note: Response includes a `token` in the body and sets an HTTP-only cookie).*

### D. Promote Account to Admin
Used to elevate a standard student account to an Admin account (required for uploading PDFs).
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/promote-admin`
- **Body (JSON):**
  ```json
  {
    "email": "yourname.250101016@iiitbh.ac.in",
    "adminSecret": "supersecretadminpassword"
  }
  ```
  *(Note: Match `adminSecret` with the `ADMIN_SECRET_KEY` in your `.env` file).*

---

## 👤 2. Profile Management

*These endpoints require you to be logged in. Ensure your Postman is sending the `token` cookie, or add an `Authorization: Bearer <your_token>` header.*

### A. Get My Details
Fetches the logged-in user's data and profile info.
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/profile/details`

### B. Update Profile
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/profile/update`
- **Body (form-data):** *(DO NOT manually set the Content-Type header in Postman!)*
  - `gender`: Male / Female / Other
  - `dateOfBirth`: YYYY-MM-DD
  - `about`: "I love coding"
  - `contactNumber`: 1234567890
  - `displayPicture`: [Select a file from your computer] (Set the key type to 'File')

---

## 📚 3. Resources (PYQs & Notes)

### A. Upload a Resource (ADMIN ONLY)
You must be logged in as an Admin to access this.
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/resources/upload`
- **Body (form-data):** *(DO NOT manually set the Content-Type header in Postman!)*
  - `title`: "2023 Mid-Sem Question Paper"
  - `description`: "Hard questions on graphs."
  - `subjectId`: "6a6b5794a8bc353917c6e0de" *(You must get this from creating/fetching a subject)*
  - `file`: [Select the PDF file] (Set the key type to 'File')

### B. Search Resources
Anyone can search the PYQ database.
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/resources/search`
- **Body (JSON):**
  ```json
  {
    "query": "Mid-Sem"
  }
  ```

### C. Increment Download Count
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/resources/increment-download`
- **Body (JSON):**
  ```json
  {
    "resourceId": "6a6b5c3215ceb61227a43d6e"
  }
  ```

---

## 🚨 Troubleshooting Common Postman Issues

1. **"Malformed part header" error during file upload:**
   - **Cause:** Postman failed to generate the correct multipart boundary, usually because you manually added a `Content-Type: multipart/form-data` header in the Headers tab, or the file you attached is locked by another app (like Adobe Acrobat).
   - **Fix:** Go to Headers, ensure you delete any manual `Content-Type` header (leave the auto-generated hidden one checked). If that fails, remove the file attachment in the Body tab, close any PDF readers, and re-attach the file freshly.

2. **"Unknown API key" or 500 Error during Cloudinary upload:**
   - **Fix:** Ensure you have valid `CLOUD_NAME`, `API_KEY`, and `API_SECRET` values inside your `.env` file. Do not use dummy values. Restart the server after modifying `.env`.
