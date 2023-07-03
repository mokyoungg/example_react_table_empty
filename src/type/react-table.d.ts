import "@tanstack/react-table";
import TableCellValue from ".";

declare module "@tanstack/react-table" {
  interface TableMeta {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: TableCellValue,
    ) => void;
    firstColumnKey: string;
  }
}
