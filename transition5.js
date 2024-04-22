import barba from '@barba/core'

const imgs = document.querySelectorAll('.projects-link')
imgs.forEach((img) => {
    img.addEventListener('click', () => {
        img.classList.add('in-transition')
        console.log('test')
        transition(img)
    })
})

function transition(img) {
    barba.init({
        debug: true,
        from: {
            namespace: [
                'about'
            ]
        },
        transitions: [{
            leave({ current }) {
                return new Promise(resolve => {
                    const content = current.container.querySelectorAll('.projects-link:not(.in-transition), .title')
                    var imgAnimating = false
                    content.forEach((el) => {
                        el.animate({
                            opacity: 0
                        },
                            {
                                duration: 600,
                                fill: 'forwards'
                            }).onfinish = () => {
                                if (!imgAnimating) {
                                    imgAnimating = true
                                    animateImg()
                                }
                            }
                    })
                    function animateImg() {
                        img.animate(
                            {
                                width: '100%',
                            },
                            {
                                duration: 600,
                                fill: 'forwards',
                                easing: 'cubic-bezier(0,1,1,1)'
                        }).onfinish = () => resolve()
                    }
                })
            },
            afterLeave({ current }) {
            },
            enter({next}) {
                return new Promise(resolve => {
                    next.container.animate({
                        opacity: [0, 1]
                    },
                        {
                            duration: 600,
                            fill: 'forwards',
                        }).onfinish = () => resolve()
                })
            },
            afterEnter({ next }) {
                init()
            }
        }]
    })

}
