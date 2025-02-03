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

// variable utilisateur undefined pour tester cas d'échec des fonctions
let users = undefined;

const generateToken = (user: User | undefined) => {
  if (user) {
    let encoded = btoa(JSON.stringify(user));
    return encoded;
  }

  return "No user init";
};

const verifyToken = (user: User | undefined) => {
  if (user) {
    console.log("🚀 ~ generateToken:", generateToken(user));
    let decoded = atob(generateToken(user) ?? "");
    const parsedToken = JSON.parse(decoded);
    return parsedToken;
  }

  return "User not found";
};

console.log("🚀 ~ verifyToken:", verifyToken(user));

// cas d'échec de la fonction verifyToken
// console.log("🚀 ~ verifyToken:", verifyToken(users));
