(function () {

    var moduleName = 'componentD';
    var moduleDeps = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Modules

    var module = angular.module(moduleName, moduleDeps);

    module.config(routeConfig);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Config : route

    routeConfig.$inject = [
        '$stateProvider'
    ];
    function routeConfig($stateProvider) {
        $stateProvider.state('componentA.componentB.componentC.componentD', {
            url     : '/component-d',
            views   : {
                'body@' : {
                    templateUrl : 'components/component-a/component-b/component-c/component-d/component-d.html'
                }
            },
            resolve : {
                resolvedPageTitle : resolvePageTitle
            }
        });
    }

    resolvePageTitle.$inject = [
        '$timeout',
        '$q'
    ];
    function resolvePageTitle($timeout, $q) {
        return $q(function (resolve) {
            $timeout(function () {
                resolve('Component D');
            }, 500);
        });
    }

})();