import { renderHook, act } from "@testing-library/react-hooks";
import Toast from "react-native-toast-message";
import { useHeaderHeight } from "@react-navigation/elements";

import { useToastNotification } from "@hooks/useToastNotification";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock("@react-navigation/elements", () => ({
  useHeaderHeight: jest.fn(),
}));

describe("TEST: useToastNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useHeaderHeight as jest.Mock).mockReturnValue(50);
  });

  it("Should display notification correctly", () => {
    const { result } = renderHook(() => useToastNotification());

    act(() => {
      result.current.showNotification("Test message", "success");
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Test message",
      topOffset: 66,
      onPress: expect.any(Function),
    });
  });

  it("Should works with error message", () => {
    const { result } = renderHook(() => useToastNotification());

    act(() => {
      result.current.showNotification("Error message!", "error");
    });

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        text1: "Error message!",
      })
    );
  });

  it("Should hide notification onPress", () => {
    const { result } = renderHook(() => useToastNotification());

    let onPressHandler: () => void = () => {};
    (Toast.show as jest.Mock).mockImplementation((params) => {
      onPressHandler = params.onPress;
    });

    act(() => {
      result.current.showNotification("Test message", "success");
    });

    act(() => {
      onPressHandler();
    });

    expect(Toast.hide).toHaveBeenCalledTimes(1);
  });

  it("Should use current header height", () => {
    (useHeaderHeight as jest.Mock).mockReturnValue(100);
    const { result } = renderHook(() => useToastNotification());

    act(() => {
      result.current.showNotification("Test message", "success");
    });

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        topOffset: 116,
      })
    );
  });
});
