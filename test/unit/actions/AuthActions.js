import { login, logout, register } from "actions/AuthActions";
import * as AUTH from "constants/Auth";
import { authData } from "test/fixtures/auth";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import { jwt, user } from "test/fixtures/auth";
import { defaultHeaders } from "api/serverConfig";

const mockStore = configureMockStore([thunk]);

describe("Unit Actions Auth", () => {
  let stubedFetch;
  before(() => {
    stubedFetch = sinon.stub(global, "fetch");
  });
  after(() => {
    stubedFetch.restore();
  });
  [
    {
      type: "LOGIN",
      action: login
    },
    {
      type: "REGISTER",
      action: register
    },
    {
      type: "LOGOUT",
      action: logout
    }
  ].forEach(item => {
    describe(`${item.type}`, () => {
      context(`${item.type} success`, () => {
        beforeEach(() => {
          stubedFetch.resolves(mockApiResponse({jwt, user}));
        });
        it(`should work when ${item.type} success`, async () => {
          const store = mockStore();
          await store.dispatch(item.action(authData));
          store.getActions().length.should.be.eql(2);
          store.getActions()[0].should.containDeepOrdered({type: AUTH[`${item.type}_REQUEST`]});
          store.getActions()[1].should.containDeepOrdered({type: AUTH[`${item.type}_SUCCESS`]});
        });
      });
      context(`${item.type} failure`, () => {
        beforeEach(() => {
          stubedFetch.rejects(mockApiResponse({}, 403));
        });
        it(`should work when ${item.type} failure`, async () => {
          const store = mockStore();
          await store.dispatch(item.action(authData));
          store.getActions().length.should.be.eql(2);
          store.getActions()[0].should.containDeepOrdered({type: AUTH[`${item.type}_REQUEST`]});
          store.getActions()[1].should.containDeepOrdered({type: AUTH[`${item.type}_FAILURE`]});
        });
      });
    });
  });
});

function mockApiResponse (body = {}, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: defaultHeaders
  });
}