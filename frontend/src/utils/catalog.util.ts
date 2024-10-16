import { Catalog } from "../types/catalog.type";

export const makeAllOtherCatlogsNoPrimary = (
  catalogs: Catalog[],
  values: Catalog
): Catalog[] => {
  return catalogs.map(catalog => {
    if (catalog.vertical === values.vertical && catalog._id !== values._id) {
      return { ...catalog, primary: false };
    }
    return catalog;
  });
};
