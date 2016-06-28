'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();
require("babel-register")({
  extensions: [".es6", ".es", ".jsx", ".js"]
});

import React from 'react';
import AppContainer from '../clients_source/container/mainContainer';
import { renderToString } from 'react-dom/server';
import configureStore from '../clients_source/store/';
import rootReducer from '../clients_source/reducers/';
import { Provider } from 'react-redux';
import renderFullPage from './helpers/renderFullPage';

import { createMemoryHistory, useQueries } from 'history';
import {
  match, RouterContext, Router, useRouterHistory
} from 'react-router';
import createRoutes from '../clients_source/routes';

/* GET home page. */
router.get('/*+/', function(req, res, next) {
  let history = useRouterHistory(useQueries(createMemoryHistory))();
  const store = configureStore();

  let routes = createRoutes(history);
  let location = history.createLocation(req.url);
  console.log('\n\n\n');
  console.log(routes);
  console.log('\n\n\n');
  console.log(location);
  console.log('\n\n\n');

  match({ routes, location, history }, (error, redirectLocation, renderProps) => {
    console.log('something');
    console.log(error, redirectLocation, renderProps);
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      // res.send(404, 'Not found')
    } else {
      let reduxState = encodeURI(JSON.stringify(store.getState()));
      let html = renderToString(
        <Provider store={store}>
          { <RouterContext {...renderProps}/> }
        </Provider>
      );
      res.send(renderFullPage(html, reduxState));
    }
  })

  console.log('\n\n\n');
  console.log('mathing in /')
  // let pathToIndex = path.resolve(__dirname, '../public/index.html');
  // res.sendFile(pathToIndex);
});

module.exports = router;
