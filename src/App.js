import { Head } from "../src/components/Head"
import './App.css';
import { Body } from "./components/Body";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="px-28 bg-slate-200 font-mono">
      <Head  />
      <Body />
      <ToastContainer   position="top-center" />

    </div>
  );
}

export default App;
