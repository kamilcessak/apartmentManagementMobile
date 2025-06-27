import React from "react";
import { Text, Button } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { AppProvider, useAppContext } from "@contexts/AppContext";

const TestComponent = () => {
  const { user, setUser } = useAppContext();
  return (
    <>
      <Text testID="userID">{user ? user._id : "No user"}</Text>
      <Button
        testID="setUserID"
        title="Set User"
        onPress={() =>
          setUser({
            email: "test@test.test",
            isEmailVerified: false,
            phoneNumber: "123456789",
            role: "Landlord",
            _id: "1",
            apartments: [{ isAvailable: false }],
          })
        }
      />
    </>
  );
};

describe("TEST: AppContext", () => {
  test("AppProvider provides context", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId("userID")).toHaveTextContent("No user");
  });

  test("useAppContext updates state", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.press(screen.getByTestId("setUserID"));

    expect(screen.getByTestId("userID")).toHaveTextContent("1");
  });

  test("useAppContext throws error outside provider", () => {
    const InvalidComponent = () => {
      useAppContext();
      return null;
    };

    expect(() => render(<InvalidComponent />)).toThrow(
      "useAppContext must be used within AppProvider"
    );
  });
});
