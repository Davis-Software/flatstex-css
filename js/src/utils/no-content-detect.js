/**
 * Return if specified element can contain content
 * @param {HTMLElement} elem element to check
 */
function canElementHaveContent(elem){
    let pattern = /^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/
    return !pattern.test(elem.tagName)
}


export {
    canElementHaveContent
}
