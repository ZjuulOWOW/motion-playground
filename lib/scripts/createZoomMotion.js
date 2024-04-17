async function createZoomMotion(target, options) {

    const targetElement = document.querySelector(target)
    if (!targetElement) return
    let gsap, ScrollTrigger
    
    await (async () => {
        gsap = (await import('gsap')).default
        ScrollTrigger = (await import('gsap/ScrollTrigger')).default
        gsap.registerPlugin(ScrollTrigger)
    })()

    // ScrollTrigger.refresh()
    
    const {
        direction: motionDirection = 'in',
        end: motionEnd = 'bottom',
        ease: motionEase = 'ease',
        path: motionPath,
        scale: motionScale = motionPath ? 20 : 2,
        start: motionStart = motionPath ? window.innerHeight : 'start',
    } = options

    const clipElement = document.querySelector(motionPath)
    const animationDirection = motionDirection === 'in' ? gsap.to : gsap.from

    animationDirection(clipElement ? clipElement : targetElement, {
        scrollTrigger: {
            trigger: targetElement,
            start: `${motionStart} bottom`,
            end: `${motionEnd} bottom`,
            scrub: 1,
            pin: clipElement ? true : false,
        },
        ease: motionEase,
        scale: motionPath ? motionScale : (100 - motionScale) / 100
    })

    if (clipElement){
        const pathX = window.innerWidth / 2 - document.querySelector(`svg:has(${motionPath})`).getBoundingClientRect().width / 2
        const pathY = window.innerHeight / 2 - document.querySelector(`svg:has(${motionPath})`).getBoundingClientRect().height / 2
        gsap.set(clipElement, {
            x: pathX,
            y : pathY,
            transformOrigin: 'center'
        })
    }
}
export {createZoomMotion}
