import { Button } from "@mui/base";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";

const cx = classNames.bind(styles);

export interface TableOptionProps {
  isLastColumn: boolean;
  isLastRow: boolean;
  addColumn: () => void;
  removeColumn: () => void;
  addRow: () => void;
  removeRow: () => void;
}

const TableOption = (props: TableOptionProps) => {
  const {
    isLastColumn,
    isLastRow,
    addColumn,
    removeColumn,
    addRow,
    removeRow,
  } = props;

  return (
    <div className={cx("option-container")}>
      <div className={cx("options")}>
        <Button onClick={addColumn}>Add Column</Button>
        <Button onClick={removeColumn} disabled={isLastColumn}>
          Remove Column
        </Button>
      </div>
      <div className={cx("options")}>
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={removeRow} disabled={isLastRow}>
          Remove Row
        </Button>
      </div>
    </div>
  );
};

export default TableOption;
