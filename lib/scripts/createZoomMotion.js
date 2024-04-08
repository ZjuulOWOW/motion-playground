import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function createZoomMotion(target, options) {

    const {
        type = 'clip',
        scale = 2,
        direction = 'in',
        start = 'top',
        end = 'bottom',
        ease = 'ease'
    } = options

    const el = document.querySelector(target)
    var animationDirection = direction === 'in' ? gsap.to : gsap.from

    animationDirection(el, {
        scrollTrigger: {
            trigger: el,
            start: `${start} bottom`,
            end: `${end} bottom`,
            markers: true,
            scrub: true
        },
        ease: ease,
        scale: type ==='scale' ? (100 - scale) / 100 : '==',
        clipPath: type === 'clip' ? `inset(-100% ${scale}%)` : '=='
    })
}

export {createZoomMotion}