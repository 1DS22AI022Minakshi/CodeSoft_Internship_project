import "./App.css";
import Calculator from "./components/Calculator";
function App() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col space-y-20 justify-center items-center bg-gray-600 " >
      <div className="text-3xl  font-serif font-bold " >CALCULATOR</div>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
