// backend/scripts/migrateFirebaseUrls.js
require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const OLD_BASE = "https://storage.googleapis.com/uriani.appspot.com/";
const NEW_BASE = "https://designersunion.ge/imagesUploadFolder/";

function swapUrl(url) {
  if (typeof url !== "string") return url;
  if (!url.startsWith(OLD_BASE)) return url;
  return NEW_BASE + url.slice(OLD_BASE.length);
}

// returns { value, changed }
function deepReplace(value) {
  let changed = false;

  if (typeof value === "string") {
    const swapped = swapUrl(value);
    return { value: swapped, changed: swapped !== value };
  }

  if (Array.isArray(value)) {
    const out = value.map((v) => {
      const r = deepReplace(v);
      if (r.changed) changed = true;
      return r.value;
    });
    return { value: out, changed };
  }

  if (value && typeof value === "object") {
    // keep ObjectId, Date, Buffer etc. as-is
    const ctor = value.constructor && value.constructor.name;
    if (ctor && ctor !== "Object") return { value, changed: false };

    const out = {};
    for (const k of Object.keys(value)) {
      const r = deepReplace(value[k]);
      if (r.changed) changed = true;
      out[k] = r.value;
    }
    return { value: out, changed };
  }

  return { value, changed: false };
}

async function run() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  const cols = await db.listCollections().toArray();
  console.log("Collections:", cols.map((c) => c.name));

  for (const { name } of cols) {
    const col = db.collection(name);

    // scan documents in batches; projection reduces payload if you want, but keep simple
    const cursor = col.find({}, { batchSize: 200 });

    let scanned = 0;
    let updated = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      scanned++;

      const { value: newDoc, changed } = deepReplace(doc);

      if (changed) {
        // keep _id intact
        await col.replaceOne({ _id: doc._id }, newDoc);
        updated++;
        if (updated % 50 === 0) console.log(name, "updated:", updated);
      }

      if (scanned % 2000 === 0) console.log(name, "scanned:", scanned, "updated:", updated);
    }

    if (updated) console.log("DONE:", name, "updated:", updated);
  }

  await mongoose.disconnect();
  console.log("Migration complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});