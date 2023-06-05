export type SalesPerson = {
  name: string;
  email: string;
};
export type SalesPersonDirectory = SalesPerson[];

export function lookUpSalesPersonForZipcode(
  zipcode: string,
  salesPersonDirectory: SalesPersonDirectory
): SalesPerson | undefined {
  for (const salesPerson of salesPersonDirectory) {
    return { name: salesPerson.name, email: salesPerson.email };
  }
  return undefined;
}
