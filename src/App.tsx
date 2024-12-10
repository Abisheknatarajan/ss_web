import './App.css';
import { useRoutes } from "react-router-dom";
import Login from './Login/Login';
import RemoteSystemRegister from './RemoteSystemRegister/RemoteSystemRegister';
import TestEditScreen from './TwoButtonComponent';
import CreateAccount from './SystemUsage/CreateAccount/CreateAccount';
import SystemUsageList from './SystemUsage/SystemUsageList/SystemUsageList';


const App = (): JSX.Element => {
  const routes = useRoutes(
    [
      { path: '/login', element: <Login /> },
      { path: '/btn', element: <TestEditScreen /> },
      { path: '/next', element: <RemoteSystemRegister mode={'register'} /> },
      { path: '/re', element: <CreateAccount /> },
      { path: '/', element: < SystemUsageList /> },
    ]
  );
  return <>{routes}</>
}
export default App;