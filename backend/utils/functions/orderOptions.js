function getOrderOptions(columnName, sortBy) {
    switch (sortBy) {
        case 'asc':
            return [[columnName, 'ASC']];
        case 'desc':
            return [[columnName, 'DESC']];
        default:
            return [];
    }
}

module.exports = { getOrderOptions };