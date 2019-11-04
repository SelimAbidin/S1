import { GameModel } from "./GameModel";

describe("GameModel tests", () => {
  let model: GameModel;
  beforeEach(() => {
    model = new GameModel();
  });

  it("Model has to have 3 life when created", () => {
    expect(model.getLife()).toBe(3);
  });

  it("Model should have 120 seconds remain time", () => {
    expect(model.getRemainTime()).toBe(2 * 60);
  });

  it("Model should have 0 high score", () => {
    expect(model.getHigestScore()).toBe(0);
  });

  it("Model should have 0 score", () => {
    expect(model.getScore()).toBe(0);
  });

  it("Model should be capable of keeping highscore", () => {
    document.cookie = "1000";
    let model = new GameModel();
    expect(model.getScore()).toBe(0);
    expect(model.getHigestScore()).toBe(1000);
    document.cookie = "";
  });

  it("Model should have 2 life after remove", () => {
    model.removeLife();
    expect(model.getLife()).toBe(2);
  });
});
