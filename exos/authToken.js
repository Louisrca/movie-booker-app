// Description:
// Simuler un système de login / register en JavaScript avec le decrytage et l'encryptage d'un token
var user = {
    id: 1,
    username: "louis",
    password: "admin@123",
    role: "admin",
};
// variable utilisateur sans valeur pour tester cas d'échec des fonctions
var users;
var generateToken = function (user) {
    if (user) {
        var encoded = btoa(JSON.stringify(user));
        return encoded;
    }
    if (!user) {
        return "No user init";
    }
};
var verifyToken = function (user) {
    var _a;
    if (user) {
        console.log("🚀 ~ generateToken:", generateToken(user));
        var decoded = atob((_a = generateToken(user)) !== null && _a !== void 0 ? _a : "");
        return decoded;
    }
    if (!user) {
        return "User not found";
    }
};
console.log("🚀 ~ verifyToken:", verifyToken(user));
// cas d'échec de la fonction verifyToken
// console.log("🚀 ~ verifyToken:", verifyToken(users));
