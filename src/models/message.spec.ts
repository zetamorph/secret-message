import { expect } from "chai";
import { Message } from "./message";

describe("Message", () => {

  let message: Message;
  let currentTimestamp: number = Date.now();

  describe("message.sender", () => {

    it("has the specified sender", () => {
      message = new Message("Meet me at 4 o clock", currentTimestamp, "John");

      expect(message).to.haveOwnProperty("sender");
      expect(message.sender).to.equal("John");
    });

    it("is anonymous when no sender is specified", () => {
      message = new Message("Meet me at 4 o clock", currentTimestamp);

      expect(message).to.haveOwnProperty("sender");
      expect(message.sender).to.equal("Anonymous");
    });

  });

  it("has a text", () => {
    message = new Message("Meet me at 4 o clock", currentTimestamp, "John");

    expect(message).to.haveOwnProperty("text");
    expect(message.text).to.equal("Meet me at 4 o clock");
  });

  describe("message.timestamp", () => {

    it("has the specified timestamp", () => {
      message = new Message("Meet me at 4 o clock", currentTimestamp);

      expect(message).to.haveOwnProperty("timestamp");
      expect(message.timestamp).to.equal(currentTimestamp);
    });

    it("has the current timestamp when none is specified", () => {
      message = new Message("Meet me at 4 o clock");

      expect(message).to.haveOwnProperty("timestamp");
      expect(message.timestamp).to.equal(Date.now());
    });
  })

});
