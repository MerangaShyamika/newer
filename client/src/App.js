import './App.css'
import Location from "./page/Location.js";
import { Routes, Route } from "react-router-dom";
import LocationList from "./page/LocationList.js";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Location />} />
          <Route path="/location-list" element={<LocationList />} />
      </Routes>
  )
}

export default App 