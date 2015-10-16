'use strict';

import angular from 'angular';
import template from './app.html';

import './app.scss';

angular.module('app', [])
    .directive('app', () => {
        return {
            restrict: 'E',
            templateUrl: template
        }
    });