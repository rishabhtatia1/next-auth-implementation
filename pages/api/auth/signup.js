import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { validateEmail } from "../../../lib/validation";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;
  if (
    !email ||
    !validateEmail(email) ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).send({ message: "Invalid input" });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    res.status(422).send({ message: "User exists already" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword
  });
  res.status(201).send({ message: "Created user" });
  client.close();
}

export default handler;
