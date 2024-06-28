// Function to generate OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

// Function to send OTP using Fast2SMS API
async function sendOtp(number) {
  const otp = generateOtp();
  const apiUrl = "https://www.fast2sms.com/dev/bulkV2";

  const headers = {
    authorization:
      "4AK8gFflVpRu0PHi5zwanTx1qDmd7oh6OvEXsMNybYGWckZ9B2pie4lKX1Ym5LQgjky8SJUb2wPxuETM",
    "Content-Type": "application/json",
  };

  const body = {
    route: "q",
    message: `Your OTP verification code is ${otp}`,
    flash: 0,
    numbers: number, // Add the phone number here
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { message: "Error sending OTP", otp };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Error sending OTP" };
  }
}
