import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  try {
    if (req.method !== "PATCH") {
      return;
    }
    const session = await getSession({ req });
    if (!session) {
      res.status(401).send({ message: "Not Authenticated" });
      return;
    }
    const userEmail = session.user.email;
    const { old_password, new_password } = req.body;
    const client = await connectToDatabase();
    const db = client.db();
    const userCollections = db.collection("users");
    const user = await userCollections.findOne({ email: userEmail });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      client.close();
      return;
    }
    const currentPassword = user.password;
    const isValid = await verifyPassword(old_password, currentPassword);
    if (!isValid) {
      res.status(403).send({ message: "Invalid Password" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(new_password);
    const result = await userCollections.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
    client.close();
    res.status(200).send({ message: "Password Updated" });
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: e.message || "Something Went wrong" });
    return;
  }
}
export default handler;
