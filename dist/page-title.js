(function () {

    var moduleName = 'ui.router.pageTitle';
    var moduleDeps = [
        'ui.router'
    ];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Modules

    angular.module(moduleName, moduleDeps)
        .run(pageTitleRun)
        .provider('pageTitle', pageTitleProvider);

    if (typeof module === 'object' && module) {
        module.exports = moduleName;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Run : pageTitle

    pageTitleRun.$inject = [
        '$state',
        '$rootScope',
        'pageTitle'
    ];
    function pageTitleRun($state, $rootScope, pageTitle) {
        $rootScope.$on('$stateChangeSuccess', $stateChangeSuccess);

        function $stateChangeSuccess(event, toState, toParams) {
            var sequence = pageTitle.sequence();
            for (var i = 0, l = sequence.length; i < l; i++) {
                var by = sequence[i];
                if (by == 'data' && pageTitle.byData()) {
                    var byData = 'data' in toState &&
                        'pageTitle' in toState.data &&
                        toState.data.hasOwnProperty('pageTitle');
                    if (byData) {
                        $rootScope.pageTitle = toState.data.pageTitle;
                        return;
                    }
                }
                else if (by == 'resolve' && pageTitle.byResolve()) {
                    function resolveState(state) {
                        var byResolveWoPrefix = 'resolve' in state &&
                            'pageTitle' in state.resolve &&
                            'locals' in state &&
                            'globals' in state.locals &&
                            'pageTitle' in state.locals.globals &&
                            state.locals.globals.hasOwnProperty('pageTitle');
                        var byResolveWPrefix  = 'resolve' in state &&
                            'resolvedPageTitle' in state.resolve &&
                            'locals' in state &&
                            'globals' in state.locals &&
                            'resolvedPageTitle' in state.locals.globals &&
                            state.locals.globals.hasOwnProperty('resolvedPageTitle');
                        if (byResolveWoPrefix || byResolveWPrefix) {
                            if (byResolveWoPrefix) {
                                $rootScope.pageTitle = state.locals.globals.pageTitle;
                            } else if (byResolveWPrefix) {
                                $rootScope.pageTitle = state.locals.globals.resolvedPageTitle;
                            }
                        } else if (pageTitle.resolveAncestors() && 'parent' in state) {
                            resolveState(state.parent);
                        }
                    }
                    if ('$current' in $state) {
                        resolveState($state.$current);
                    }
                }
                else if (by == 'params' && pageTitle.byParams()) {
                    var byParams = 'pageTitle' in toParams &&
                        toParams.hasOwnProperty('pageTitle');
                    if (byParams) {
                        $rootScope.pageTitle = toParams.pageTitle;
                        return;
                    }
                }
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Provider : pageTitle

    function pageTitleProvider() {
        return new PageTitle;

        function PageTitle() {
            var sequence_  = [
                'data',
                'resolve',
                'params'
            ];
            var ancestors_ = false;
            var byData_    = true;
            var byResolve_ = true;
            var byParams_  = true;

            this.$get             = $get;
            this.sequence         = sequence;
            this.resolveAncestors = resolveAncestors;
            this.byData           = byData;
            this.byResolve        = byResolve;
            this.byParams         = byParams;

            function $get() {
                return this;
            }

            /**
             * @param {String|Array} sequence
             */
            function sequence(sequence) {
                if (arguments.length >= 1) {
                    if (angular.isString(sequence)) {
                        sequence = sequence.split(/[,; ]+/);
                    }
                    if (angular.isArray(sequence)) {
                        for (var i = 0, l = sequence.length; i < l; i++) {
                            var by = sequence[i];
                            if (!/^(data|resolve|params)$/.test(by)) {
                                throw new Error('[pageTitle] Unknown detection sequence key "' + by + '"');
                            }
                        }
                        sequence_ = sequence;
                    }
                } else {
                    return sequence_;
                }
            }

            /**
             * Whether retain page title from the ancestors resolutions
             * @param {boolean} ancestorsResolved
             */
            function resolveAncestors(ancestorsResolved) {
                if (arguments.length >= 1) {
                    ancestors_ = !!ancestorsResolved;
                } else {
                    return ancestors_;
                }

            }

            function byData(detectData) {
                if (arguments.length >= 1) {
                    byData_ = !!detectData;
                } else {
                    return byData_;
                }
            }

            function byResolve(detectResolve) {
                if (arguments.length >= 1) {
                    byResolve_ = !!detectResolve;
                } else {
                    return byResolve_;
                }
            }

            function byParams(detectParams) {
                if (arguments.length >= 1) {
                    byParams_ = !!detectParams;
                } else {
                    return byParams_;
                }
            }
        }
    }

})();
