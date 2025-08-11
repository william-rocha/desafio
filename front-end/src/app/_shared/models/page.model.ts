export type Page<T, K extends string = 'items'> = {
  [P in K]: T[];
} & {
  totalElements: number;
  totalPages: number;
};
