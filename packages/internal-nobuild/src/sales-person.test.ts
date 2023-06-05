import { describe } from "vitest";

import {
  lookUpSalesPersonForZipcode,
  type SalesPersonDirectory,
} from "./sales-person";

describe("Dummy test", () => {
  describe("lookUpSalesPersonForZipcode", () => {
    const salesPersons: SalesPersonDirectory = [
      {
        name: "mark",
        email: "mark@anison.dev",
      },
      {
        name: "coltrane",
        email: "coltrane@anison.dev",
      },
      {
        name: "philippe",
        email: "philippe@anison.dev",
      },
      {
        name: "lance",
        email: "lance@anison.dev",
      },
      {
        name: "mark",
        email: "mark@anison.dev",
      },
      {
        name: "mike",
        email: "mike@anison.dev",
      },
    ];

    it("Should get mark", async () => {
      const commercial = lookUpSalesPersonForZipcode("97490", salesPersons);
      expect(commercial).toBeDefined;
      expect(commercial?.name).toBe("mark");
    });
    it("Should get undefined", async () => {
      const commercial = lookUpSalesPersonForZipcode("00000", salesPersons);
      expect(commercial).toBeUndefined;
    });
    it("If Zipcode begins with 08 should get coltrane", async () => {
      const commercial = lookUpSalesPersonForZipcode("08490", salesPersons);
      expect(commercial).toBeDefined;
      expect(commercial?.name).toBe("coltrane");
    });
  });
});
