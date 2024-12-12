import './App.css';
import { useRoutes } from "react-router-dom";
import Login from './Login/Login';
import RemoteSystemRegister from './RemoteSystemRegister/RemoteSystemRegister';
import TestEditScreen from './TwoButtonComponent';

const App = (): JSX.Element => {
  const routes = useRoutes(
    [
      { path: '/', element: <Login /> },
      { path: '/btn', element: <TestEditScreen/> },
      { path: '/next', element: <RemoteSystemRegister mode={'register'} /> },
    ]
  );
  return <>{routes}</>
}
export default App;