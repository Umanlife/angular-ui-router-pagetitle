(function () {

    var moduleName = 'componentC';
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
        $stateProvider.state('componentA.componentB.componentC', {
            url     : '/component-c',
            params  : {
                pageTitle : 'Component C'
            },
            views   : {
                'body@' : {
                    templateUrl : 'components/component-a/component-b/component-c/component-c.html'
                }
            }
        });
    }

})();