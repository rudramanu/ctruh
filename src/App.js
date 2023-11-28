import { BrowserRouter as Router } from "react-router-dom";
import Allroutes from "./Allroutes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Allroutes />
      </Router>
    </div>
  );
}

export default App;
