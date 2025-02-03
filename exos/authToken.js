// Description: Exercice 1 
var user = {
    id: 1,
    username: "louis",
    password: "admin@123",
    role: "admin",
};
// variable utilisateur sans valeur pour tester cas d'échec des fonctions
var users;
function generateToken(user) {
    if (user) {
        var encoded = btoa(JSON.stringify(user));
        return encoded;
    }
    if (!user) {
        return "No user init";
    }
}
function verifyToken(user) {
    if (user) {
        console.log("🚀 ~ generateToken:", generateToken(user));
        var decoded = atob(generateToken(user) || "");
        return decoded;
    }
    if (!user) {
        return "User not found";
    }
}
console.log("🚀 ~ verifyToken:", verifyToken(user));
// cas d'échec
// console.log("🚀 ~ verifyToken:", verifyToken(users));
