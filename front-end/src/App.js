import "./App.css";
import { BrowserRouter, Routes ,Route } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./components/LogIn";

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginForm/>} />
        </Routes>
      </div>
      </BrowserRouter>
        );
}

        export default App;
