(function () {

    var moduleName = 'componentB';
    var moduleDeps = [
        'componentC'
    ];

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
        $stateProvider.state('componentA.componentB', {
            url     : '/component-b',
            views   : {
                'body@' : {
                    templateUrl : 'components/component-a/component-b/component-b.html'
                }
            },
            resolve : {
                pageTitle : resolvePageTitle
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
                resolve('Component B');
            }, 500);
        });
    }

})();