import { TableCellValue, TableColumn, TableData } from "../type";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

import DefaultTableColumn from "../component/table/DefaultTableColumn";
import { v4 as uuid } from "uuid";

const DEFAULT_TABLE_LENGTH = 4;

const useTable = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [tableColumn, setTableColumn] = useState<TableColumn[]>([]);

  const table = useReactTable({
    data: tableData,
    columns: tableColumn,
    defaultColumn: DefaultTableColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (
        rowIndex: number,
        columnId: string,
        value: TableCellValue,
      ) => {
        updateTableCell(rowIndex, columnId, value);
      },
      firstColumnKey: "",
    },
  });

  const createDefaultTable = useCallback(() => {
    const defaultColumns: TableColumn[] = Array.from(
      { length: DEFAULT_TABLE_LENGTH },
      () => ({
        accessorKey: uuid(),
      }),
    );

    const defaultRow: TableData = defaultColumns.reduce(
      (acc: TableData, cur: { accessorKey: string }) => {
        return { ...acc, [cur.accessorKey]: "" };
      },
      {},
    );

    const defaultTableData = new Array(DEFAULT_TABLE_LENGTH).fill(defaultRow);

    setTableData(defaultTableData);
    setTableColumn(defaultColumns);
  }, []);

  useEffect(() => {
    createDefaultTable();
  }, [createDefaultTable]);

  const updateTableCell = useCallback(
    (rowIndex: number, columnId: string, value: TableCellValue) => {
      const newData = tableData.map((row, idx) => {
        if (idx === rowIndex) {
          return { ...tableData[rowIndex], [columnId]: value };
        }

        return row;
      });

      setTableData(newData);
    },
    [tableData],
  );

  const addColumn = useCallback(() => {
    const newColumn = [...tableColumn, { accessorKey: uuid() }];

    setTableColumn(newColumn);
  }, [tableColumn]);

  const removeColumn = useCallback(() => {
    const lastColumnKey = tableColumn[tableColumn.length - 1].accessorKey;

    const newTableData = tableData.map((row) => {
      const newRow = { ...row };

      delete newRow[lastColumnKey];

      return newRow;
    });

    const newColumn = tableColumn.slice(0, -1);

    setTableColumn(newColumn);
    setTableData(newTableData);
  }, [tableColumn, tableData]);

  const addRow = useCallback(() => {
    const columnKeys = Object.keys(tableData[0]);
    const newRow = Object.fromEntries(
      columnKeys.map((columnKey) => [columnKey, ""]),
    );

    const newData = [...tableData, newRow];

    setTableData(newData);
  }, [tableData]);

  const removeRow = useCallback(() => {
    const newData = tableData.slice(0, -1);

    setTableData(newData);
  }, [tableData]);

  const isLastColumn = useMemo(() => tableColumn.length === 1, [tableColumn]);
  const isLastRow = useMemo(() => tableData.length === 1, [tableData]);

  return {
    table,
    isLastColumn,
    isLastRow,
    addColumn,
    addRow,
    removeColumn,
    removeRow,
  };
};

export default useTable;
