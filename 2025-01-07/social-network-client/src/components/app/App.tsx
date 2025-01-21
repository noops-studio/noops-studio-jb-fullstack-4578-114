// components/app/App.tsx
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routing from "../layout/routing/Routing";
import store from "../../redux/store";
import "./App.css";
import Auth from "../auth/Auth";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Auth>
          <Routing />
          </Auth>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
