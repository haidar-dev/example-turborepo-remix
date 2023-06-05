import { describe, expect, it } from "vitest";

import {
  lookUpSalesPersonForZipcode,
  type SalesPersonDirectory,
} from "@remix-turborepo/internal-nobuild";

describe("Example test.", () => {
  it("It should pass successfully.", () => {
    const hasPassed = true;
    expect(hasPassed).toBeTruthy();
  });
});

describe("Testing internal package.", () => {
  const salesPersons: SalesPersonDirectory = [
    {
      name: "mark",
      email: "mark@anison.dev",
    },
    {
      name: "mark",
      email: "mark@anison.dev",
    },
  ];

  it("Should get mark", async () => {
    const commercial = lookUpSalesPersonForZipcode("97490", salesPersons);
    expect(commercial).toBeDefined();
    expect(commercial?.name).toBe("mark");
  });
});
