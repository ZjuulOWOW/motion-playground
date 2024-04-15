import {customEases, elastic, bounce, toLinear} from './customEases.js'

function createMouseMotion(target, options){

    const {
        scope,
        range = 100,
        ease = 'ease',
        duration = 0,
        returnOnLeave = true,
        easeOnLeave = 'elastic',
        use3D = false
    } = options

    const el = document.querySelector(target)
    const container = scope ? document.querySelector(scope) : document

    const containerBounds = scope && container.getBoundingClientRect()
    const scrollXOnLoad = window.scrollX
    const scrollYOnLoad = window.scrollY

    const elBounds = el.getBoundingClientRect()

    const elX = elBounds.x + (elBounds.right - elBounds.x) / 2 + window.scrollX
    const elY = elBounds.y + (elBounds.bottom - elBounds.y) / 2 + window.scrollY

    var prevMouseX
    var prevMouseY
    var prevScrollX
    var prevScrollY
    var elRotateX
    var elRotateY

    container.addEventListener('mousemove', (e) => {
        if (use3D){
            elRotateX = (e.pageY - (containerBounds.top + scrollYOnLoad) - containerBounds.height / 2 ) / (containerBounds.height / 100)
            elRotateY = (e.pageX - (containerBounds.left + scrollXOnLoad) - containerBounds.width / 2 ) / (containerBounds.width / 100)
        }
        applyMouseMotion(e)
    })
    container.addEventListener('scroll', (e) => {
        prevMouseY = prevMouseY + (scrollY - prevScrollY)
        prevScrollY = scrollY
        prevMouseX = prevMouseX + (scrollX - prevScrollX)
        prevScrollX = scrollX
        applyMouseMotion()
    })

    function applyMouseMotion(e){
        el.animate(
            {
                transform: `translate3D(${-(elX - (e ? e.pageX : prevMouseX)) / (100 / range)}px,${-(elY - (e ? e.pageY : prevMouseY)) / (100 / range)}px,0) 
                rotateY(${use3D ? elRotateY : 0}deg) rotateX(${use3D ? -elRotateX : 0}deg)`
            },
            {
                easing: ease,
                fill: "forwards",
                duration: duration
            })
        prevMouseY = e ? e.pageY : prevMouseY
        prevMouseX = e ? e.pageX : prevMouseX
    }

    if(returnOnLeave){
        container.addEventListener('mouseleave', (e) =>{
            el.animate(
                {
                    transform: 'translate3D(0,0,0)'
                },
                {
                    duration: 1200,
                    fill: "forwards",
                    easing: customEases.includes(easeOnLeave) ? toLinear(eval(easeOnLeave)) : easeOnLeave
                }
            )
        })
    }
}

export {createMouseMotion}