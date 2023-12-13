import { Document, WithId } from "mongodb";

export type StaticMongoDBData = WithId<Document>;

export type MongoDBData = StaticMongoDBData | null | undefined;

export type MessageData = { message: string };

export type LoginData = {
  name: string;
};
