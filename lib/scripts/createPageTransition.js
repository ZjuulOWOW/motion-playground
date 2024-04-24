let pageTransitionCreated = false

async function createPageTransition(options) {
    if (pageTransitionCreated) return
    pageTransitionCreated = true

    let barba, init

    await (async () => {
        barba = (await import('@barba/core')).default
        init = (await import('/main')).init
    })()

    const {
        sync: syncOptions = false,
        leave: leaveOptions = {
            target: 'main',
            keyframes: {
                transform: 'translate3d(0,100vh,0)',
            },
            duration: 1000,
            ease: 'ease',
            delay: 0
        },
        enter: enterOptions = {
            target: 'main',
            keyframes: {
                transform: ['translate3d(0,-100vh,0)', 0],
            },
            duration: 1000,
            ease: 'ease',
            delay: 0
        },
    } = options

    barba.init({
        preventRunning: true,
        transitions: [{
        sync: syncOptions,
            leave({ current }) {
                document.body.classList.add('is-transitioning')
                return new Promise(resolve => {
                    animateElement(leaveOptions, resolve, current.container)
                })
            },
            afterLeave({current}){
                current.container.remove()
            },
            enter({ next }) {
                return new Promise(resolve => {
                    animateElement(enterOptions, resolve, next.container)
                })
            },
            afterEnter({next}){
                document.body.classList.remove('is-transitioning')
                next.container.classList.remove('is-transitioning')
                init()
            },
        }]
    })

    function animateElement(vars, resolve, thisContainer) {
        let animationCount = 0
        const scrollY = window.scrollY
        thisContainer.classList.add('is-transitioning')
        thisContainer.scrollTo(0, scrollY)
        const processAnimation = (options) => {
            const targetElement = options.target === 'main' ? thisContainer : document.querySelector(options.target)
            targetElement.classList.add('is-transitioning')
            targetElement.animate(
                options.keyframes,
                {
                    duration: options.duration,
                    fill: 'forwards',
                    easing: options.ease,
                    delay: options.delay
                }
            ).onfinish = () => {
                animationCount++
                if (animationCount === (Array.isArray(vars) ? leaveOptions.length : 1)) {
                    targetElement.classList.remove('is-transitioning')
                    return resolve()
                }
            }
        }
        Array.isArray(vars) ? vars.forEach(processAnimation) : processAnimation(vars)
    }
}

export { createPageTransition }