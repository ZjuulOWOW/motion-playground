async function createZoomPBM(target, options) {
    const targetElement = document.querySelector(target)
    if (!targetElement) return

    let createPhysicsBasedMotion
    await (async () => {
        createPhysicsBasedMotion = (await import("@owowagency/gsap-motion"))
            .createPhysicsBasedMotion
    })()

    const {
        speed = 1,
        damping = 1,
        response = -1,
        scale = 10,
        trigger
    } = options

    const dynamics = createPhysicsBasedMotion(speed, damping, response, 0)
    let previousFrame = 1

    const triggerElementY = trigger ? document.querySelector(trigger).getBoundingClientRect().y : 0
    const update = (currentFrame) => {
        const scrollY = Math.max(0, window.scrollY - triggerElementY)
        const deltaTime = (currentFrame - previousFrame) / 1000
        const targetScale = dynamics.update(deltaTime, scrollY) / (10000 / scale) + 1
        targetElement.style.transform = `scale(${targetScale})`
        previousFrame = currentFrame
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
}

export { createZoomPBM }
