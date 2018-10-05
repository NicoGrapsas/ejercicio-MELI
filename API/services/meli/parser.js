var author = {
     name: 'Nicolas',
     lastname: 'Grapsas'
}

function parseDecimals(number) {
    let n_str = number.toString();
    let decimals = (n_str.indexOf('.') >= 0);

    if (!decimals) { return { amount: number, decimals: 00 } }
    else {
        n_arr = n_str.split('.');
        return { amount: parseInt(n_arr[0]), decimals: parseInt(n_arr[1]) }
    }
}

/**
 * Modifies image filename for higher resolution.
 * @param {string} url 
 */
function parseThumbnail(url) {
    return url.replace('-I.jpg', '-O.jpg');
}

function parseBreadcrumb(data) {
    let categories = [];
    
    // FROM CATEGORIES API
    if (data.path_from_root && data.path_from_root.length) {
        data.path_from_root.map(level => categories.push(level.name));    
    }

    // FROM SEARCH API
    if (data.filters && data.filters.length) { 
        data.filters[0].values[0].path_from_root.map(level => categories.push(level.name)); 
    }

    return categories;
}

function parseItems(results) {
    items = []
    
    if (!results.length) { return items }
    
    results.map(item => {
        let { amount, decimals } = parseDecimals(item.price);
        items.push({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount,
                decimals
            },
            picture: parseThumbnail(item.thumbnail),
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        })
    });

    return items;
}

function parseSearch(data) {
        
    return {
        author,
        categories: parseBreadcrumb(data),
        items: parseItems(data.results)
    }
}

function parseItem(_item, itemDescription, categories=false) {

    let [item] = parseItems([_item])
    item.sold_quantity = _item.sold_quantity;
    item.description = itemDescription.plain_text;
    if (categories) { 
        item.categories = parseBreadcrumb(categories); 
    }

    return {
        author,
        item 
    }
}

module.exports = {
    parseSearch,
    parseItem
}