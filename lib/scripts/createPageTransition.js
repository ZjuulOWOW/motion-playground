import barba from '@barba/core'

function createPageTransition(options){
    const {
        background = 'black',
        image,
        customTitle,
        color = 'white',
        direction = 'bottom top',
        duration = 1000,
        ease = 'ease'
    } = options

    const directions = {
        'top' : '(0,-100vh,0)',
        'bottom' : '(0,100vh,0)',
        'left' : '(-100vw,0,0)',
        'right' : '(100vw,0,0)',
    }

    const directionIn = direction.split(' ')[0]
    const directionOut = direction.split(' ')[1]

    const el = document.createElement('div')
    el.setAttribute('id', 'transition')
    document.body.prepend(el)

    const links = document.querySelectorAll('a')
    links.forEach((link) => {
        link.addEventListener('click', () =>{
            var title = document.createTextNode(link.innerHTML)
            el.innerHTML = ''
            el.appendChild(title)
        })
    })

    barba.init({
        debug: true,
        transitions: [{
            leave() {
                return new Promise(resolve => {
                    el.classList.add('is-active')
                    el.animate(
                        {
                            transform: [`translate3D${directions[directionIn]}`, 'translate3D(0,0,0)'],
                            borderRadius: ['25%', 0]
                        },
                        {
                            duration: 600,
                            fill: 'forwards',
                            easing: 'ease'
                        }).onfinish = () => resolve()
                })
            },
            afterLeave({current}) {
                current.container.remove()
            },
            enter() {
                return new Promise(resolve => {
                    el.animate({
                            transform: ['translate3D(0,0,0)', `translate3D${directions[directionOut]}`],
                        },
                        {
                            duration: 600,
                            fill: 'forwards',
                            easing: 'ease'
                        }).onfinish = () => {
                        el.classList.remove('is-active')
                        resolve()
                    }
                })
            }
        }]
    })

}

export {createPageTransition}