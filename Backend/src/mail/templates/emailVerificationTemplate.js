const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
	</head>
	<body>
		<div class="container">
			<a href=${process.env.FRONTEND_URL}><img class="logo"
					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Adhyaay"></a>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with IIITBH PYQ HUB. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
		</div>
	</body>
	
	</html>`;
};
export default otpTemplate;