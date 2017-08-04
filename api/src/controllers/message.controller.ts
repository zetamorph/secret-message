import { Request, Response } from "express";
import Message, { ObjectId } from "./../models/message.model";

export async function getMessage(req: Request, res: Response) {
  const id = new ObjectId(req.params.id);
  try {
    const message = await Message.findByIdAndRemove(id);
    if (!message) {
      res
        .status(404)
        .end();
    }
    res
      .status(200)
      .send(message);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .end();
  }
}

export async function postMessage(req: Request, res: Response) {
  try {
    const created = await Message.create(req.body);
    res
      .status(201)
      .json(created);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .end();
  }
}
