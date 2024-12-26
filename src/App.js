import { ToastContainer } from "material-react-toastify";
import "./App.css";
import { SearchBar } from "./Component/SearchBar";

function App() {
  return (
    <div>
      <SearchBar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
