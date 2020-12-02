import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
import Home from "./components/Home";
import Review from "./components/Review";
import Cetegory from "./components/Cetegory";
import Contact from "./components/Contact";
import Login from './components/Login';
import Register from './components/Register';
import Detail from './components/detail';
import Header from "./header";
import Search from "./components/Search";
import inforUser from "./components/inforUser";
import Logout from "./components/Logout";
import inforAdmin from './components/infoAdmin';
import writeReview from './components/writeReview';
import error from './components/Error';
import { Provider } from 'react-redux';



let AppComponent = () => {
  return (
    <Fragment>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/all-Review" component={Review} />
            <Route path="/cetegory" component={Cetegory} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/writeComment/:namee" component={writeReview} />
            <Route path="/user/:id" component={inforUser} />
            <Route path="/Admin/:id" component={inforAdmin} />
            <Route path="/search" component={Search} />
            <Route component={error}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

const App = ({ store }) => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)

export default App;

