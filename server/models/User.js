// User model
// This file will contain user data structure and validation

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate user data
  static validate(userData) {
    const errors = [];

    if (!userData.name || userData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push('Please provide a valid email address');
    }

    if (!userData.password || userData.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Email validation
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Hash password (placeholder)
  static hashPassword(password) {
    // TODO: Implement proper password hashing (bcrypt, etc.)
    return password; // This is just a placeholder
  }

  // Compare password (placeholder)
  static comparePassword(password, hash) {
    // TODO: Implement proper password comparison
    return password === hash; // This is just a placeholder
  }
}

module.exports = User;
