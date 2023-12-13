import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type Data = {
  id: number;
  title: string;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const projectId = Number(req.query.projectid);
  // 몽고db 연결
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  //data db 접속
  const db = client.db("data");

  // projects 컬렉션 호출 or 생성
  const journalsCollection = db.collection("journals");

  //프로젝트 배열 호출
  const journals = await journalsCollection.find().toArray();

  //데이터 가공
  const correntJournals = [];
  for (let i = 0; i < journals.length; i++) {
    if (projectId === journals[i].projectId) {
      const newList = {
        id: journals[i].journalId,
        title: journals[i].journalTitle,
      };
      correntJournals.push(newList);
    }
  }

  // 연결 종료
  client.close();

  res.status(200).json(correntJournals);
}
