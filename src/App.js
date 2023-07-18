import "./App.css";
import { AppProvider } from "./AppContext";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;
