import React, { createContext, useState } from 'react';

export const RealtimeContext = createContext();

const RealtimeContextProvider = (props) => {
  const [alarm, setAlarm] = useState(null);
  const [data, setData] = useState([]);

  return (
    <RealtimeContext.Provider value={{ alarm, setAlarm, data, setData }}>
      {props.children}
    </RealtimeContext.Provider>
  );
};

export default RealtimeContextProvider;
