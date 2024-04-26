let pageTransitionCreated = false

async function createPageTransition(options) {
    if (pageTransitionCreated) return
    pageTransitionCreated = true

    let barba, init

    await (async () => {
        barba = (await import("@barba/core")).default
        init = (await import("/main")).init
    })()

    // fix waarom is dit destroyed?

    const {
        fromNamespace = null,
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
    console.log("options:", options)

    let transitionObjects = []

    const processTransitionOptions = (transitionOptions) => {
        console.log("transitionOptionsFrom:", transitionOptions.fromNamespace)
        transitionObjects.push({
            from: {
                namespace: transitionOptions.fromNamespace,
            },
            to: {
                namespace: transitionOptions.toNamespace,
            },
            sync: transitionOptions.sync,
            leave({ current }) {
                document.body.classList.add("is-transitioning")
                return new Promise((resolve) => {
                    animateElement(
                        transitionOptions.leave,
                        resolve,
                        current.container
                    )
                })
            },
            afterLeave({ current }) {
                current.container.remove()
            },
            enter({ next }) {
                return new Promise((resolve) => {
                    animateElement(
                        transitionOptions.enter,
                        resolve,
                        next.container
                    )
                })
            },
            afterEnter({ next }) {
                document.body.classList.remove("is-transitioning")
                next.container.classList.remove("is-transitioning")
                init()
            },
        })
    }

    if (Array.isArray(options)) {
        options.forEach(processTransitionOptions)
    } else {
        processTransitionOptions(options)
    }

    barba.init({
        preventRunning: true,
        transitions: transitionObjects,
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
            targetElements.forEach((targetElement) => {
                targetElement.classList.add("is-transitioning")
                allTargets.push(targetElement)
                if (options.delay) {
                    //if element has delay, set initial keyframe value
                    Object.values(options.keyframes).forEach((value, index) => {
                        if (Array.isArray(value)) {
                            const property = Object.keys(options.keyframes)[
                                index
                            ]
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
                        animationCount ===
                        (Array.isArray(vars)
                            ? allTargets.length
                            : targetElements.length)
                    ) {
                        allTargets.forEach((target) =>
                            target.classList.remove("is-transitioning")
                        )
                        allTargets = []
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
