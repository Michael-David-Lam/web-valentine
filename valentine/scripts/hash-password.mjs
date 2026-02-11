#!/usr/bin/env node
/**
 * Generates the SHA-256 hash of a password for use in NEXT_PUBLIC_SITE_PASSWORD_HASH.
 * Usage: npm run hash-password
 *    or: node scripts/hash-password.mjs "your password"
 *
 * Uses the same algorithm (SHA-256, hex) as the browser login check.
 */

import crypto from "node:crypto";
import readline from "node:readline";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password, "utf8").digest("hex");
}

function getPasswordFromArgv() {
  const arg = process.argv[2];
  if (arg !== undefined && arg !== "") return arg;
  return null;
}

function promptPassword() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question("Password to hash: ", (answer) => {
      rl.close();
      resolve(answer || null);
    });
  });
}

async function main() {
  let password = getPasswordFromArgv();
  if (password === null) {
    password = await promptPassword();
  }
  if (!password) {
    console.error("No password provided.");
    process.exit(1);
  }
  const hash = hashPassword(password);
  console.log("\nAdd this to .env.local:\n");
  console.log(`NEXT_PUBLIC_SITE_PASSWORD_HASH=${hash}`);
  console.log("");
}

main();
