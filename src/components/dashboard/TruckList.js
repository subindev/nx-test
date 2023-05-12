import React, { useContext, useEffect, useState } from "react";
import "./truck-list.css";
import { RealtimeContext } from "../../realtime-context";

const TruckList = () => {
  const { data } = useContext(RealtimeContext);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };

  const [truckData, setTruckData] = useState([
    {
      id: "Simulator",
      label1: "Truck #1",
      value1: "Driver A",
      label2: "Last Seen",
      value2: "10 mins ago",
      label3: "Temperature",
      temperature: "25",
      label4: "Humidity",
      humidity: "70%",
    },
    {
      id: "2",
      label1: "Truck #2",
      value1: "Driver B",
      label2: "Last Seen",
      value2: "1 hour ago",
      label3: "Temperature",
      temperature: "23",
      label4: "Humidity",
      humidity: "65%",
    },
    {
      id: "3",
      label1: "Truck #3",
      value1: "Driver C",
      label2: "Last Seen",
      value2: "2 hours ago",
      label3: "Temperature",
      temperature: "24",
      label4: "Humidity",
      humidity: "68%",
    },
    // more data...
  ]);

  useEffect(() => {
    console.log("TRUCKLIST :", data);
    // Update the temperature value in the truck data array.
    const updatedTrucks = truckData.map((truck) =>
      truck.id === data.deviceId
        ? { ...truck, temperature: data.temperature.toFixed(2) }
        : truck
    );

    // Render the UI with the new temperature value.
    setTruckData(updatedTrucks);
  }, [data]);

  return (
    <div className="truck-list-container">
      <h2>Truck List</h2>
      <div className="truck-list">
        {truckData.map((item) => (
          <div
            key={item.id}
            className={`truck-item ${
              item.id === selectedItemId ? "selected" : ""
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className="row">
              <div className="label">{item.label1}</div>
              <div className="value">{item.value1}</div>
            </div>
            <div className="row">
              <div className="label">{item.label2}</div>
              <div className="value">{item.value2}</div>
            </div>
            <div className="row">
              <div className="label">{item.label3}</div>
              <div className="value">{item.temperature}°C</div>
            </div>
            <div className="row">
              <div className="label">{item.label4}</div>
              <div className="value">{item.humidity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckList;
