angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope) {

  // Algolia settings
  // Hacker news credentials for demo purpose
  var algolia = {
    appID: 'UJ5WYC0L7X',
    apiKey: '8ece23f8eb07cd25d40262a1764599b1',
    index: 'Item_production'
  }
  var client =  new AlgoliaSearch(algolia.appID, algolia.apiKey);
  var index = client.initIndex(algolia.index);

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
    tagFilters: 'story'
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
    index.search(query, function(err,results){
      $scope.$apply(function(){
        $scope.results = results;
      });
    }, $scope.search.params);
  };
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