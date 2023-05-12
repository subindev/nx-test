import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import RealtimeContextProvider from "./realtime-context";
// import SignalRComponent from './components/signalr-component';
// import SignalRComponent from './components/signalr-component';

function App() {
  return (
    <>
      <RealtimeContextProvider>
        <Dashboard />
      </RealtimeContextProvider>
    </>
  );
}

export default App;
