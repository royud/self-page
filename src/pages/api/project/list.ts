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
  const reducedProjects = projects.reduce((acc, cur) => {
    //프로젝트 요소 가공 및 completedYear 추출
    const { projectDescription, completedYear, ...filteredData } = cur;

    const urlRegex = /(https?:\/\/[^ ]*)/;
    const thumnail = projectDescription.match(urlRegex);

    const newData = {
      ...filteredData,
      thumnail: thumnail ? thumnail[1] : undefined,
    };

    // 새로운 데이터에 completedYear가 key로 있을 경우 그 value인 배열에 담고
    // 없을 경우 새롭게 배열로 추가
    if (acc[completedYear]) {
      acc[completedYear].push(newData);
    } else {
      acc[completedYear] = [newData];
    }

    return acc;
  }, {});

  //객체 형식의 데이터를 배열로 전환 및 원하는 형태로 가공
  const processedData = Object.keys(reducedProjects).map((key) => ({
    year: key,
    projects: reducedProjects[key],
  }));

  // 연결 종료
  client.close();

  res.status(200).json(processedData);
}
