// backend/lib/hostgatorSftp.js
require("dotenv").config(); // Load environment variables from .env

const SftpClient = require("ssh2-sftp-client");
const path = require("path");
const crypto = require("crypto");

function normalizeNoTrailingSlash(p) {
  return String(p || "").replace(/\/+$/, "");
}

function safeFilename(originalName) {
  const ext = path.extname(originalName || "").toLowerCase();
  const rand = crypto.randomBytes(8).toString("hex");
  const finalExt = ext && ext.length <= 10 ? ext : ".jpg";
  return `${Date.now()}-${rand}${finalExt}`;
}

function urlToFilename(url) {
  try {
    const u = new URL(url);
    return path.posix.basename(u.pathname);
  } catch {
    return path.posix.basename(String(url || ""));
  }
}

function buildPublicUrl(filename) {
  const base = normalizeNoTrailingSlash(process.env.PUBLIC_BASE_URL);
  return `${base}/imagesUploadFolder/${filename}`;
}

async function withSftp(fn) {
  const sftp = new SftpClient();
  const host = process.env.HOSTGATOR_SFTP_HOST;
  const port = Number(process.env.HOSTGATOR_SFTP_PORT || 22);
  const username = process.env.HOSTGATOR_SFTP_USER;

  const privateKeyRaw = process.env.HOSTGATOR_SFTP_PRIVATE_KEY;
  const privateKey = privateKeyRaw ? privateKeyRaw.replace(/\\n/g, "\n") : null;

  const password = process.env.HOSTGATOR_SFTP_PASSWORD;

  
console.log(host, username);
  if (!host || !username) throw new Error("Missing HOSTGATOR_SFTP_HOST/USER");

  await sftp.connect({
    host,
    port,
    username,
    ...(privateKey ? { privateKey } : { password }),
    passphrase: process.env.HOSTGATOR_SFTP_PASSPHRASE, // required for encrypted key
  });

  try {
    return await fn(sftp);
  } finally {
    await sftp.end();
  }
}

async function uploadBuffer(buffer, originalName) {
  const remoteDir = normalizeNoTrailingSlash(process.env.HOSTGATOR_REMOTE_DIR);
  if (!remoteDir) throw new Error("Missing HOSTGATOR_REMOTE_DIR");

  const filename = safeFilename(originalName);
  const remotePath = `${remoteDir}/${filename}`;

  await withSftp(async (sftp) => {
    // folder already exists, but ensureDir is fine; some hosts are picky
    try {
      await sftp.mkdir(remoteDir, true);
    } catch (_) {}

    await sftp.put(buffer, remotePath);
  });

  return { url: buildPublicUrl(filename), filename, remotePath };
}

async function deleteByUrl(imageUrl) {
  if (!imageUrl) return;
  const remoteDir = normalizeNoTrailingSlash(process.env.HOSTGATOR_REMOTE_DIR);
  const filename = urlToFilename(imageUrl);
  if (!filename) return;

  const remotePath = `${remoteDir}/${filename}`;

  await withSftp(async (sftp) => {
    try {
      await sftp.delete(remotePath);
    } catch (e) {
      // ignore if already missing
      const msg = String(e?.message || e);
      if (!msg.toLowerCase().includes("no such file")) throw e;
    }
  });
}

module.exports = {
  uploadBuffer,
  deleteByUrl,
  buildPublicUrl,
};
