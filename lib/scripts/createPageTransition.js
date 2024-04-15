// import barba from '@barba/core'
// import {init} from '/main'

async function createPageTransition(options) {

    let barba, init
    
    await (async () => {
        barba = (await import('@barba/core')).default
        init = (await import('/main')).init
    })()

    const {
        background: motionBackground = 'black',
        image: motionImage,
        customTitle: motionCustomTitle,
        color: motionColor = 'white',
        direction: motionDirection = 'bottom top',
        duration: motionDuration = 1000,
        ease: motionEase = 'ease'
    } = options

    const directions = {
        'top': '(0,-100vh,0)',
        'bottom': '(0,100vh,0)',
        'left': '(-100vw,0,0)',
        'right': '(100vw,0,0)',
    }

    const directionIn = motionDirection.split(' ')[0]
    const directionOut = motionDirection.split(' ')[1]

    const targetElement = document.createElement('div')
    targetElement.setAttribute('id', 'transition')
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
                            borderRadius: ['25%', 0]
                        },
                        {
                            duration: motionDuration,
                            fill: 'forwards',
                            easing: motionEase
                        }).onfinish = () => resolve()
                })
            },
            afterLeave({current}) {
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

export {createPageTransition}