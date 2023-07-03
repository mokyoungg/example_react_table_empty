import TableOption from "./TableOption";
import classNames from "classnames/bind";
import { flexRender } from "@tanstack/react-table";
import styles from "./Table.module.scss";
import useTable from "../../hooks/useTable";

const cx = classNames.bind(styles);

const Table = () => {
  const {
    table,
    isLastColumn,
    isLastRow,
    addRow,
    addColumn,
    removeColumn,
    removeRow,
  } = useTable();

  return (
    <div className={cx("table-container")}>
      <TableOption
        isLastColumn={isLastColumn}
        isLastRow={isLastRow}
        addColumn={addColumn}
        removeColumn={removeColumn}
        addRow={addRow}
        removeRow={removeRow}
      />

      <table className={cx("table")}>
        <tbody className={cx("table-body")}>
          {table.getCoreRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className={cx("table-td")} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
