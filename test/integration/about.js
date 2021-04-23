import React from "react";
import { Provider } from "react-redux";
import ConnectedApp, { App } from "containers/App";
//import Login from "components/Login";
import About from "components/About";
import configureStore from "store/configureStore";

import { MemoryRouter } from "react-router-dom";

//import { authData } from "test/fixtures/auth";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});
const {mount} = Enzyme;

describe("Integration About", () => {
  //const initialState = {
  //  auth
  //};
  let store, wrapper;

  beforeEach(() => {
    store = configureStore({
      auth: {
        isAuthenticated: true
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/about"]}>
          <ConnectedApp/>
        </MemoryRouter>
      </Provider>);
  });

  it("should work", () => {
    //wrapper.find("input").hostNodes().length.should.be.eql(2);
    wrapper.find(About).length.should.be.eql(1);
  });
});