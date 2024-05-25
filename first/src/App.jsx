import {Routes, Route}from "react-router-dom"

import Admin from "./page/admin"
import Verify from "./page/verify"

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>

    <Routes>
     <Route path="/" Component={Admin} />
     <Route path="/verify" Component={Verify} />

    </Routes>
    </div>
  );
}
export default App