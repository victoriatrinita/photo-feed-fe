import React from "react";
import { cleanup } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { PhotoContext, usePhotoContext } from "../../context/PhotoContext";
import * as PhotosContextModule from "../../context/PhotoContext";

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  cleanup();
});

export const PhotoComponent = () => {
  const { photo } = usePhotoContext();
  return <div data-test="photo-component">{photo}</div>;
};

it("photoContext renders the correct text", () => {
  jest.spyOn(PhotosContextModule, "usePhotoContext").mockImplementation(() => ({
    photo: "photo",
  }));

  const wrapper = shallow(
    <PhotoContext.Provider>
      <PhotoComponent />
    </PhotoContext.Provider>
  ).dive();
  expect(wrapper.text()).toEqual("photo");
});
