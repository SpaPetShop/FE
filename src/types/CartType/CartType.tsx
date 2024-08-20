import { ComboType } from "../Combo/ComboType";
import { ProductType } from "../Product/ProductType";

export type CartType = {
   listProduct:ProductType[] | [],
   listCombo:ComboType[] | []
  };