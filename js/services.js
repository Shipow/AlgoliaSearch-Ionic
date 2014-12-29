angular.module('starter.services', [])

.factory('story', function() {
    var story = [];
    var storyService = {};
    storyService.set = function(hit) {
        story = hit;
    };
    storyService.get = function() {
        return story;
    };
    return storyService;
})

.factory('settings', function() {
    //default settings
    var defaultSettings = {
        dateRange: 'last24h',
        type: 'story',
        sort: 'byPopularity'
    };
    var settings = {};
    var settingsService = {};

    settingsService.init = function() {
        settings = defaultSettings;
        return settings;
    };
    settingsService.set = function(settings) {
        settings = settings;
    };
    settingsService.get = function() {
        return settings;
    };
    return settingsService;
})

.factory('search', function() {
    var search = {
            query: '',
            params: {}
        };
    var searchService = {};

    //dates
    var last24h = new Date();
    var pastWeek = new Date();
    var pastMonth = new Date();
    last24h = last24h.setDate(last24h.getDate() - 1) / 1000;
    pastWeek = pastWeek.setDate(pastWeek.getDate() - 7) / 1000;
    pastMonth = pastMonth.setDate(pastMonth.getDate() - 31) / 1000;

    searchService.setQuery = function(query) {
        search.query = query;
    };

    searchService.setParams = function(settings) {
        if (settings.hasOwnProperty('dateRange')){
            if (settings.dateRange === 'all'){
                search.params.numericFilters = '';
            } else if (settings.dateRange === 'last24h'){
                search.params.numericFilters = 'created_at_i>' + last24h;
            } else if (settings.dateRange === 'pastWeek'){
                search.params.numericFilters = 'created_at_i>' + pastWeek;
            } else if (settings.dateRange === 'pastMonth'){
                search.params.numericFilters = 'created_at_i>' + pastMonth;
            }
        }
        if (settings.hasOwnProperty('type')){
            if (settings.type === 'all'){
                search.params.tagFilters = '';
            } else if (settings.type === 'poll' || settings.type === 'comment' || settings.type === 'story') {
                search.params.tagFilters = settings.type;
            }
        }
        if (settings.hasOwnProperty('sort')){
            //FIXME
        }
    };

    searchService.get = function() {
        return search;
    };
    return searchService;
})

.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString * 1000).format(format);
    };
});
