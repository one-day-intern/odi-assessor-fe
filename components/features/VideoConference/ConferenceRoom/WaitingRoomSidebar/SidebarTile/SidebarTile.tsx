import React from "react";
import styles from "./SidebarTile.module.css";
import { Button } from "@components/shared/elements/Button";

interface Props {
  onAdmit: () => void;
  onReject: () => void;
  peerName: string;
}

function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor(((1 + 0.5) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
}

const SidebarTile: React.FC<Props> = ({ onAdmit, onReject, peerName }) => {
  return (
    <div className={styles.tile}>
      <div
        style={{ backgroundColor: generateLightColorHex() }}
        className={styles["peer-abbrev"]}
      >
        {peerName.substring(0, 1).toUpperCase()}
      </div>
      <p className={styles["peer-name"]}>{peerName}</p>
      <div className={styles["actions"]}>
        <Button
          onClick={onAdmit}
          variant="secondary"
          style={{
            margin: 0,
            fontSize: "0.75rem",
            padding: "6px 14px",
            fontWeight: "bold",
          }}
        >
          Admit
        </Button>
        <a onClick={onReject} className={styles["reject"]} role="button">
          decline
        </a>
      </div>
    </div>
  );
};

export default SidebarTile;
