(function () {

    var moduleName = 'componentA';
    var moduleDeps = [
        'idappsPageTitle',
        'componentB'
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
        $stateProvider.state('componentA', {
            url   : '/component-a',
            views : {
                'body@' : {
                    templateUrl : 'components/component-a/component-a.html'
                }
            },
            data  : {
                pageTitle : 'Component A'
            }
        });
    }

})();