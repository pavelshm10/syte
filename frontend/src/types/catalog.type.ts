export interface Catalog {
  _id?: string;
  name: string;
  vertical?: "fashion" | "home" | "general";
  primary: boolean;
  locales: string[];
  indexedAt?: Date;
}
