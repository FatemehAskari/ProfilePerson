import './App.css';
import Login from './Component/Login/login';
import { Route, Switch } from "react-router-dom";
import Profile from './Component/Profile/Prrofile';
function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
}

export default App;
