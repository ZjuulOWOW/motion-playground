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
        type: motionType = 'overlay',
        background: motionBackground = 'black',
        image: motionImage,
        customTitle: motionCustomTitle,
        color: motionColor = 'white',
        direction: motionDirection = 'bottom top',
        duration: motionDuration = 1000,
        ease: motionEase = 'ease',
        WAAPIvarsLeave,
        WAAPIvarsEnter
    } = options

    const directions = {
        'top': '(0,-100vh,0)',
        'bottom': '(0,100vh,0)',
        'left': '(-100vw,0,0)',
        'right': '(100vw,0,0)',
    }

    const directionIn = motionDirection.split(' ')[0]
    const directionOut = motionDirection.split(' ')[1]

    switch (motionType) {
        case 'overlay':
            overlay()
            break
        case 'flow':
            flow()
            break
    }

    function overlay() {
        const targetElement = document.createElement('div')
        targetElement.setAttribute('id', 'motion-transition')
        document.body.prepend(targetElement)

        if (!motionCustomTitle) {
            const links = document.querySelectorAll('a')
            links.forEach((link) => {
                link.addEventListener('click', () => {
                    targetElement.innerHTML = ''
                    targetElement.appendChild(document.createTextNode(link.innerHTML))
                })
            })
        } else {
            targetElement.appendChild(document.createTextNode(motionCustomTitle))
        }

        targetElement.style.backgroundColor = motionBackground
        targetElement.style.color = motionColor

        barba.init({
            debug: true,
            transitions: [{
                leave() {
                    return new Promise(resolve => {
                        targetElement.classList.add('is-active')
                        targetElement.animate(
                            {
                                transform: [`translate3D${directions[directionIn]}`, 'translate3D(0,0,0)'],
                                ...WAAPIvarsLeave
                            },
                            {
                                duration: motionDuration,
                                fill: 'forwards',
                                easing: motionEase,
                            }).onfinish = () => resolve()
                    })
                },
                afterLeave({ current }) {
                    current.container.remove()
                },
                beforeEnter() {
                    init()
                },
                enter() {
                    return new Promise(resolve => {
                        targetElement.animate({
                            transform: ['translate3D(0,0,0)', `translate3D${directions[directionOut]}`],
                        },
                            {
                                duration: motionDuration,
                                fill: 'forwards',
                                easing: motionEase
                            }).onfinish = () => {
                                targetElement.classList.remove('is-active')
                                resolve()
                            }
                    })
                }
            }]
        })
    }

    function flow() {
        barba.init({
            debug: true,
            preventRunning: true,
            transitions: [{
                sync: true,
                beforeLeave({ current }){
                    var prevScrollX = window.scrollX
                    var prevScrollY = window.scrollY
                    current.container.classList.add('unload')
                    current.container.scrollTo(prevScrollX, prevScrollY)
                    window.scrollTo(0, 0)
                },
                leave({ current }) {
                    return new Promise(resolve => {
                        document.body.classList.add('transition')
                        current.container.animate(
                            {
                                transform: `translate3D${directions[directionIn]} scale(.9)`, //translate3D depending on direction
                                filter: 'brightness(0)'
                            },
                            {
                                duration: 1000,
                                fill: 'forwards',
                                easing: 'linear'
                            }).onfinish = () => resolve()
                    })
                },
                afterLeave({ current }) {
                    current.container.remove()
                },
                enter({ next }) {
                    next.container.classList.add('load')
                    return new Promise(resolve => {
                        next.container.animate({
                            transform: [`translate3D${directions[directionOut]}`, 'translate3D(10px,0,0)'],
                        },
                            {
                                duration: 800,
                                fill: 'forwards',
                                easing: 'cubic-bezier(0,1,1,1)'
                            }).onfinish = () => {
                                resolve()
                            }
                    })
                },
                afterEnter({ next }) {
                    next.container.classList.remove('load')
                    document.body.classList.remove('transition')
                    init()
                }
            }]
        })
    }

}

export { createPageTransition }