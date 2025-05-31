export const replaceCommaToSemicolon = (categories) => {
    return categories.map(category => category.replaceAll(",",";"));
};