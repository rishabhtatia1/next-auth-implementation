import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://rishabh:rishabh@cluster0.br5un.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};
