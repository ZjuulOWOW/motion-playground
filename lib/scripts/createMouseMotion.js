import {customEases, elastic, bounce, toLinear} from './customEases.js'

function createMouseMotion(target, options){

    const {
        scope,
        range = 100,
        ease = 'ease',
        duration = 1000,
        returnOnLeave = true,
        easeOnLeave = 'elastic'
    } = options

    const el = document.querySelector(target)
    const container = scope ? document.querySelector(scope) : document

    const bounds = el.getBoundingClientRect()
    const elX = bounds.x + (bounds.right - bounds.x) / 2 + window.scrollX
    const elY = bounds.y + (bounds.bottom - bounds.y) / 2 + window.scrollY
    var prevMouseX
    var prevMouseY
    var prevScrollX
    var prevScrollY

    container.addEventListener('mousemove', (e) => {
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
                transform: `translate3D(${-(elX - (e ? e.pageX : prevMouseX)) / (100 / range)}px,${-(elY - (e ? e.pageY : prevMouseY)) / (100 / range)}px,0)`
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