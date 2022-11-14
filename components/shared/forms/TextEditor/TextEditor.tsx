import { Loader } from "@components/shared/elements/Loader";
import dynamic from "next/dynamic";
import { DeltaStatic, Sources } from "quill";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./TextEditor.module.css";

interface Props {
  value: string;
  onChange: (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: Quill.UnprivilegedEditor
  ) => void;
  error: string;
}

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Loader />,
});

const TextEditor = ({ value, onChange, error }: Props) => {
  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
      <p className={styles["form__error"]}>{error}</p>
    </div>
  );
};

export { TextEditor };
