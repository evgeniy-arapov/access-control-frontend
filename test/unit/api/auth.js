import { login, logout, register } from "app/api/auth";
import { defaultHeaders } from "app/api/serverConfig";
import sinon from "sinon";
import { user, jwt, authData } from "test/fixtures/auth";

const stubedFetch = sinon.stub(global, "fetch");

describe("API", () => {
  beforeEach(async () => {
    stubedFetch.resolves(mockApiResponse({jwt, user}));
  });
  describe("register", () => {
    it("should register new user", async () => {
      const response = await register(authData);
      response.status.should.be.eql(200);
      const userData = await response.json();
      userData.should.deepEqual({jwt, user});
    });
  });
  describe("login", () => {
    it("should have success", async () => {
      const response = await login(authData);
      response.status.should.be.eql(200);
      const userData = await response.json();
      userData.should.deepEqual({jwt, user});
    });
  });
  describe("logout", () => {
    before(async () => {
      localStorage.jwt = jwt;
      defaultHeaders.append("Authorization", `Bearer ${jwt}`);
    });
    it("should logout", async () => {
      const response = await logout();
      response.status.should.be.eql(200);
    });
  });
});

function mockApiResponse (body = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: defaultHeaders
  });
}