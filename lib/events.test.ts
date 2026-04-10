import { describe, expect, test } from "vitest";
import { EVENTS, ROUTES } from "./events";

describe("EVENTS integrity", () => {
  const routeValues = Object.values(ROUTES);

  test("every event has a non-empty id", () => {
    const allHaveIds = Object.values(EVENTS).every(
      (e) => typeof e.id === "string" && e.id.trim().length > 0
    );

    expect(allHaveIds).toBe(true);
  });

  test("every event has a non-empty href", () => {
    const allHaveHrefs = Object.values(EVENTS).every(
      (e) => typeof e.href === "string" && e.href.trim().length > 0
    );

    expect(allHaveHrefs).toBe(true);
  });

  test("every event href matches a valid ROUTES value", () => {
    const allHrefsValid = Object.values(EVENTS).every((e) =>
      routeValues.includes(e.href)
    );

    expect(allHrefsValid).toBe(true);
  });

  test("EVENT keys match their id fields (stability check)", () => {
    const allIdsMatchKeys = Object.entries(EVENTS).every(
      ([key, value]) => value.id === key
    );

    expect(allIdsMatchKeys).toBe(true);
  });
});
