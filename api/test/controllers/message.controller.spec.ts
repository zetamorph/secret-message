import * as mocha from "mocha";
import * as chai from "chai";
import * as httpMocks from "node-mocks-http";
import { getMessage, postMessage } from "./../../src/controllers/message.controller";
import { Request, Response } from "express";

describe("Controller: Message", () => {
  
  let mockRequest: Request;
  let mockResponse: Response;
  
  before(() => {
    
  });
});