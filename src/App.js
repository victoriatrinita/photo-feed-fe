import "./App.css";
import Routes from "./layouts/routes";
import { PhotoProvider } from "./context/PhotoContext";

function App() {
  return (
    <PhotoProvider>
      <Routes />
    </PhotoProvider>
  );
}

export default App;
