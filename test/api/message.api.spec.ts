import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";
import * as mongoose from "mongoose";
import app from "./../../src/index";
import { IMessage } from "./../../src/interfaces/message.interface";
import { Message, IMessageModel, ObjectId } from "./../../src/models/message.model";

chai.use(chaiHttp);
const expect = chai.expect;

before((done) => {
  app.on("ready", () => {
    done();
  });
});

describe("Message", () => {

  describe("GET /messages/:messageId", () => {

    let message: IMessageModel;

    beforeEach((done) => {
      Message.create({ sender: "Johannes", text: "Meet me at sunrise in our spot" })
        .then((created) => {
          message = created;
          done();
        })
        .catch((err) => {
          throw(err);
        });
    });

    it("gets a message", () => {
      chai.request(app.express)
      .get(`/messages/${message._id}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.include({ sender: message.sender, text: message.text });
      })
      .catch((err) => {
        throw err;
      });
    });

    it("deletes a message after getting it", () => {
      chai.request(app.express)
      .get(`/messages/${message._id}`)
      .then((res) => {
        Message.findById(ObjectId(message._id))
        .then((result) => {
          expect(result).to.be.null;
        })
        .catch((err) => {
          throw(err);
        });
      })
      .catch((err) => {
        throw err;
      });
    });

  });

  describe("POST /messages", () => {
    
    const messageData: IMessage = {
      sender: "Johannes", 
      text: "Meet me at sunrise in our spot"
    };

    it("posts a message", () => {
      chai.request(app.express)
      .post("/messages")
      .send(messageData)
      .then((res) => {
        Message.findById(ObjectId(res.body._id))
        .then((result) => {
          expect(result.text).to.equal(messageData.text);
        });
      })
      .catch((err) => {
        throw err;
      });
    });

  });

});
