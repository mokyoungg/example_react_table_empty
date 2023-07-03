import { ComponentPropsWithRef, forwardRef } from "react";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import classNames from "classnames/bind";
import styles from "./Textarea.module.scss";

const cx = classNames.bind(styles);

interface TextareaProps
  extends ComponentPropsWithRef<typeof TextareaAutosize> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <TextareaAutosize
        className={cx("textarea", className)}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default Textarea;
