import React from "react";
import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import EventPickerForm from "./EventPickerForm";
import { renderWithContext } from "../../test-utils";

const validFormValues = {
  participantFirstName: "Martin",
  participantLastName: "Ford",
  participantEmailAddress: "sample@mail.com",
  eventDate: "04/14/2100",
};

describe("eventPicker form", () => {
  it("submit form button should be disabled at initial render", () => {
    renderWithContext(<EventPickerForm />);
    expect(getSubmitButton()).toBeDisabled();
  });

  it("handleFormSubmit is not called after user interaction when form is invalid", async () => {
    const handleFormSubmit = jest.fn((e) => e.preventDefault());

    renderWithContext(<EventPickerForm handleFormSubmit={handleFormSubmit} />);

    user.click(getSubmitButton());
    await waitFor(() => {
      expect(handleFormSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it("handleFormSubmit is called after user press submit button when form is valid", async () => {
    const handleFormSubmit = jest.fn((e) => e.preventDefault());

    renderWithContext(<EventPickerForm handleFormSubmit={handleFormSubmit} />);

    user.type(getFirstName(), validFormValues.participantFirstName);
    user.type(getLastName(), validFormValues.participantLastName);
    user.type(getEmailAddress(), validFormValues.participantEmailAddress);
    user.type(getEventDate(), validFormValues.eventDate);

    const submitButton = getSubmitButton();
    expect(submitButton).toBeEnabled();

    user.click(submitButton);
    await waitFor(() => {
      expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("show field validation messsages if fields are invalid after user interaction", async () => {
    renderWithContext(<EventPickerForm />);

    user.type(getFirstName(), "test test");
    user.tab();

    user.type(getLastName(), "test test");
    user.tab();

    user.type(getEmailAddress(), "novalidMail");
    user.tab();

    user.type(getEventDate(), "04/14/2000");
    user.tab();

    const firstNameValidationMessage = getFirstNameValidationMessage();
    const lastNameValidationMessage = getLastNameValidationMessage();
    const emailAddressValidationMessage = getEmailAddressValidationMessage();
    const eventDateValidationMessage = getEventDateValidationMessage();

    expect(firstNameValidationMessage.innerHTML.length).toBeGreaterThan(1);
    expect(lastNameValidationMessage.innerHTML.length).toBeGreaterThan(1);
    expect(emailAddressValidationMessage.innerHTML.length).toBeGreaterThan(1);
    expect(eventDateValidationMessage.innerHTML.length).toBeGreaterThan(1);
  });

  it("validates field only on focusOut(onBlur)", async () => {
    renderWithContext(<EventPickerForm />);

    user.clear(getFirstName());
    expect(getFirstNameValidationMessage()).toBeNull();
    user.tab();

    expect(getFirstNameValidationMessage().innerHTML.length).toBeGreaterThan(1);
  });

  it("changes correctly properties in eventPickerReducer", async () => {
    const { store } = renderWithContext(<EventPickerForm />);

    user.type(getFirstName(), validFormValues.participantFirstName);
    user.tab();
    user.type(getLastName(), validFormValues.participantLastName);
    user.tab();
    user.type(getEmailAddress(), validFormValues.participantEmailAddress);
    user.tab();
    user.type(getEventDate(), validFormValues.eventDate);

    const lastNameInStore = store.getState().eventPicker.form.lastName.value;
    const firstNameInStore = store.getState().eventPicker.form.firstName.value;
    const emailAddressInStore = store.getState().eventPicker.form.email.value;
    const eventDateInStore = store.getState().eventPicker.form.date.value;

    expect(firstNameInStore).toBe(validFormValues.participantFirstName);
    expect(lastNameInStore).toBe(validFormValues.participantLastName);
    expect(emailAddressInStore).toBe(validFormValues.participantEmailAddress);
    expect(eventDateInStore).toBe(
      new Date(validFormValues.eventDate).toString()
    );

    expect(getSubmitButton()).toBeEnabled();
  });
});

const getFirstNameValidationMessage = () => {
  return screen.queryByText(
    /first name should contains minimum of 1 character\. spaces are not allowed/i
  );
};

const getLastNameValidationMessage = () => {
  return screen.queryByText(
    /last name should contains minimum of 1 character. Spaces are not allowed/i
  );
};

const getEmailAddressValidationMessage = () => {
  return screen.queryByText(
    /last name should contains minimum of 1 character. Spaces are not allowed/i
  );
};

const getEventDateValidationMessage = () => {
  return screen.queryByText(/event date should be in future/i);
};

const getFirstName = () => {
  return screen.getByPlaceholderText(/please enter your first name \.\.\./i);
};

const getLastName = () => {
  return screen.getByPlaceholderText(/please enter your last name \.\.\./i);
};

const getEmailAddress = () => {
  return screen.getByPlaceholderText(
    /please enter your e-mail address \.\.\./i
  );
};

const getEventDate = () => {
  return screen.getByPlaceholderText(/choose event date \.\.\./i);
};

const getSubmitButton = () => {
  return screen.getByRole("button", {
    name: /book an event !/i,
  });
};
