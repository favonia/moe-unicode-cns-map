/**
 * @const
 * @type {string}
 */
var kBigFive_url_           = "https://raw.github.com/favonia/moe-unicode-cns-map/master/kBigFive.json";
/**
 * @const
 * @type {string}
 */
var kIRG_TSource_url_       = "https://raw.github.com/favonia/moe-unicode-cns-map/master/kIRG_TSource.json";
/**
 * @const
 * @type {string}
 */
var fake_rev_kCNS_url_      = "https://raw.github.com/favonia/moe-unicode-cns-map/master/fake_rev_kCNS.json";

/**
 * @const
 * @type {number}
 */
var cacheLifeTime_ = 20000;

/**
 * @param {string} resourceName
 * @param {string} url
 * @param {string} key
 * @return {string}
 */
function cachedJsonLookup_(resourceName, url, key) {
  Utilities.sleep(Math.random() * 10000);
  // @type {string}
  var cacheKey = "unihan2-" + resourceName + "-" + key;
  var cache = CacheService.getPublicCache();
  // @type {?string}
  var cached = cache.get(cacheKey);
  if (cached != null) {
    cache.put(cacheKey, cached, cacheLifeTime_);
    return cached;
  }
  // @string
  var response = UrlFetchApp.fetch(url).getContentText();
  var mapping = JSON.parse(response);  
  cache.putAll(mapping, cacheLifeTime_);
  if (cacheKey in mapping) {
    return mapping[cacheKey];
  } else {
    cache.put(cacheKey, "", cacheLifeTime_);
    return "";
  }
}

/**
 * @param {string} unicode
 * @return {?string}
 */
function kBigFive(unicode) {
  return cachedJsonLookup_("kBigFive", kBigFive_url_, unicode);
}

/**
 * @param {string} unicode
 * @return {?string}
 */
function kIRG_TSource(unicode) {
  return cachedJsonLookup_("kIRG_TSource", kIRG_TSource_url_, unicode);
}

/**
 * @param {string} cns
 * @return {?string}
 */
function fake_rev_kCNS(cns) {
  if (cns == "") return "";
  return cachedJsonLookup_("fake_rev_kCNS", fake_rev_kCNS_url_, cns);
}
