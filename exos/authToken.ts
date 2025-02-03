// Description:
// Simuler un système de login / register en JavaScript avec le decrytage et l'encryptage d'un token

type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

const user = {
  id: 1,
  username: "louis",
  password: "admin@123",
  role: "admin",
};

// variable utilisateur sans valeur pour tester cas d'échec des fonctions
let users;

function generateToken(user: User | undefined) {
  if (user) {
    let encoded = btoa(JSON.stringify(user));
    return encoded;
  }
  if (!user) {
    return "No user init";
  }
}

function verifyToken(user: User | undefined) {
  if (user) {
    console.log("🚀 ~ generateToken:", generateToken(user));
    let decoded = atob(generateToken(user) ?? "");
    return decoded;
  }
  if (!user) {
    return "User not found";
  }
}

console.log("🚀 ~ verifyToken:", verifyToken(user));

// cas d'échec de la fonction verifyToken
// console.log("🚀 ~ verifyToken:", verifyToken(users));
