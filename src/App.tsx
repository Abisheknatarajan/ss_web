import './App.css';
import { useRoutes } from "react-router-dom";
import Login from './Login/Login';
import NextScreen from './Login/NextScreen';

const App = (): JSX.Element => {
  const routes = useRoutes(
    [
      { path: '/', element: <Login /> },
      { path: '/next', element: <NextScreen /> },
    ]
  );
  return <>{routes}</>
}
export default App;