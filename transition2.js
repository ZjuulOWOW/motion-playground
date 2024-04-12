import barba from '@barba/core'

var inTransition = true

barba.init({
    debug: true,
    preventRunning: true,
    transitions: [{
        sync: true,
        leave({current}) {
            return new Promise(resolve => {
                current.container.animate(
                    {
                        transform: 'translate3D(0,-100vh,0) scale(.8)', //translate3D depending on direction
                        filter: 'brightness(0)'
                    },
                    {
                        duration: 1600,
                        fill: 'forwards',
                        easing: 'linear'
                    }).onfinish = () => {
                    resolve()
                    inTransition = false
                }

            })

        },
        afterLeave({current}) {
            current.container.remove()
        },
        enter({next}) {
            return new Promise(resolve => {
                const clip = next.container.querySelector('.clip')
                const title = next.container.querySelector('.title')
                clip.classList.add('is-transitioning')
                title.classList.add('is-transitioning')
                next.container.animate({
                        transform: ['translate3D(0,100vh,0)', 'translate3D(0,0,0)'], //translate3D depending on direction
                    },
                    {
                        duration: 400,
                        fill: 'forwards',
                        easing: 'cubic-bezier(0,1,1,1)'
                    }).onfinish = () => {
                    clip.animate({
                            maxHeight: [0, '200px']
                        },
                        {
                            duration: 600,
                            fill: 'forwards',
                            easing: 'cubic-bezier(0,1,1,1)'
                        }).onfinish = () => {
                        title.animate({
                                transform: ['translate3D(0, 100%, 0)', 'translate3D(0, 0, 0)'],
                                },
                            {
                                duration: 800,
                                fill: 'forwards',
                                easing: 'cubic-bezier(0,1,1,1)'
                            }).onfinish = () => resolve()
                    }
                }
            })
        }
    }]
})

