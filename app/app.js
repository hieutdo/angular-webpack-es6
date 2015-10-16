'use strict';

import angular from 'angular';
import template from './app.html';

angular.module('app', [])
    .directive('app', () => {
        return {
            restrict: 'E',
            templateUrl: template
        }
    });