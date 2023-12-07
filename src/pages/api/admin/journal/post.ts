import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type Data = {
  projectId: number;
  projectTitle: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const journalId = Number(req.query.journalid);

  const { method } = req;

  // 몽고db 연결

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );
  //data db 접속
  const db = client.db("data");

  // 컬렉션 호출
  const projectsCollection = db.collection("projects");
  const journalsCollection = db.collection("journals");

  //일지 생성
  if (method === "POST") {
    const reqJournal = req.body;

    // 프로젝트 타이틀 추출
    const projects = await projectsCollection.find().toArray();
    const projectTitle = projects.find(
      (list) => list.projectId === reqJournal.projectId
    ).projectTitle;

    // 새로운 일지 id 생성
    const journals = await journalsCollection.find().toArray();
    const journalId = journals[journals.length - 1].journalId + 1;

    const newJournal = {
      projectId: reqJournal.projectId,
      journalId: journalId,
      journalDescription: reqJournal.description,
      journalTitle: reqJournal.title,
      projectTitle: projectTitle,
    };

    journalsCollection.insertOne(newJournal, (err) => {
      err ? console.log(err) : client.close();
    });

    res.status(200).json({ message: "정상적으로 추가되었습니다." });
  }
  //일지 불러오기
  if (method === "GET") {
    //프로젝트 배열 호출
    const journals = await journalsCollection.find().toArray();

    //데이터 가공
    const journal = journals.find((list) => list.journalId === journalId);

    // 연결 종료
    client.close();

    res.status(200).json(journal);
  }
  //일지 수정
  if (method === "PUT") {
    const reqJournal = req.body;

    journalsCollection.updateOne(
      { journalId: reqJournal.journalId },
      {
        $set: {
          journalTitle: reqJournal.title,
          journalDescription: reqJournal.description,
        },
      },
      (err) => {
        err ? console.log(err) : client.close();
      }
    );

    res.status(200).json({ message: "정상적으로 수정되었습니다." });
  }
}
