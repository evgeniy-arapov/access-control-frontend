import React from "react";
import { Provider } from "react-redux";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});
const {mount} = Enzyme;

//import { spy } from "sinon";

import configureStore from "redux-mock-store";

import ConnectedApp, { App } from "containers/App";
import { MemoryRouter } from "react-router-dom";

import { initialState as auth } from "reducers/auth";

import Home from "components/Home";
import Login from "components/Login";


describe("Unit <App />", () => {
  describe("Оборачиваем умный компонент в Provider", () => {
    const initialState = {
      auth
    };
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(<Provider store={store}><MemoryRouter><ConnectedApp/></MemoryRouter></Provider>);
    });
    it("render the connected(SMART) component", () => {
      wrapper.find(ConnectedApp).length.should.be.eql(1);
    });
    it("check Prop matches with initialState", () => {
      wrapper.find(App).prop("isAuthenticated").should.be.eql(initialState.auth.isAuthenticated);
    });
    it("should render <Login /> since isAuthenticated === false ", () => {
      wrapper.find(Login).length.should.be.eql(1);
      wrapper.find(Home).length.should.be.eql(0);
    });
    it("should render <Home /> since isAuthenticated === true", () => {
      store = mockStore({auth: {isAuthenticated: true}});
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <ConnectedApp/>
          </MemoryRouter>
        </Provider>);
      console.log(wrapper.html());
      wrapper.find(Home).length.should.be.eql(1);
      wrapper.find(Login).length.should.be.eql(0);
    });
  });
});