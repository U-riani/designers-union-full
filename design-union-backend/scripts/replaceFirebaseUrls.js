// scripts/replaceFirebaseUrls.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

function deepReplace(v, oldPrefix, newPrefix) {
  if (typeof v === "string") {
    return v.startsWith(oldPrefix) ? newPrefix + v.slice(oldPrefix.length) : v;
  }
  if (Array.isArray(v)) return v.map((x) => deepReplace(x, oldPrefix, newPrefix));
  if (v && typeof v === "object") {
    const out = {};
    for (const [k, val] of Object.entries(v)) out[k] = deepReplace(val, oldPrefix, newPrefix);
    return out;
  }
  return v;
}

(async () => {
  const mongoUri = process.env.MONGO_URI;
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db();

  const bucketName = String(process.env.FIREBASE_STORAGE_BUCKET || "").replace(/^gs:\/\//, "");
  const oldPrefix = `https://storage.googleapis.com/uriani.appspot.com/`;
  const newPrefix = `https://designersunion.ge/imagesUploadFolder/`;

  const cols = await db.listCollections().toArray();
  for (const c of cols) {
    const col = db.collection(c.name);
    const cursor = col.find({});
    let updated = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const doc2 = deepReplace(doc, oldPrefix, newPrefix);
      if (JSON.stringify(doc) !== JSON.stringify(doc2)) {
        await col.replaceOne({ _id: doc._id }, doc2);
        updated++;
      }
    }

    if (updated) console.log(`${c.name}: updated ${updated}`);
  }

  await client.close();
  console.log("Done.");
})();
