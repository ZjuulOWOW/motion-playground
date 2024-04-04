// Backend

function createMouseMotion(target, options){

    const {
        type = 'look',
        scope,
        stiffness = 1,
        ease = 'ease'
    } = options

    const el = document.querySelector(target)
    const container = (scope ? document.querySelector(scope) : document) //if scopeContainer{document.querySelector(scopeContainer)} else{document}
    const bounds = el.getBoundingClientRect()
    const elX = bounds.x + (bounds.right - bounds.x) / 2
    const elY = bounds.y + (bounds.bottom - bounds.y) / 2

    container.addEventListener('mousemove', (e) => {
        el.animate(
            {
                transform: `translate3D(${-(elX - e.clientX) / stiffness}px,${-(elY - e.clientY) / stiffness}px,0)`
            },
            {
                easing: ease,
                fill: "forwards",
                duration: 1000
            })
    })
}

// Usage

createMouseMotion('#js-mousechaser', {
    scope: '#js-container',
    stiffness: 3,
    ease: 'linear'
})