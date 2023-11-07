const {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  createDecipheriv,
} = require("crypto");
const { Buffer } = require("buffer");
const cipherAlg = (pass) => {
  const algorithm = "aes-192-cbc";
  const password = process.env.CIPHER_KEY;

  // First, we'll generate the key. The key length is dependent on the algorithm.
  // In this case for aes192, it is 24 bytes (192 bits).
  scrypt(password, "salt", 24, (err, key) => {
    if (err) throw err;
    // Then, we'll generate a random initialization vector
    randomFill(new Uint8Array(16), (err, iv) => {
      if (err) throw err;

      const cipher = createCipheriv(algorithm, key, iv);

      let encrypted = cipher.update(pass, "utf8", "hex");
      encrypted += cipher.final("hex");
      console.log(encrypted);
      return encrypted;
    });
  });
};
const decipherAlg = (cipher) => {
  const algorithm = "aes-192-cbc";
  const password = process.env.CIPHER_KEY;
  // Use the async `crypto.scrypt()` instead.
  const key = scryptSync(password, "salt", 24);
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0); // Initialization vector.

  const decipher = createDecipheriv(algorithm, key, iv);

  // Encrypted using same algorithm, key and iv.
  let decrypted = decipher.update(cipher, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log(decrypted);
  return decrypted;
};
module.exports = { cipherAlg, decipherAlg };
