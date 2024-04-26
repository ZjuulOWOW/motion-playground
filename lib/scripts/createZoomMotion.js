async function createZoomMotion(target, options) {
    const targetElement = document.querySelector(target)
    if (!targetElement) return
    let gsap, ScrollTrigger
    await (async () => {
        gsap = (await import("gsap")).default
        ScrollTrigger = (await import("gsap/ScrollTrigger")).default
        gsap.registerPlugin(ScrollTrigger)
    })()

    const {
        direction: motionDirection = "in",
        end: motionEnd = "bottom",
        ease: motionEase = "ease",
        scale: motionScale = 2,
        start: motionStart = "top top",
        pin: motionPin = false,
    } = options

    const animationDirection = motionDirection === "in" ? gsap.to : gsap.from
    animationDirection(targetElement, {
        scrollTrigger: {
            trigger: targetElement,
            start: `${motionStart} top`,
            end: `bottom+=${motionEnd} bottom`,
            scrub: 1,
            // pin: motionPin,
        },
        ease: motionEase,
        scale: motionScale,
    })

    // to do: only trigger if pin is not a boolean, make sure pin: true works too
    if (motionPin) {
        const wrapper = document.createElement("div")
        wrapper.classList.add("zoom-motion-wrapper")
        const pinContainer = document.querySelector(motionPin)
        pinContainer.before(wrapper)
        wrapper.appendChild(pinContainer)
        const totalHeight = parseInt(motionEnd) + pinContainer.offsetHeight
        wrapper.style.height = `${totalHeight}px`
        console.log(totalHeight)
        pinContainer.style.cssText = 'position: sticky; top: 0'
    }
}
export { createZoomMotion }
