import barba from '@barba/core'
import gsap from 'gsap'

const el = document.createElement('div')
el.setAttribute('id', 'transition')
document.body.prepend(el)

barba.init({
    debug: true,
    transitions: [{
        leave() {
            return new Promise(resolve => {
                el.classList.add('is-active')
                el.animate(
                    {
                        transform: ['translate3D(0,100vh,0)', 'translate3D(0,0,0)'], //translate3D depending on direction
                    },
                    {
                        duration: 300,
                        fill: 'forwards',
                    }).onfinish = () => resolve()
            })
        },
        afterLeave({current}) {
            current.container.remove()
        },
        enter() {
            return new Promise(resolve => {
                el.animate({
                        transform: ['translate3D(0,0,0)', 'translate3D(0,-100vh,0)'], //translate3D depending on direction
                    },
                    {
                        duration: 300,
                        fill: 'forwards',
                    }).onfinish = () => {
                    el.classList.remove('is-active')
                    resolve()
                }
            })
        }
    }]
})

