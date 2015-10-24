'use strict';

import angular from 'angular';

import '../styles/main.scss';
import './app.scss';
import image from '../images/thumbs-up.png';

angular
  .module('app', [])
  .directive('app', () => {
    return {
      restrict: 'E',
      template: `<h1>Hello World</h1><img src="${image}" />`
    }
  });


