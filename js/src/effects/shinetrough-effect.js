import $ from "../modules/jquery.min"
import { cssSelector } from "../utils/variables"
import { canElementHaveContent } from "../utils/no-content-detect"


/**
 * Add a "shinetrough" effect to any element (looks like spotlight shining through a canvas)
 * @param {HTMLElement} elem Element to which to apply the effect
 * @param {number} size Size multiplier for the "shinetrough" effect (value 1 spans whole element)
 */
function createShinetrough(elem, size=1){
    if(!canElementHaveContent(elem)){
        console.warn(`Tag '${elem.tagName}' cannot contain any child nodes. The '${cssSelector("shinetrough")}' class will not work as expected!`)
    }

    elem.classList.add(cssSelector("shinetrough"))

    let $self = $(elem)
    let canvas = document.createElement("div")
    let candle = document.createElement("div")
    canvas.classList.add(cssSelector("shinetrough-canvas"))
    candle.classList.add(cssSelector("shinetrough-candle"))
    elem.append(canvas)
    canvas.append(candle)

    elem.addEventListener("mouseenter", e => {
        if(e.target !== elem) return
        candle.classList.remove(cssSelector("shinetrough-candle-anim-back"))
        candle.classList.add(cssSelector("shinetrough-candle-anim"))
    })
    elem.addEventListener("mouseleave", e => {
        if(e.target !== elem) return
        candle.classList.remove(cssSelector("shinetrough-candle-anim"))
        candle.classList.add(cssSelector("shinetrough-candle-anim-back"))
    })
    elem.addEventListener("mousemove", e => {
        let offset = $self.offset()
        let x = e.pageX - offset.left
        let y = e.pageY - offset.top
        let dia = Math.max(e.target.offsetHeight, e.target.offsetWidth) * 2 * size

        candle.style.width = dia + "px"
        candle.style.height = dia + "px"
        candle.style.left = x - (dia/2) + "px"
        candle.style.top = y - (dia/2) + "px"
    })
}


/**
 * Initialize the "shinetrough" effect for specified elements
 * @param {Object[selectors, elements, size]} options specified options
 */
function initializeShinetroughs(options = {}){
    let selectors = options.selectors || [cssSelector("shinetrough")]
    let elems = options.elements || []
    let size = options.size || 1

    for(let selector of selectors){
        document.querySelectorAll(selector).forEach(elem => {
            createShinetrough(elem, size)
        })
    }
    for(let elem of elems){
        createShinetrough(elem)
    }
}


export default {
    createShinetrough,
    initializeShinetroughs
}