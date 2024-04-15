import barba from '@barba/core'

const el = document.createElement('div')
el.setAttribute('id', 'transition')
document.body.prepend(el)
var title = document.createTextNode('Title')
el.appendChild(title)

barba.init({
    debug: true,
    transitions: [{
        leave() {
            return new Promise(resolve => {
                el.classList.add('is-active')
                el.animate(
                    {
                        transform: ['translate3D(0,100vh,0)', 'translate3D(0,0,0)'], //translate3D depending on direction
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
                        transform: ['translate3D(0,0,0)', 'translate3D(0,-100vh,0)'], //translate3D depending on direction
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

