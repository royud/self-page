import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const pw = req.query.pw;

  // 몽고db 연결
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.e2uyhpw.mongodb.net/`
  );

  //data db 접속
  const db = client.db("data");

  // admin 컬렉션 호출 or 생성
  const adminCollection = db.collection("admin");

  //프로젝트 배열 호출
  const admin = await adminCollection.findOne();

  const adminId = admin.admin;
  const adminPw = admin.password;

  // 연결 종료
  client.close();

  const success = { name: adminId };

  if (id === adminId && pw === adminPw) {
    res.status(200).json(success);
  } else {
    res.status(404).json({ message: "잘못된 접근입니다." });
  }
}
