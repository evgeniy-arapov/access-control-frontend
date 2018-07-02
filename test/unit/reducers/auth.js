import auth, { initialState } from "reducers/auth";
import * as AUTH from "constants/Auth";
import { jwt, user } from "test/fixtures/auth";
import { defaultHeaders } from "api/serverConfig";


describe("Unit Reducers Auth", () => {
  describe("Login", () => {
    let state;
    beforeEach(() => {
      state = {...initialState};
      localStorage.clear();
    });
    [
      AUTH.LOGIN_REQUEST,
      AUTH.LOGOUT_REQUEST,
      AUTH.REGISTER_REQUEST
    ].forEach(type => {
      it(`should set fetching to true when type:${type}`, () => {
        state = auth(state, {type});
        state.fetching.should.be.true();
      });
    });
    [
      AUTH.LOGIN_SUCCESS,
      AUTH.REGISTER_SUCCESS
    ].forEach(type => {
      it(`should return new state when type:${type}`, () => {
        state = auth(state, {type, payload: {jwt, user}});
        state.isAuthenticated.should.be.true();
        state.fetching.should.be.false();
        jwt.should.be.deepEqual(state.jwt).and.be.deepEqual(localStorage.jwt);
        user.should.be.deepEqual(state.user).and.be.deepEqual(localStorage.user);
        defaultHeaders.has("authorization").should.be.true();
      });
    });
    [
      AUTH.LOGIN_FAILURE,
      AUTH.LOGOUT_FAILURE,
      AUTH.REGISTER_FAILURE
    ].forEach(type => {
      it(`should return new state when type:${type}`, () => {
        state = auth(state, {type, payload: {jwt, user}});
        state.isAuthenticated.should.be.false();
        state.fetching.should.be.false();
        state.error.should.be.Object();
        localStorage.should.not.have.keys("jwt", "user");
      });
    });
    it(`should return new state when type: ${AUTH.LOGOUT_SUCCESS}`, () => {
      state = auth(state, {type: AUTH.LOGOUT_SUCCESS});
      state.isAuthenticated.should.be.false();
      state.fetching.should.be.false();
      localStorage.should.not.have.keys("jwt", "user");
      should(state.jwt).be.null();
      should(state.user).be.null();
      defaultHeaders.has("authorization").should.be.false();
    });

  });
});