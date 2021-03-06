var http = require('unirest');
var parser = require('./parser');

const ROOT_URL = 'https://api.mercadolibre.com';

const API = {
    search: function (query) { return ['/sites/MLA/search', {q: query, limit: 4}] },
    categories: function(id) { return `/categories/${id}`; },
    item: function (id) { return `/items/${id}` },
    itemDescription: function(id) { return this.item(id) + '/description' },
}

function get(path, params=null) {
    return new Promise((resolve, reject) => {
        let uri = ROOT_URL + path;
        req = http.get(uri);
        if (params) { req.query(params); }
        req.end(res => {
            if (res.code == 200) { resolve(res.body) }
            else { console.log(res); }
        });
    });
}

async function search(query) {
    let [path, params] = API.search(query);
    let res = await get(path, params);
    return parser.parseSearch(res);
}

async function item(id, withCategories=false) {
    let path = API.item(id);

    let _categories = false;
    let _item = await get(path);
    let _itemDescription = await itemDescription(id);

    if (withCategories) {
        _categories = await categories(_item.category_id); 
    }

    return parser.parseItem(_item, _itemDescription, _categories);

}

async function itemDescription(id) {
    let path = API.itemDescription(id);
    let res = await get(path);
    return res;
}

async function categories(id) {
    let path = API.categories(id);
    let res = await get(path);
    return res;
}

module.exports = {
    search,
    item
}