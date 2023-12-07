import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  const db = client.db("data");

  const profileCollection = db.collection("profile");

  const { method } = req;

  if (method === "PUT") {
    const reqProfile = req.body;

    const stackList = reqProfile.stack.split(", ");

    reqProfile["stack"] = stackList;

    profileCollection
      .updateOne(
        {},
        {
          $set: reqProfile,
        }
      )
      .then((err) => {
        err ? console.log(err) : client.close();
      });
    res.status(200).json({ message: "정상적으로 수정되었습니다." });
  }
  if (method === "GET") {
    //프로젝트 배열 호출
    const profile = await profileCollection.findOne();

    const stackList = profile?.stack.join(", ");

    profile["stack"] = stackList;

    res.status(200).json(profile);
  }
}
