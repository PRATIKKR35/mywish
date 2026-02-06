import client from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, message } = req.body;
    await client.connect();
    const db = client.db("greetings");
    const result = await db.collection("cards").insertOne({
      name,
      message,
      createdAt: new Date()
    });
    res.json({ id: result.insertedId });
  }
}
