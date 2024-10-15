import { Catalog } from "../types/catalog.type";

export const makeAllOtherCatlogsNoPrimary = async (
  catalogs: Catalog[],
  values: Catalog
) => {
  catalogs.forEach((catalog) => {
    if (catalog.vertical === values.vertical && catalog._id !== values._id) {
      catalog.primary = false;
    }
  });
};
