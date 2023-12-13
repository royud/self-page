import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

import { MongoDBData } from "@/types/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MongoDBData>
) {
  const journalId = Number(req.query.journalid);
  // 몽고db 연결
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  //data db 접속
  const db = client.db("data");

  // journals 컬렉션 호출 or 생성
  const journalsCollection = db.collection("journals");

  //journals 배열 호출
  const journals = await journalsCollection.find().toArray();

  //원하는 일지만 찾기
  const journal = journals.find((list) => list.journalId === journalId);

  // 연결 종료
  client.close();

  res.status(200).json(journal);
}
