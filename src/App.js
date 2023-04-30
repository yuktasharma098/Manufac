import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
//this functio render both the charts which are present in component named LineChart and BarChart
function App() {

  return (
    <div>
      <LineChart />
      <BarChart />
    </div>
  );
}

export default App;
