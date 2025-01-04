export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

export const getUsers = (): User[] => {
  try {
    const usersString = localStorage.getItem('users');
    console.log('Raw users from localStorage:', usersString); // Debug log
    const users = JSON.parse(usersString || '[]');
    console.log('Parsed users:', users); // Debug log
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const saveUser = (user: User): void => {
  try {
    const users = getUsers();
    users.push(user);
    const usersString = JSON.stringify(users);
    console.log('Saving users to localStorage:', usersString); // Debug log
    localStorage.setItem('users', usersString);
    
    // Verify the save
    const savedUsers = localStorage.getItem('users');
    console.log('Verified saved users:', savedUsers); // Debug log
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user');
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};