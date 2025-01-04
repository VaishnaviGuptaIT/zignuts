export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

export const validateEmail = (email: string): boolean => {
  return /^\S+@\S+$/i.test(email);
};

export const validateMobile = (mobile: string): boolean => {
  return /^\d{10}$/.test(mobile);
};