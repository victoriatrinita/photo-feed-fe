import React from "react";
import PhotosByTag from "../pages/photos-by-tag";
import Photos from "../pages/photos";
import Footer from "../layouts/footer";
import Header from "../layouts/header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Header />
      <section>
        <Switch>
          <Route exact path="/" component={Photos} />
          <Route exact path="/:tags" component={PhotosByTag} />
        </Switch>
      </section>
      <Footer />
    </Router>
  );
};

export default Routes;
