export type TableCellValue = string;

export interface TableColumn {
  accessorKey: string;
}

export interface TableData {
  [key: string]: TableCellValue;
}
