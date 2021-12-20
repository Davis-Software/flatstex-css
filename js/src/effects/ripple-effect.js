import $ from "../modules/jquery.min"
import { canElementHaveContent } from "../utils/no-content-detect"
import { cssSelector } from "../utils/variables"


/**
 * Add a ripple wave effect to the specified element
 * @param {HTMLElement} elem Element to add the ripple effect to
 */
function createRipple(elem) {
    if(!canElementHaveContent(elem)){
        console.warn(`Tag '${elem.tagName}' cannot contain any child nodes. The '${cssSelector("ripple")}' class will not work as expected!`)
    }

    $(elem).addClass(cssSelector("ripple"))
    $(elem).on("mousedown", e => {
        let $self = $(e.target)
        if($self.is(".disabled")) {
            return
        }

        let offs = $self.offset()
        let x = e.pageX - offs.left
        let y = e.pageY - offs.top
        let dia = Math.min(e.target.offsetHeight, e.target.offsetWidth, 100)
        let $ripple = $('<div/>', { class : cssSelector("ripple-inner"), appendTo : $self })

        $('<div/>', {
            class : cssSelector("ripple-wave"),
            css : {
                background: $self.data("ripple"),
                width: dia,
                height: dia,
                left: x - (dia/2),
                top: y - (dia/2)
            },
            appendTo: $ripple,
            one: {
                animationend : () => {
                    $ripple.remove()
                }
            }
        })
    })
}


/**
 * Initialize the ripple effect to provided elements (selectors and HTMLElement)
 * @param {Object[selectors, elements]} options specified options
 */
function initializeRipples(options = {}){
    let selectors = options.selectors || [cssSelector("ripple")]
    let elems = options.elements || []

    for(let selector of selectors){
        document.querySelectorAll(selector).forEach(elem => {
            createRipple(elem)
        })
    }
    for(let elem of elems){
        createRipple(elem)
    }
}


export default {
    createRipple,
    initializeRipples
}