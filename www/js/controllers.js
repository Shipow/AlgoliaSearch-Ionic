angular.module('starter.controllers', ['algoliasearch'])

.controller('SearchCtrl', function($scope, algolia, story) {

  // Algolia settings
  // Hacker news credentials for demo purpose
  var algoliaConfig = {
    appID: 'UJ5WYC0L7X',
    apiKey: '8ece23f8eb07cd25d40262a1764599b1',
    index: 'Item_production'
  }
  var client = algolia.Client(algoliaConfig.appID, algoliaConfig.apiKey);
  index = client.initIndex(algoliaConfig.index);

  // Search
  $scope.search = {};
  $scope.search.params = {
    // queryType
    // typoTolerance
    // minWordSizefor1Typo
    // minWordSizefor2Typos
    // allowTyposOnNumericTokens
    // ignorePlurals
    // restrictSearchableAttributes
    // advancedSyntax
    // analytics
    // analyticsTags
    // synonyms
    // replaceSynonymsInHighlight
    // optionalWords
    // removeWordsIfNoResults
    // page
    // hitsPerPage
    // attributesToRetrieve
    // attributesToHighlight
    // attributesToSnippet
    // getRankingInfo
    // numericFilters
    tagFilters: 'story',
    // distinct
    // facets
    // facetFilters
    // maxValuesPerFacet
    // aroundLatLng
    // aroundLatLngViaIP
    // aroundRadius
    // aroundPrecision
    // insideBoundingBox
  };

  $scope.results = [];

  //Search scope
  $scope.getSearch = function(query) {
    index.search(query, undefined, $scope.search.params).then(
      function(results) {
        $scope.results = results;
      }
    );
  };

  $scope.openNews = function(hit) {
    story.set(hit);
    window.open('#/tab/news', '_self');
  };

})

.controller('SettingsCtrl', function($scope, algolia) {

})

.controller('ViewCtrl', function($scope, $http, $ionicLoading, story) {
  $scope.story = story.get();
  $ionicLoading.show({
    template: 'Loading...'
  });
  $http.get('http://hn.algolia.com/api/v1/items/' + $scope.story.objectID).
  success(function(data) {
    $scope.story.full = data ;
    $ionicLoading.hide();
  });
})

.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
})

.directive('ionSearch', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      getData: '&source',
      model: '=?'
    },
    link: function(scope, element, attrs) {
      attrs.minLength = attrs.minLength || 0;
      scope.placeholder = attrs.placeholder || '';
      scope.search = {query: ''};

      if (attrs.class)
        element.addClass(attrs.class);

      scope.$watch('search.query', function (newValue, oldValue) {
        scope.getData({query: newValue});
      });

      scope.clearSearch = function() {
        scope.search.query = '';
      };

    },
    template: '<div class="item-input-wrapper">' +
                '<i class="icon ion-android-search"></i>' +
                '<input type="search" placeholder="{{placeholder}}" ng-model="search.query">' +
                '<i ng-if="search.query.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
              '</div>'
  };
});