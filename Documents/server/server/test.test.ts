

import { server } from "./app";
import request from "supertest";
// import expect from "jest";

afterAll((done) => {
  server.close();
  done();
});


describe("Get all data", () => {
  it("should get all tea", () => {
    request(server).get("/").expect("Content-Type", /json/).expect(200);
  });
});
describe("Get data by id", () => {
  it("should get a data by id", async () => {
    await request(server).get("/:id").expect("Content-Type", /json/).expect(200);
  });
});

describe("Post data", () => {
  it("should post a data",  () => {
     request(server)
      .post("/api/")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Update data", () => {
  it("Update data using the dynamically generated userId",  () => {
     request(server)
      .put("/api/id/")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Delete a data", () => {
  it("should delete a data using the dynamically generated userId",  () => {
    
    request(server)
      .delete("/api/id/")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
