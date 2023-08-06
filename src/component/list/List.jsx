import React from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows, timeStamp, onRowClick }) => {
  // console.log(rows);
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const matchedTimeStamp = timeStamp.find(
            (data) => data["&id"] === row["&id"]
          );
          return (
            <ListRow
              key={row["&id"] + index}
              onClick={() => onRowClick(row, matchedTimeStamp)}
            >
              <ListRowCell>{row["&id"]}</ListRowCell>
              <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
              <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
              <ListRowCell>
                {matchedTimeStamp && matchedTimeStamp.timestamps.orderSubmitted}
              </ListRowCell>
              <ListRowCell>{row.bestExecutionData.orderVolume.USD}</ListRowCell>
            </ListRow>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
