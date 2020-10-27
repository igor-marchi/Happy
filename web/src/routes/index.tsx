import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Lading from '../pages/Lading';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import OrphanagesMap from '../pages/OrphanagesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Lading} />
        <Route path='/orphanagesmap' component={OrphanagesMap} />

        <Route path='/orphanages/create' component={CreateOrphanage} />
        <Route path='/orphanages/:id' component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
