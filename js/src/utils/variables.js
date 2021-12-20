function getCssVariablePrefix(){
    return getComputedStyle(document.documentElement).getPropertyValue("--flatstex-variable-prefix").slice(1)
}


function cssSelector(selector_base){
    if([".", "#"].includes(selector_base[0])){
        return selector_base[0] + getCssVariablePrefix() + selector_base.slice(1)
    }
    return getCssVariablePrefix() + selector_base
}

export {
    cssSelector,
    getCssVariablePrefix
}