// Backend
const el = document.querySelector('.el')
const container = document.querySelector('.container')
var bounds
var elX
var elY
bounds = el.getBoundingClientRect()
elX = bounds.x + (bounds.right - bounds.x) / 2
elY = bounds.y + (bounds.bottom - bounds.y) / 2

function createMouseMotion(target, options){

    const {
        container
    } = options

    console.log(target, options)
}

function applyMouseMotion(){
    container.addEventListener('mousemove', (e) => {
        el.animate({
                transform: `translate3D(${-(elX - e.clientX) / 10}px,${-(elY - e.clientY) / 10}px,0)`
            },
            {
                easing: "ease-in-out",
                fill: "forwards",
                duration: 1000
            })
    })
}

// Usage

function createMouseMotion('.el', {
    container: '.container'
})