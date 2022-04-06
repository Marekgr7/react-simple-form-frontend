import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { getStoreWithState } from "./store/store";

export const renderWithContext = (element, state) => {
  const store = getStoreWithState(state);

  const utils = render(
    <Provider handleFormSubmit={() => {}} store={store}>
      {element}
    </Provider>
  );

  return { store, ...utils };
};
