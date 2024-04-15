async function createMouseMotion(target, options){

    const targetElement = document.querySelector(target)
    if(!targetElement) return

    let customEases, elastic, bounce, toLinear

    await (async () => {
        customEases = (await import('./customEases.js')).customEases, 
        elastic = (await import('./customEases.js')).elastic, 
        bounce = (await import('./customEases.js')).bounce, 
        toLinear = (await import('./customEases.js')).toLinear
    })()

    const {
        scope: motionScope,
        range: motionRange = 100,
        ease: motionEase = 'ease',
        duration: motionDuration = 0,
        returnOnLeave: motionReturnOnLeave = true,
        easeOnLeave: motionEaseOnLeave = 'elastic',
        use3D: motionUse3D = false
    } = options
    
    const motionContainer = motionScope ? document.querySelector(motionScope) : document

    const motionContainerBounds = motionScope && motionContainer.getBoundingClientRect()
    const initialScrollX = window.scrollX
    const initialScrollY = window.scrollY

    const targetBounds = targetElement.getBoundingClientRect()

    const targetX = targetBounds.x + (targetBounds.right - targetBounds.x) / 2 + window.scrollX
    const targetY = targetBounds.y + (targetBounds.bottom - targetBounds.y) / 2 + window.scrollY

    var prevMouseX
    var prevMouseY
    var prevScrollX
    var prevScrollY
    var elRotateX
    var elRotateY

    motionContainer.addEventListener('mousemove', (e) => {
        if (motionUse3D){
            elRotateX = (e.pageY - (motionContainerBounds.top + initialScrollY) - motionContainerBounds.height / 2 ) / (motionContainerBounds.height / 100)
            elRotateY = (e.pageX - (motionContainerBounds.left + initialScrollX) - motionContainerBounds.width / 2 ) / (motionContainerBounds.width / 100)
        }
        applyMouseMotion(e)
    })
    motionContainer.addEventListener('scroll', () => {
        prevMouseY = prevMouseY + (scrollY - prevScrollY)
        prevScrollY = scrollY
        prevMouseX = prevMouseX + (scrollX - prevScrollX)
        prevScrollX = scrollX
        applyMouseMotion()
    })

    function applyMouseMotion(e){
        targetElement.animate(
            {
                transform: `translate3D(${-(targetX - (e ? e.pageX : prevMouseX)) / (100 / motionRange)}px,${-(targetY - (e ? e.pageY : prevMouseY)) / (100 / motionRange)}px,0) 
                rotateY(${motionUse3D ? elRotateY : 0}deg) rotateX(${motionUse3D ? -elRotateX : 0}deg)`
            },
            {
                easing: motionEase,
                fill: "forwards",
                duration: motionDuration
            })
        prevMouseY = e ? e.pageY : prevMouseY
        prevMouseX = e ? e.pageX : prevMouseX
    }

    if(motionReturnOnLeave){
        motionContainer.addEventListener('mouseleave', (e) =>{
            targetElement.animate(
                {
                    transform: 'translate3D(0,0,0)'
                },
                {
                    duration: 1200,
                    fill: "forwards",
                    easing: customEases.includes(motionEaseOnLeave) ? toLinear(eval(motionEaseOnLeave)) : motionEaseOnLeave
                }
            )
        })
    }
}

export {createMouseMotion}