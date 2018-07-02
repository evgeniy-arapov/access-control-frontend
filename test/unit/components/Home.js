import React from "react";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});
const {shallow} = Enzyme;

import Home from "components/Home";

describe("Unit <Home />", () => {
  it("should work", () => {
    const $wrapper = shallow(<Home/>); // eslint-disable-line
    $wrapper.length.should.be.eql(1);
    $wrapper.find(".welcome").length.should.be.eql(1);
  });
});