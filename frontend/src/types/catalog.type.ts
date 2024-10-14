export interface Catalog {
  _id?: string | null;
  name: string;
  vertical?: "fashion" | "home" | "general";
  primary: boolean;
  locales: string[];
  indexedAt?: Date;
}
