import React from "react";
import styles from "./Card.module.css";

const Card = ({ data, title }) => {
  if (!data) return null;

  return (
    <div className={styles.container}>
      {data && (
        <>
          <div className={styles.title}>{title}</div>
          {Object.entries(data).map(([k, v]) => (
            <div className={styles.cell} key={k}>
              <div className={styles.key}>{k}</div>
              <div className={styles.value}>{v}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Card;
