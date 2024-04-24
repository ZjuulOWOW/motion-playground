async function createZoomMotion(target, options) {

    const targetElement = document.querySelector(target)
    
    let gsap, ScrollTrigger
    await (async () => {
        gsap = (await import('gsap')).default
        ScrollTrigger = (await import('gsap/ScrollTrigger')).default
        gsap.registerPlugin(ScrollTrigger)
    })()

    const {
        direction: motionDirection = 'in',
        end: motionEnd = 'bottom',
        ease: motionEase = 'ease',
        clipContainer: motionClipContainer,
        scale: motionScale = motionClipContainer ? 20 : 2,
        start: motionStart = motionClipContainer ? window.innerHeight : 'start',
    } = options

    const clipElement = document.querySelector(motionClipContainer)
    const animationDirection = motionDirection === 'in' ? gsap.to : gsap.from
    animationDirection(targetElement, {
        scrollTrigger: {
            trigger: motionClipContainer ? clipElement : targetElement,
            start: motionClipContainer ? `top top` : `${motionStart} bottom`,
            end: `${motionEnd} bottom`,
            scrub: 1,
            pin: motionClipContainer ? clipElement : false,
        },
        ease: motionEase,
        scale: motionClipContainer ? motionScale : (100 - motionScale) / 100
    })

}
export {createZoomMotion}
