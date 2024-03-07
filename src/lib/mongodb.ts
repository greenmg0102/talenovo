
import { Db, MongoClient } from "mongodb";

const MONGODB_DB = "talenovo";
// const uri = "mongodb+srv://greenmg0102:ZnrVFGLqb8q6iv5E@cluster0.wj0ebxi.mongodb.net/?retryWrites=true&w=majority"
const uri = "mongodb+srv://greenmg0102:ZnrVFGLqb8q6iv5E@cluster0.wj0ebxi.mongodb.net/?retryWrites=true&w=majority&ssl=false&sslCAPath=path-to-ca-file.pem"

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
  let client = new MongoClient(uri);
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
