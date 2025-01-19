// components/app/App.tsx
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routing from "../layout/routing/Routing";
import store from "../../redux/store";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </Provider>
    </div>
  );
}
