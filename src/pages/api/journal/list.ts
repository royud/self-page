import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type Data = {
  projectId: number;
  projectTitle: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = Number(req.query.projectid);
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

  //프로젝트 id가 동일한 개발 일지만 필터링
  const filteredJournals = journals.filter(
    (list) => list.projectId === projectId
  );

  // 연결 종료
  client.close();

  res.status(200).json(filteredJournals);
}
