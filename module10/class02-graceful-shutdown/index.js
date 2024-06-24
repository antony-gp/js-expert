import { MongoClient } from "mongodb";

async function connect() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();

  const db = client.db("bookstore");

  return {
    collections: { books: db.collection("books") },
    client,
  };
}

const { client, collections } = await connect();

await collections.books.deleteMany();

const books = ["Game of Thrones", "Rangers Apprentice", "Fire & Blood"];

async function insertMany() {
  try {
    for (const book of books) {
      await collections.books.insertOne({
        updatedAt: new Date().toISOString(),
        name: book,
      });
    }

    return await collections.books.find().toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const newBooks = await insertMany();

console.log(newBooks);

// Ctrl + C and kill {pid}
["SIGINT", "SIGTERM"].forEach((event) =>
  process.on(event, async () => {
    await client.close();
    console.log("Mongo connection has been closed");
    process.exit(0);
  })
);
