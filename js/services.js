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

.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString * 1000).format(format);
    };
});
