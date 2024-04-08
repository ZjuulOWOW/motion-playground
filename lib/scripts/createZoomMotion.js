import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function createZoomMotion(target, options) {

    const {
        scale = 8,
        direction = 'in',
        offset = 0,
        end = 0,
        ease = 'ease'
    } = options

    const el = document.querySelector(target)
    var animationDirection = direction === 'in' ? gsap.to : gsap.from

    animationDirection(el, {
        scrollTrigger: {
            trigger: el,
            start: `+=${offset} bottom`,
            end: `bottom-=${end} bottom`,
            markers: true,
            scrub: true
        },
        ease: ease,
        width: `-=${scale}%` ,
        marginLeft: `+=${scale / 2}%`
    })
}

export {createZoomMotion}