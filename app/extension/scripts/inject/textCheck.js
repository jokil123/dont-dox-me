export const containsIllegalAlien = (content, illegalAliens) => {
    let contentArray = Array.from(content);
    contentArray = contentArray.map((x) => {
        return preProcessText(x);
    });
    return contentArray.some((contentItem) => {
        return illegalAliens.some((illegalAlien) => {
            if (contentItem.indexOf(illegalAlien) >= 0) {
                return true;
            }
        });
    });
};
export const illegalAliensPosition = (element, illegalAliens) => {
    let alienPositions = [];
    illegalAliens.forEach((illegalAlien) => {
        let startIndex = element.textContent.indexOf(illegalAlien);
        if (startIndex >= 0) {
            alienPositions.push([startIndex, startIndex + illegalAlien.length]);
        }
    });
    return alienPositions;
};
export const preProcessText = (text) => {
    let removableCharacters = /[\n .\t\r]+/g;
    return text.toLowerCase().replace(removableCharacters, "");
};
