var author = {
     name: 'Nicolas',
     lastname: 'Grapsas'
}

function parseThumbnail(url) {
    return url.replace('-I.jpg', '-O.jpg');
}

function parseBreadcrumb(data) {
    let categories = [];
    if (!data.filters.length) { return categories }
    data.filters[0].values[0].path_from_root.map(level => categories.push(level.name));
    return categories;
}

function parseItems(results) {
    items = []
    
    if (!results.length) { return items }
    
    results.map(item => {
        items.push({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: 2
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

function parseItem(_item, itemDescription) {

    let [item] = parseItems([_item])
    item.sold_quantity = _item.sold_quantity;
    item.description = itemDescription.plain_text;

    return {
        author,
        item 
    }
}

module.exports = {
    parseSearch,
    parseItem
}