const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /\W/.test(password);
  const isValidLength = password.length >= 8;

  return (
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar &&
    isValidLength
  );
};

const validatePhoneNumber = (phoneNumber) => {
  const re = /^\+?(\d.*){10,15}$/;
  return re.test(phoneNumber);
};

export { validateEmail, validatePassword, validatePhoneNumber };
