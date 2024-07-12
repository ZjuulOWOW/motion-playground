async function createMousePBM(target, options) {
    const targetElement = document.querySelector(target)
    if (!targetElement) return

    let createPhysicsBasedMotion, getMousePosition
    await (async () => {
        createPhysicsBasedMotion = (await import("@owowagency/gsap-motion"))
            .createPhysicsBasedMotion
        getMousePosition = (await import("@owowagency/gsap-motion"))
            .getMousePosition
    })()

    const { speed = 1, damping = 1, response = 0, range = 50 } = options

    const dynamicsX = createPhysicsBasedMotion(speed, damping, response, 0)
    const dynamicsY = createPhysicsBasedMotion(speed, damping, response, 0)
    const targetBounds = targetElement.getBoundingClientRect()
    let targetBoundsX = targetBounds.left + window.scrollX
    let targetBoundsY = targetBounds.top + window.scrollY
    let previousWindowWidth = window.innerWidth
    let previousWindowHeight = window.innerHeight
    let previousMouseX
    let previousMouseY
    let previousScrollX = window.scrollX
    let previousScrollY = window.scrollY
    let previousFrame = 1

    const resize = () => {
        const deltaWidth = window.innerWidth - previousWindowWidth
        const deltaHeight = window.innerHeight - previousWindowHeight
        targetBoundsX += deltaWidth / 2
        targetBoundsY += deltaHeight / 2
        previousWindowWidth = window.innerWidth
        previousWindowHeight = window.innerHeight
    }

    window.addEventListener("resize", resize)

    const update = (currentFrame) => {
        const mouseX = getMousePosition().page.x
        const mouseY = getMousePosition().page.y
        const deltaTime = (currentFrame - previousFrame) / 1000
        const targetX =
            (dynamicsX.update(0.01, mouseX) -
                targetBoundsX -
                targetBounds.width / 2) *
            (range / 100)
        let targetY =
            (dynamicsY.update(deltaTime, mouseY) -
                targetBoundsY -
                targetBounds.height / 2) *
            (range / 100)
        if (previousMouseY === mouseY && previousScrollY !== window.scrollY) {
            targetY += window.scrollY
        }
        targetElement.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
        previousFrame = currentFrame
        previousMouseX = mouseX
        previousMouseY = mouseY
        previousScrollX = window.scrollX
        previousScrollY = window.scrollY
        requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
}

export { createMousePBM }
