import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  const db = client.db("data");

  const profileCollection = db.collection("profile");

  //프로젝트 배열 호출
  const profile = await profileCollection.findOne();

  res.status(200).json(profile);
}
