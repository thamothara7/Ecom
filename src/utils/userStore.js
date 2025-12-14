
const USERS_STORAGE_KEY = 'ecom_users';
const CURRENT_USER_KEY = 'ecom_current_user';
const AUTH_EVENT = 'auth-change';

// Helper to get all users
const getUsers = () => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const getCurrentUser = () => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const registerUser = (userData) => {
    const users = getUsers();

    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already registered');
    }

    const newUser = { ...userData, id: Date.now() };
    const updatedUsers = [...users, newUser];

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Auto login after register
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event(AUTH_EVENT));

    return newUser;
};

export const loginUser = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(AUTH_EVENT));
    return user;
};

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
};

export const subscribeToAuth = (callback) => {
    window.addEventListener(AUTH_EVENT, callback);
    return () => window.removeEventListener(AUTH_EVENT, callback);
};
