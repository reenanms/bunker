export enum BasicType {
  QUOTES,
  NO_QUOTES
}

export type DataTypeBasic = {
  basicType: BasicType;
  regexValidator: string;
};
