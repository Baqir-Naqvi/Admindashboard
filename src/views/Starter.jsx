import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart.jsx";
import TopCards from "../components/dashboard/TopCards";
import { useState, useEffect } from "react";
import axios from "axios";

function Starter() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:4000/roomslist").then((res) => {
        setData(res.data);
      });
    }
    fetchData();
  }, []);
  function getTotalRoomsCapacity() {
    let totalCapacity = 0;
    data.map((item) => {
      return (totalCapacity = item.roomcapacity + totalCapacity);
    });
    return totalCapacity;
  }
  function getTotalRent() {
    let total = 0;
    data.map((item) => {
      return (total = item.roomprice + total);
    });
    return total;
  }

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Total Rooms"
            earning={data.length}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Capacity Left"
            earning={getTotalRoomsCapacity()}
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Total Rent"
            earning={getTotalRent()}
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="PaymentCollected"
            earning="16000"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl="12">
          <SalesChart />
        </Col>
      </Row>
    </div>
  );
}

export default Starter;
