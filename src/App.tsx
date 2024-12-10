import './App.css';
import { useRoutes } from "react-router-dom";
import CreateAccount from './SystemUsage/CreateAccount/CreateAccount';
import SystemUsageList from './SystemUsage/SystemUsageList/SystemUsageList';


const App = (): JSX.Element => {
  const routes = useRoutes(
    [
      { path: '/re', element: <CreateAccount /> },
      { path: '/', element: < SystemUsageList /> },
    ]
  );
  return <>{routes}</>
}
export default App;