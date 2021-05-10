import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import ScrollToTop from './ScrollToTop';

import LandingPg from './components/landing/LandingPg';
import SearchResults from './components/searchResults/SearchResults';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import ProductInfo from './components/ProductInfo/ProductInfo.jsx'

import './App.scss';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={LandingPg} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/results/:id" exact component={SearchResults} />
            <Route path="/productInfo/:id" exact component={ProductInfo} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
};

export default App;
