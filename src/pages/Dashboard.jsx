import { useState, useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentTimeStamp, setCurrentTimeStamp] = useState({});
  const [filteredRows, setFilteredRows] = useState(mockData.results);


  const handleRowClick = (row, matchedTimeStamp) => {
    setCurrentOrder(row);
    setCurrentTimeStamp(matchedTimeStamp);
  };

  useEffect(() => {
    console.log(currentOrder);
    console.log(currentTimeStamp);
  }, [currentOrder, currentTimeStamp]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText) {
        const filteredData = mockData.results.filter((row) =>
          row["&id"].toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRows(filteredData);
      } else {
        setFilteredRows(mockData.results);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.header.returnedHits} orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            title="Selected Order Details"
            data={currentOrder.executionDetails}
          />
          <Card
            title="Selected Order Timestamps"
            data={currentTimeStamp.timestamps}
          />
        </div>
        <List
          rows={filteredRows}
          timeStamp={timestamps.results}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Dashboard;
