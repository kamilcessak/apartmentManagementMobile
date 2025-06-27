import { getRandomRgbaColor } from "@utils/generateRandomColor";

jest.mock("expo", () => ({}));

describe("TEST getRandomRgbaColor", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("Should return valid rgba color string", () => {
    const color = getRandomRgbaColor();
    expect(color).toBe("rgba(128, 128, 128, 0.25)");
  });
});
