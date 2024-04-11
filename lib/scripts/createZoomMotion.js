import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function createZoomMotion(target, options) {

    const {
        scale = 2,
        direction = 'in',
        start = 'top',
        end = 'bottom',
        ease = 'ease',
        path
    } = options

    const el = document.querySelector(target)
    const clip = document.querySelector(path)
    var animationDirection = direction === 'in' ? gsap.to : gsap.from

    animationDirection(clip ? clip : el, {
        scrollTrigger: {
            trigger: el,
            start: `${start} bottom`,
            end: `${end} bottom`,
            markers: true,
            scrub: 1,
            pin: clip ? true : false,
        },
        ease: ease,
        scale: path ? scale : (100 - scale) / 100
    })

    if (clip){
        console.log(document.querySelector(`svg:has(${path})`).getBoundingClientRect())
        const pathX = window.innerWidth / 2 - document.querySelector(`svg:has(${path})`).getBoundingClientRect().width / 2
        const pathY = window.innerHeight / 2 - document.querySelector(`svg:has(${path})`).getBoundingClientRect().height / 2
        gsap.set(clip, {
            x: pathX,
            y : pathY,
            transformOrigin: 'center'
        })
    }
}

export {createZoomMotion}