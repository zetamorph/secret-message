import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { IMessage } from "./../interfaces/message.interface";

export const ObjectId = mongoose.Types.ObjectId;

export interface IMessageModel extends IMessage, Document {
  sender: string;
  text: string;
  timestamp: number;
}

export const messageSchema: Schema = new Schema({
  sender: String,
  text: String,
  timestamp: Number,
});

export const Message = mongoose.model<IMessageModel>("Message", messageSchema);
