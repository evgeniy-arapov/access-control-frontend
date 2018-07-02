import React from "react";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});
const {mount} = Enzyme;

import { spy } from "sinon";

import Login from "components/Login";


describe("Unit <Login />", () => {
  it("should work and call login() with data", () => {
    const loginCallback = spy();
    const $wrapper = mount(<Login login={loginCallback}/>);
    $wrapper.length.should.be.eql(1);
    const email = "example@mail.com";
    const password = "123456";
    $wrapper.find("input[name='email']").simulate("change", {
      target: {
        value: email,
        name: "email"
      }
    });
    $wrapper.find("[name='password']").hostNodes().simulate("change", {
      target: {
        value: password,
        name: "password"
      }
    });
    $wrapper.find("button").simulate("click");
    loginCallback.calledOnce.should.be.eql(true);
    //console.log(loginCallback.getCall(0).args);
  });
});