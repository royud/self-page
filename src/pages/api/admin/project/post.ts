import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  // 몽고db 연결

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );
  //data db 접속
  const db = client.db("data");

  // 컬렉션 호출
  const projectsCollection = db.collection("projects");

  //일지 생성
  if (method === "POST") {
    const reqProject = req.body;

    // 프로젝트 타이틀 추출
    const projects = await projectsCollection.find().toArray();

    const projectId = projects[projects.length - 1].projectId + 1;

    const newProject = {
      projectId: projectId,
      projectDescription: reqProject.description,
      projectTitle: reqProject.title,
      completedYear: reqProject.year,
    };

    projectsCollection.insertOne(newProject, (err) => {
      err ? console.log(err) : client.close();
    });

    res.status(200).json({ message: "정상적으로 추가되었습니다." });
  }
  //일지 불러오기
  if (method === "GET") {
    const projectId = Number(req.query.projectid);
    //프로젝트 배열 호출
    const projects = await projectsCollection.find().toArray();

    //데이터 가공
    const project = projects.find((list) => list.projectId === projectId);

    // 연결 종료
    client.close();

    res.status(200).json(project);
  }
  //일지 수정
  if (method === "PUT") {
    const reqProject = req.body;
    projectsCollection.updateOne(
      { projectId: reqProject.projectId },
      {
        $set: {
          completedYear: Number(reqProject.year),
          projectTitle: reqProject.title,
          projectDescription: reqProject.description,
        },
      },
      (err) => {
        err ? console.log(err) : client.close();
      }
    );
    res.status(200).json({ message: "정상적으로 수정되었습니다." });
  }
}
