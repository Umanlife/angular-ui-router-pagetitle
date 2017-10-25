(function () {

    var moduleName = 'componentA';
    var moduleDeps = [
        'ui.router.pageTitle',
        'componentB'
    ];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Modules

    angular.module(moduleName, moduleDeps)
        .config(routeConfig);

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