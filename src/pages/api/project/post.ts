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

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  const db = client.db("data");

  const projectsCollection = db.collection("projects");

  //projects 배열 호출
  const projects = await projectsCollection.find().toArray();

  //원하는 일지만 찾기
  const project = projects.find((list) => list.projectId === projectId);

  // 연결 종료
  client.close();

  res.status(200).json(project);
}
