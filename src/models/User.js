const users = [];

const User = {
    create: async (userData) => {
        users.push(userData);
        return userData;
    },
    findByEmail: async (email) => {
        return users.find(user => user.email === email);
    },
    clearAll: () => {
        users.length = 0;
    }
};

module.exports = User;