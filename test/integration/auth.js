import React from "react";
import { render } from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { Provider } from "react-redux";
import ConnectedApp from "containers/App";
import configureStore from "store/configureStore";
import { MemoryRouter } from "react-router-dom";
import { authData, user, jwt } from "test/fixtures/auth";
import { defaultHeaders } from "app/api/serverConfig";

import sinon from "sinon";
import * as authActions from "actions/AuthActions";

authActions.login = sinon.spy(authActions.login);

describe("Integration Auth", () => {
  let store;
  let stubedFetch;
  before(() => {
    stubedFetch = sinon.stub(global, "fetch");
  });
  after(() => {
    stubedFetch.restore();
  });
  beforeEach(() => {
    stubedFetch.resolves(mockApiResponse({jwt, user}));
    store = configureStore();

    let root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ConnectedApp/>
        </MemoryRouter>
      </Provider>,
      root);
  });

  it.only("should work", async () => {
    const email = document.querySelector("[name='email']");
    email.should.be.ok();
    const password = document.querySelector("[name='password']");
    password.should.be.ok();

    email.value = authData.email;
    Simulate.change(email);
    password.value = authData.password;
    Simulate.change(password);

    const btn = document.querySelector("button");
    Simulate.click(btn);
    
    console.log(document.getElementById("root").innerHTML);
  });
});

function mockApiResponse (body = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: defaultHeaders
  });
}