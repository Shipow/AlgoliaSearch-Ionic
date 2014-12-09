Algolia Search API Client for JavaScript
==================



[Algolia Search](http://www.algolia.com) is a search API that provides hosted full-text, numerical and faceted search.
Algolia’s Search API makes it easy to deliver a great search experience in your apps & websites providing:

 * REST and JSON-based API
 * search among infinite attributes from a single searchbox
 * instant-search after each keystroke
 * relevance & popularity combination
 * typo-tolerance in any language
 * faceting
 * 99.99% SLA
 * first-class data security


This Javascript client let you easily use the [Algolia Search API](http://www.algolia.com) in a browser, it is compatible with major browsers:

 * Internet Explorer &ge; 6
 * Firefox &ge; 3.0
 * Google Chrome &ge; 3
 * Safari &ge; 4
 * Opera &ge; 10
 * etc.

The JavaScript client is using CORS ([Cross Origin Resource Sharing](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support)) on recent browsers and has a fallback on JSONP ([JSON with padding](http://en.wikipedia.org/wiki/JSONP)) for old browsers.

[![Build Status](https://travis-ci.org/algolia/algoliasearch-client-js.png?branch=master)](https://travis-ci.org/algolia/algoliasearch-client-js) [![NPM version](https://badge.fury.io/js/algoliasearch.png)](http://badge.fury.io/js/algoliasearch) [![Bower](https://badge.fury.io/bo/algoliasearch.png)](http://badge.fury.io/bo/algoliasearch)



Table of Content
================
**Get started**

1. [Setup](#setup)
1. [Quick Start](#quick-start)
1. [General Principle](#general-principle)
1. [Cache](#cache)
1. [Online documentation](#documentation)
1. [Tutorials](#tutorials)

**Commands reference**


1. [Search](#search)
1. [Multi-queries](#multi-queries)
1. [Security](#security)




Setup
-------------
To setup your project, follow these steps:




### Download Algoliasearch with `bower`:

[Bower](http://bower.io/) works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for.

```sh
$ bower install algoliasearch
```

### Download Algoliasearch with the `jsDelivr` CDN:

[jsDelivr](https://hacks.mozilla.org/2014/03/jsdelivr-the-advanced-open-source-public-cdn/) can offer a performance benefit by hosting `algoliasearch` on servers spread across the globe. This also offers an advantage that if the visitor to your webpage has already downloaded a copy of `algoliasearch` from jsDelivr, it won't have to be re-downloaded.

```javascript
  <script src="//cdn.jsdelivr.net/algoliasearch/{VERSION}/algoliasearch.min.js"></script>
```

or

```javascript
  <script src="//cdn.jsdelivr.net/algoliasearch/latest/algoliasearch.min.js"></script>
```

### Download Algoliasearch from `Github`:

Download the [client](https://github.com/algolia/algoliasearch-client-js/archive/master.zip) from Github's archive.

### Setup 

 1. Add an include of `algoliasearch.min.js`
 2. Initialize the client with your ApplicationID and API-Key. You can find all of them on [your Algolia account](http://www.algolia.com/users/edit).
 3. When you use this API client for search on a website, we strongly recommand to use a key with an ACL restricted to "search". You can retrieve one with `client.addUserKey(["search"])`.

```javascript
  <script src="algoliasearch.min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key');
    ...
```







Quick Start
-------------

First, index some data. For example, you can use the command line client [quick start](https://github.com/algolia/algoliasearch-client-cmd#quick-start) to index the 500 contacts sample.

You can then update the ```example/autocomplete.html``` file with your ```ApplicationID```, ```API-Key``` and ```index name``` to test the autocomplete feature.

You can also update the ```example/instantsearch.html``` file with your ```ApplicationID```, ```API-Key``` and ```index name``` to test an instant-search example.



General Principle
-------------

All API calls will return the result in a callback that takes two arguments:

 1. **success**: a boolean that is set to false when an error was found.
 2. **content**: the object containing the answer (if an error was found, you can retrieve the error message in `content.message`)




Cache
-------------

Queries will be stored in a ```cache``` inside your JavaScript ```Index``` object to avoid performing the same API calls twice. It's particularly useful when your users are deleting letters/words from the current query but may end in some outdated results if the page isn't refreshed for some time.

Just clear the cache every X minutes to work-around 
```js
// clear the queries cache
index.clearCache();

// if you're performing multi-queries using the API client instead of the index
// you'll need to use the following code
algoliaClient.clearCache();
```


Documentation
================

Check our [online documentation](http://www.algolia.com/doc/):
 * [Initial Import](http://www.algolia.com/doc/#InitialImport)
 * [Ranking &amp; Relevance](http://www.algolia.com/doc/#RankingRelevance)
 * [Indexing](http://www.algolia.com/doc/#Indexing)
 * [Search](http://www.algolia.com/doc/#Search)
 * [Sorting](http://www.algolia.com/doc/#Sorting)
 * [Filtering](http://www.algolia.com/doc/#Filtering)
 * [Faceting](http://www.algolia.com/doc/#Faceting)
 * [Geo-Search](http://www.algolia.com/doc/#Geo-Search)
 * [Security](http://www.algolia.com/doc/#Security)
 * [REST API](http://www.algolia.com/doc/rest)


Tutorials
================

Check our [tutorials](http://www.algolia.com/doc/tutorials):
 * [Searchbar with auto-completion](http://www.algolia.com/doc/tutorials/auto-complete)
 * [Searchbar with multi-categories auto-completion](http://www.algolia.com/doc/tutorials/multi-auto-complete)
 * [Instant-search](http://www.algolia.com/doc/tutorials/instant-search)



Commands reference
==================


Update the index
-------------

The JavaScript client is dedicated to web apps searching directly from the browser. In some use-cases, it can however be interesting to perform updates to the index directly in JavaScript, for example in an HTML5 mobile app. Therefore, just as for other languages, the JavaScript client is able to add, update or delete objects, or to modify index settings.

For more details about updating an index from JavaScript, have a look at the [algoliasearch.js](https://github.com/algolia/algoliasearch-client-js/blob/master/src/algoliasearch.js) source file to see details about each function.

**Note:** If you use the JavaScript client to update the index, you need to specify `https` as the protocol in the client initialization:

```javascript
  <script src="algoliasearch.min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key', 'https');
    ...
```


Search
-------------


To perform a search, you just need to initialize the index and perform a call to the search function.

You can use the following optional arguments:

### Query parameters

#### Full Text Search parameters

 * **query**: (string) The instant-search query string, all words of the query are interpreted as prefixes (for example "John Mc" will match "John Mccamey" and "Johnathan Mccamey"). If no query parameter is set, retrieves all objects.
 * **queryType**: select how the query words are interpreted, it can be one of the following value:
  * **prefixAll**: all query words are interpreted as prefixes,
  * **prefixLast**: only the last word is interpreted as a prefix (default behavior),
  * **prefixNone**: no query word is interpreted as a prefix. This option is not recommended.
 * **removeWordsIfNoResults**: This option to select a strategy to avoid having an empty result page. There is three different option:
  * **lastWords**: when a query does not return any result, the last word will be added as optional (the process is repeated with n-1 word, n-2 word, ... until there is results),
  * **firstWords**: when a query does not return any result, the first word will be added as optional (the process is repeated with second word, third word, ... until there is results),
  * **none**: No specific processing is done when a query does not return any result (default behavior).
 * **minWordSizefor1Typo**: the minimum number of characters in a query word to accept one typo in this word.<br/>Defaults to 4.
 * **minWordSizefor2Typos**: the minimum number of characters in a query word to accept two typos in this word.<br/>Defaults to 8.
 * **allowTyposOnNumericTokens**: if set to false, disable typo-tolerance on numeric tokens (numbers). Default to false.
 * **typoTolerance**:  This option allows you to control the number of typos in the result set:
  * **true**: the typo-tolerance is enabled and all matching hits are retrieved. (Default behavior)
  * **false**: the typo-tolerance is disabled. For example if one result match without typos, then all results with typos will be hidden.
  * **min**: only keep the results with the minimum number of typos.
  * **strict**: hits matching with 2 typos are not retrieved if there are some matching without typos. This option is useful if you want to avoid as much as possible false positive.
 * **allowTyposOnNumericTokens**: if set to false, disable typo-tolerance on numeric tokens (numbers). Default to true.
 * **ignorePlural**: If set to true, plural won't be considered as a typo (for example car/cars will be considered as equals). Default to false.
 * **restrictSearchableAttributes** List of attributes you want to use for textual search (must be a subset of the `attributesToIndex` index setting). Attributes are separated with a comma (for example `"name,address"`), you can also use a JSON string array encoding (for example encodeURIComponent("[\"name\",\"address\"]")). By default, all attributes specified in `attributesToIndex` settings are used to search.
 * **advancedSyntax**: Enable the advanced query syntax. Defaults to 0 (false).
    * **Phrase query**: a phrase query defines a particular sequence of terms. A phrase query is build by Algolia's query parser for words surrounded by `"`. For example, `"search engine"` will retrieve records having `search` next to `engine` only. Typo-tolerance is _disabled_ on phrase queries.
    * **Prohibit operator**: The prohibit operator excludes records that contain the term after the `-` symbol. For example `search -engine` will retrieve records containing `search` but not `engine`.
 * **analytics**: If set to false, this query will not be taken into account in analytics feature. Default to true.
 * **synonyms**: If set to false, this query will not use synonyms defined in configuration. Default to true.
 * **replaceSynonymsInHighlight**: If set to false, words matched via synonyms expansion will not be replaced by the matched synonym in highlight result. Default to true.
 * **optionalWords**: a string that contains the list of words that should be considered as optional when found in the query. The list of words is comma separated.

#### Pagination parameters

 * **page**: (integer) Pagination parameter used to select the page to retrieve.<br/>Page is zero-based and defaults to 0. Thus, to retrieve the 10th page you need to set `page=9`
 * **hitsPerPage**: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.

#### Geo-search parameters

 * **aroundLatLng**: search for entries around a given latitude/longitude (specified as two floats separated by a comma).<br/>For example `aroundLatLng=47.316669,5.016670`).<br/>You can specify the maximum distance in meters with the **aroundRadius** parameter (in meters) and the precision for ranking with **aroundPrecision** (for example if you set aroundPrecision=100, two objects that are distant of less than 100m will be considered as identical for "geo" ranking parameter).<br/>At indexing, you should specify geoloc of an object with the `_geoloc` attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)

 * **aroundLatLngViaIP**: search for entries around a given latitude/longitude (automatically computed from user IP address).<br/>For example `aroundLatLng=47.316669,5.016670`).<br/>You can specify the maximum distance in meters with the **aroundRadius** parameter (in meters) and the precision for ranking with **aroundPrecision** (for example if you set aroundPrecision=100, two objects that are distant of less than 100m will be considered as identical for "geo" ranking parameter).<br/>At indexing, you should specify geoloc of an object with the `_geoloc` attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)


 * **insideBoundingBox**: search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).<br/>For example `insideBoundingBox=47.3165,4.9665,47.3424,5.0201`).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)

#### Parameters to control results content

 * **attributesToRetrieve**: a string that contains the list of object attributes you want to retrieve (let you minimize the answer size).<br/> Attributes are separated with a comma (for example `"name,address"`), you can also use a string array encoding (for example `["name","address"]` ). By default, all attributes are retrieved. You can also use `*` to retrieve all values when an **attributesToRetrieve** setting is specified for your index.
 * **attributesToHighlight**: a string that contains the list of attributes you want to highlight according to the query. Attributes are separated by a comma. You can also use a string array encoding (for example `["name","address"]`). If an attribute has no match for the query, the raw value is returned. By default all indexed text attributes are highlighted. You can use `*` if you want to highlight all textual attributes. Numerical attributes are not highlighted. A matchLevel is returned for each highlighted attribute and can contain:
  * **full**: if all the query terms were found in the attribute,
  * **partial**: if only some of the query terms were found,
  * **none**: if none of the query terms were found.
 * **attributesToSnippet**: a string that contains the list of attributes to snippet alongside the number of words to return (syntax is `attributeName:nbWords`). Attributes are separated by a comma (Example: `attributesToSnippet=name:10,content:10`). <br/>You can also use a string array encoding (Example: `attributesToSnippet: ["name:10","content:10"]`). By default no snippet is computed.
 * **getRankingInfo**: if set to 1, the result hits will contain ranking information in **_rankingInfo** attribute.
 

#### Numeric search parameters
 * **numericFilters**: a string that contains the list of numeric filters you want to apply separated by a comma. The syntax of one filter is `attributeName` followed by `operand` followed by `value`. Supported operands are `<`, `<=`, `=`, `>` and `>=`.

You can easily perform range queries via the `:` operator (equivalent to combining a `>=` and `<=` operand), for example `numericFilters=price:10 to 1000`.

You can also mix OR and AND operators. The OR operator is defined with a parenthesis syntax. For example `(code=1 AND (price:[0-100] OR price:[1000-2000]))` translates in `encodeURIComponent("code=1,(price:0 to 10,price:1000 to 2000)")`.

You can also use a string array encoding (for example `numericFilters: ["price>100","price<1000"]`).

#### Category search parameters
 * **tagFilters**: filter the query by a set of tags. You can AND tags by separating them by commas. To OR tags, you must add parentheses. For example, `tags=tag1,(tag2,tag3)` means *tag1 AND (tag2 OR tag3)*. You can also use a string array encoding, for example `tagFilters: ["tag1",["tag2","tag3"]]` means *tag1 AND (tag2 OR tag3)*.<br/>At indexing, tags should be added in the **_tags** attribute of objects (for example `{"_tags":["tag1","tag2"]}`).

#### Faceting parameters
 * **facetFilters**: filter the query by a list of facets. Facets are separated by commas and each facet is encoded as `attributeName:value`. To OR facets, you must add parentheses. For example: `facetFilters=(category:Book,category:Movie),author:John%20Doe`. You can also use a string array encoding (for example `[["category:Book","category:Movie"],"author:John%20Doe"]`).
 * **facets**: List of object attributes that you want to use for faceting. <br/>Attributes are separated with a comma (for example `"category,author"` ). You can also use a JSON string array encoding (for example `["category","author"]` ). Only attributes that have been added in **attributesForFaceting** index setting can be used in this parameter. You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
 * **maxValuesPerFacet**: Limit the number of facet values returned for each facet. For example: `maxValuesPerFacet=10` will retrieve max 10 values per facet.

#### Distinct parameter
 * **distinct**: If set to 1, enable the distinct feature (disabled by default) if the `attributeForDistinct` index setting is set. This feature is similar to the SQL "distinct" keyword: when enabled in a query with the `distinct=1` parameter, all hits containing a duplicate value for the attributeForDistinct attribute are removed from results. For example, if the chosen attribute is `show_name` and several hits have the same value for `show_name`, then only the best one is kept and others are removed.
**Note**: This feature is disabled if the query string is empty and there isn't any `tagFilters`, nor any `facetFilters`, nor any `numericFilters` parameters.

```javascript
index = client.initIndex('contacts');
index.search('query string', function(success, content) {
    if (!success) {
        console.log('Error: ' + content.message);
        return;
    }
    for (var h in content.hits) {
        console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
});

index.search('query string', function(success, content) {
    if (!success) {
        console.log('Error: ' + content.message);
        return;
    }
    for (var h in content.hits) {
        console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
}, {'attributesToRetrieve': 'firstname,lastname', 'hitsPerPage': 50});
```

The server response will look like:

```javascript
{
  "hits": [
    {
      "firstname": "Jimmie",
      "lastname": "Barninger",
      "objectID": "433",
      "_highlightResult": {
        "firstname": {
          "value": "<em>Jimmie</em>",
          "matchLevel": "partial"
        },
        "lastname": {
          "value": "Barninger",
          "matchLevel": "none"
        },
        "company": {
          "value": "California <em>Paint</em> & Wlpaper Str",
          "matchLevel": "partial"
        }
      }
    }
  ],
  "page": 0,
  "nbHits": 1,
  "nbPages": 1,
  "hitsPerPage": 20,
  "processingTimeMS": 1,
  "query": "jimmie paint",
  "params": "query=jimmie+paint&attributesToRetrieve=firstname,lastname&hitsPerPage=50"
}
```


Multi-queries
--------------

You can send multiple queries with a single API call using a batch of queries:

```javascript
// perform 3 queries in a single API call:
//  - 1st query targets index `categories`
//  - 2nd and 3rd queries target index `products`
client.startQueriesBatch();
client.addQueryInBatch('categories', $('#q').val(), { hitsPerPage: 3 });
client.addQueryInBatch('products', $('#q').val(), { hitsPerPage: 3, tagFilters: 'promotion' });
client.addQueryInBatch('products', $('#q').val(), { hitsPerPage: 10 });
client.sendQueriesBatch(searchMultiCallback);

function searchMultiCallback(success, content) {
  if (success) {
    var categories = content.results[0];
    for (var i = 0; i < categories.hits.length; ++i) {
      console.log(categories.hits[i]);
    }

    var products_promotion = content.results[1];
    for (var i = 0; i < products_promotion.hits.length; ++i) {
      console.log(products_promotion.hits[i]);
    }

    var products = content.results[2];
    for (var i = 0; i < products.hits.length; ++i) {
      console.log(products.hits[i]);
    }
  }
}
```




Security
---------

If you're using a secured API key (see backend client documentation), you need to set the associated `tags`:

```javascript
var algolia = new AlgoliaSearch('YourApplicationID', 'YourPublicSecuredAPIKey');
algolia.setSecurityTags('(public,user_42)'); // must be same than those used at generation-time
```

If you've specified a `userToken` while generating your secured API key, you must also specified it at query-time:

```javascript
var algolia = new AlgoliaSearch('YourApplicationID', 'YourPublicSecuredAPIKey');
algolia.setSecurityTags('(public,user_42)'); // must be same than those used at generation-time
algolia.setUserToken('user_42')              // must be same than the one used at generation-time
```






