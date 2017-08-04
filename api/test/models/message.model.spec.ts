import * as chai from "chai";
import * as mocha from "mocha";
import { IMessage } from "./../../src/interfaces/message.interface";
import Message, { IMessageModel, ObjectId } from "./../../src/models/message.model";

const expect = chai.expect;

function makeString(length: number): string {
  /* This creates a repeating string of the specified length */
  return new Array(length + 1).join("A");
}

describe("Model: Message", () => {

  it("should be invalid if text is empty", (done) => {
    const message: IMessageModel = new Message();

    message.validate()
    .catch((err) => {
      expect(err.errors.text).to.exist;
      done();
    });
  });

  it("should be invalid if text is longer than 500 characters", (done) => {
    const longString: string = makeString(501);
    const message: IMessageModel = new Message({ text: longString });

    message.validate()
    .catch((err) => {
      expect(err.errors.text).to.exist;
      done();
    });
  });

  it("should be invalid if text is shorter than 5 characters", (done) => {
    const shortString: string = makeString(4);
    const message: IMessageModel = new Message({ text: shortString });

    message.validate()
    .catch((err) => {
      expect(err.errors.text).to.exist;
      done();
    });
  });

  it("should be invalid if sender is longer than 30 characters", (done) => {
    const longSender: string = makeString(31);
    const message: IMessageModel = new Message({ sender: longSender, text: "Hi! Meet me at sunset" });

    message.validate()
    .catch((err) => {
      expect(err.errors.sender).to.exist;
      done();
    });
  });

});