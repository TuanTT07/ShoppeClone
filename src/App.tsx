import useRouteElements from './useRouteElements';

function App() {
  const routeElement = useRouteElements();
  return <div>{routeElement}</div>;
}

export default App;
