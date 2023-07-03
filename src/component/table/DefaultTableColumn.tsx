import { ChangeEvent, useCallback, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { TableData } from "../../type";
import Textarea from "../textarea/Textarea";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";

const cx = classNames.bind(styles);

const DefaultTableColumn: Partial<ColumnDef<TableData>> = {
  cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
    const initialValue = getValue() || "";

    const [value, setValue] = useState(initialValue as string);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value);
    };

    const onBlur = useCallback(() => {
      if (value === initialValue) {
        return;
      }

      table.options.meta?.updateData(index, id, value);
    }, [id, index, table.options.meta, value, initialValue]);

    return (
      <Textarea
        className={cx("cell")}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        spellCheck={false}
      />
    );
  },
};

export default DefaultTableColumn;
