
import { Db, MongoClient } from "mongodb";

const MONGODB_DB = "talenovo";
const uri = "mongodb+srv://talenovomongodb:AwguQp3KwfZmQNC@talenovo.kkiuj6e.mongodb.net/?retryWrites=true&w=majority&appName=talenovo"
// const uri = "mongodb+srv://greenmg0102:PFjEt0dbZLqN16YI@cluster0.wj0ebxi.mongodb.net/?retryWrites=true&w=majority"

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Ensure SSL/TLS is enforced
    tlsAllowInvalidCertificates: false, // Ensure this matches your security policy
    tlsAllowInvalidHostnames: false,   // Ensure this matches your security policy
  };

  // check the MongoDB URI
  if (!uri) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  // Connect to cluster
  let client = new MongoClient(uri, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
