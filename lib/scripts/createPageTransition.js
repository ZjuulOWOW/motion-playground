let pageTransitionCreated = false

async function createPageTransition(options) {
    if (pageTransitionCreated) return
    pageTransitionCreated = true

    let barba, init

    await (async () => {
        barba = (await import("@barba/core")).default
        init = (await import("/main")).init
    })()

    const {
        sync: syncOptions = false,
        leave: leaveOptions = {
            target: "main",
            keyframes: {
                transform: "translate3d(0,100vh,0)",
            },
            duration: 0,
            ease: "ease",
            delay: 0,
        },
        enter: enterOptions = {
            target: "main",
            keyframes: {
                transform: ["translate3d(0,-100vh,0)", 0],
            },
            duration: 0,
            ease: "ease",
            delay: 0,
        },
    } = options

    let allTargets = []

    barba.init({
        preventRunning: true,
        transitions: [
            {
                sync: syncOptions,
                leave({ current }) {
                    document.body.classList.add("is-transitioning")
                    return new Promise((resolve) => {
                        animateElement(leaveOptions, resolve, current.container)
                    })
                },
                afterLeave({ current }) {
                    current.container.remove()
                },
                enter({ next }) {
                    return new Promise((resolve) => {
                        animateElement(enterOptions, resolve, next.container)
                    })
                },
                afterEnter({ next }) {
                    document.body.classList.remove("is-transitioning")
                    next.container.classList.remove("is-transitioning")
                    allTargets.forEach((target) =>
                        target.classList.remove("is-transitioning")
                    )
                    allTargets = []
                    init()
                },
            },
        ],
    })

    function animateElement(vars, resolve, thisContainer) {
        let animationCount = 0
        const scrollY = window.scrollY
        thisContainer.classList.add("is-transitioning")
        thisContainer.scrollTo(0, scrollY)
        const processAnimation = (options) => {
            const targetElements =
                options.target === "main"
                    ? [thisContainer]
                    : document.querySelectorAll(options.target)
            targetElements.forEach(targetElement => {
                targetElement.classList.add("is-transitioning")
                allTargets.push(targetElement)
                if (options.delay) {
                    //if element has delay, set initial keyframe value
                    Object.values(options.keyframes).forEach((value, index) => {
                        if (Array.isArray(value)) {
                            const property = Object.keys(options.keyframes)[index]
                            targetElement.style[property] = value[0]
                        }
                    })
                }
                targetElement.animate(options.keyframes, {
                    duration: options.duration,
                    fill: "forwards",
                    easing: options.ease,
                    delay: options.delay,
                }).onfinish = () => {
                    animationCount++
                    if (
                        animationCount === (Array.isArray(vars) ? allTargets.length : targetElements.length)
                    ) {
                        return resolve()
                    }
                }
            })
        }
        Array.isArray(vars)
            ? vars.forEach(processAnimation)
            : processAnimation(vars)
    }
}

export { createPageTransition }
