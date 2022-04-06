import eventPickerReducer, {
  initialState as eventPickerInitialState,
  resetForm,
  changeFormValue,
  setShowErrorMessage,
} from "./eventPickerSlice";

const getModifiedEventPickerState = () => {
  const modifiedReducer = { ...eventPickerInitialState };
  modifiedReducer[form][firstName] = "testName";

  return modifiedReducer;
};

describe("eventPicker reducer", () => {
  it("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = eventPickerReducer(initialState, action);

    expect(result).toEqual(eventPickerInitialState);
  });

  it("should returns initial state after resetForm action", () => {
    const action = resetForm();
    const result = eventPickerReducer(getModifiedEventPickerState, action);

    expect(result).toEqual(eventPickerInitialState);
  });

  it("should returns reducer with new properties set after changeFormValue action", () => {
    const action = changeFormValue({
      value: "FirstName",
      field: "firstName",
      isFieldValid: true,
    });

    const result = eventPickerReducer(eventPickerInitialState, action);

    expect(result.form.firstName.value).toEqual("FirstName");
    expect(result.form.firstName.isValid).toEqual(true);
    expect(result.form.firstName.showErrorMessage).toEqual(false);
  });

  it("should allows multiple values to be received at diffrent time", () => {
    const action = changeFormValue({
      value: "FirstName",
      field: "firstName",
      isFieldValid: true,
    });

    const result = eventPickerReducer(eventPickerInitialState, action);
    expect(result.form.firstName.value).toEqual("FirstName");
    expect(result.form.firstName.isValid).toEqual(true);
    expect(result.form.firstName.showErrorMessage).toEqual(false);

    const action2 = changeFormValue({
      value: "",
      field: "lastName",
      isFieldValid: false,
    });

    const result2 = eventPickerReducer(eventPickerInitialState, action2);
    expect(result2.form.lastName.value).toEqual("");
    expect(result2.form.lastName.isValid).toEqual(false);
    expect(result2.form.lastName.showErrorMessage).toEqual(
      eventPickerInitialState.form.lastName.showErrorMessage
    );
  });

  it("should change showErrorMessage property after setShowErrorMessage action", () => {
    const action = setShowErrorMessage({
      field: "date",
      showErrorMessage: true,
    });

    const result = eventPickerReducer(eventPickerInitialState, action);
    expect(result.form.date.showErrorMessage).toBe(true);
  });
});
