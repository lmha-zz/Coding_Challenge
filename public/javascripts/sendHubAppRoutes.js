sendHubApp.config(function($routeProvider) {
	$routeProvider
		.when('/',
		{
			title: 'SendHub Coding Challenge',
			controller: 'contacts'
		})
	$routeProvider.otherwise({'redirectTo': '/'});
})

sendHubApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);