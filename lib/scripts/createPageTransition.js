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

    var href
    var el = document.createElement('div')
    var title = document.querySelector('.title')

    el.setAttribute('id', 'transition')
    document.body.prepend(el)
    el.style.background = background
    el.style.color = color

    document.querySelectorAll('a').forEach((a) =>{
        a.addEventListener('click', (e)=>{
            href = a.getAttribute('href')
            title = document.createTextNode(customTitle ? customTitle : href)
            el.appendChild(title)
            if(href!=null) {
                e.preventDefault()
                el.animate(
                    [
                        {transform: 'translate3D(0,100%,0 )', borderRadius: '50%'},
                        {transform: 'translate3D(0,0,0 )', borderRadius: 0},
                    ],
                    {
                        duration: duration,
                        easing: 'ease-in-out',
                        fill: "forwards"
                    }
                )
                setTimeout(function () {
                    window.location.href = href
                }, duration)
            }
        })
    })

    window.addEventListener('pageshow', (e)=>{
        el.animate(
            [
                { transform: 'translate3D(0,0,0 )', borderRadius: '0' },
                { transform: 'translate3D(0,-100%,0 )', borderRadius: '50%' }
            ],
            {
                duration: duration,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        )
    })
}

export {createPageTransition}