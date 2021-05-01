import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import ScrollToTop from './ScrollToTop';
import LandingPg from './components/Landing/LandingPg';
import SearchResults from './components/SearchResults/SearchResults';
import './App.scss';
const App = () => {
  return (
    <div>
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={LandingPg} />
            <Route path="/results/:id" exact component={SearchResults} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
};

export default App;
