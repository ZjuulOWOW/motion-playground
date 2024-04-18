async function createZoomMotion(target, options) {

    const targetElement = document.querySelector(target)
    
    let gsap, ScrollTrigger
    await (async () => {
        gsap = (await import('gsap')).default
        ScrollTrigger = (await import('gsap/ScrollTrigger')).default
        gsap.registerPlugin(ScrollTrigger)
    })()

    setTimeout(() => {
        ScrollTrigger.refresh()
    }, 1000)
    
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

    animationDirection('.zoom2-mask', {
        scrollTrigger: {
            trigger: '.zoom2-container',
            start: clipElement ? `bottom bottom` : `${motionStart} bottom`,
            end: `${motionEnd} bottom`,
            scrub: 1,
            pin: '.zoom2-container',
        },
        ease: motionEase,
        scale: motionPath ? motionScale : (100 - motionScale) / 100
    })

    // if (clipElement){
    //     const pathX = window.innerWidth / 2 - document.querySelector(`svg:has(${motionPath})`).getBoundingClientRect().width / 2
    //     const pathY = window.innerHeight / 2 - document.querySelector(`svg:has(${motionPath})`).getBoundingClientRect().height / 2
    //     gsap.set(clipElement, {
    //         x: pathX,
    //         y : pathY,
    //         transformOrigin: 'center'
    //     })
    // }
}
export {createZoomMotion}
