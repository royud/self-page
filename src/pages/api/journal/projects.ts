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
  // 몽고db 연결
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  //data db 접속
  const db = client.db("data");

  // projects 컬렉션 호출 or 생성
  const projectsCollection = db.collection("projects");

  //프로젝트 배열 호출
  const projects = await projectsCollection.find().toArray();

  //데이터 가공
  const projectList = [];
  for (let i = 0; i < projects.length; i++) {
    const newList = {
      projectId: projects[i].projectId,
      projectTitle: projects[i].projectTitle,
    };
    projectList.push(newList);
  }

  // 연결 종료
  client.close();

  res.status(200).json(projectList);
}
