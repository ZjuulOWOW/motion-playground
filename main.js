import { createMouseMotion } from './lib/scripts/createMouseMotion.js'
import { createPageTransition } from './lib/scripts/createPageTransition.js'
import { createZoomMotion } from "./lib/scripts/createZoomMotion.js"

function init() { //createMotion()?
    // createPageTransition({
    //     sync: true,
    //     leave:[
    //         {
    //         target: '.barba-wrapper',
    //         keyframes:{
    //                 transform: 'scale(.5)',
    //             },
    //         duration: 1000,
    //         ease: 'ease-out',
    //     },
    //     {
    //         target: 'main',
    //         keyframes: {
    //             transform: 'translate3d(0,-100vh,0)',
    //         },
    //         duration: 1500,
    //         ease: 'ease',
    //     },
    //     ],
    //     enter:[{
    //         target: 'main',
    //         keyframes: {
    //             transform: ['translate3d(0,100vh,0)', 'translate3d(0,0,0)'],
    //         },
    //         duration: 1500,
    //         ease: 'ease',
    //     },
    //     {
    //         target: '.barba-wrapper',
    //         keyframes: {
    //             transform: 'scale(1)'
    //         },
    //         duration: 1000,
    //         ease: 'ease',
    //         delay: 1000
    //     }
    // ]
    // })

    createPageTransition({
        leave: [{
            target: '.barba-wrapper',
            keyframes: {
                transform: 'scale(.5)',
            },
            duration: 2000,
            ease: 'ease-out',
        },
        {
            target: '#motion-transition',
            keyframes: {
                clipPath: ['inset(100% 0 0 0)', 'inset(0 0)'],
            },
            duration: 750,
            ease: 'ease',
        },
        {
            target: 'main',
            keyframes: {
                transform: 'translate3d(0,160px,0)',
                opacity: 0
            },
            duration: 1250,
            ease: 'ease',
        },
        {
            target: '.transition-title',
            keyframes: {
                transform: ['translate3d(0,100%,0)', 'translate3d(0,-100%,0)'],
                opacity: [0, 1, 1]
            },
            duration: 1250,
            ease: 'cubic-bezier(0,.75,1,.25)',
            delay: 750
        }
        ],
        enter: [{
            target: '.barba-wrapper',
            keyframes: {
                transform: 'scale(1)',
            },
            duration: 1250,
            ease: 'ease',
        },
        {
            target: '#motion-transition',
            keyframes: {
                clipPath: ['inset(0 0)', 'inset(0 0 100% 0)'],
            },
            duration: 750,
            ease: 'ease',
        },
        {
            target: 'main',
            keyframes: {
                opacity: [0, 1]
            },
            duration: 1250,
            ease: 'ease',
        }
        ]
    })

    createMouseMotion('#js-mousechaser', {
        scope: '#js-container',
        range: 90,
        duration: 1000,
        ease: 'linear',
        use3D: true
    })

    createMouseMotion('#js-mousechaser2', {
        scope: '#js-container2',
        range: 20,
        duration: 1600,
        use3D: true
    })

    createMouseMotion('#js-container2', {
        scope: '#js-container2',
        range: 10,
        duration: 1600,
    })

    createMouseMotion('#js-mousechaser3', {
        scope: '#js-container3',
        range: -100,
        ease: 'ease',
        returnOnLeave: false,
        duration: 800
    })

    createMouseMotion('#js-mousechaser4', {
        range: 100,
        duration: 800
    })

    createZoomMotion('.zoom1', {
        scale: 4,
        start: 800,
    })

    createZoomMotion('.zoom2-mask', {
        direction: 'in',
        clipContainer: '.zoom2-container',
        start: 400,
        end: 'bottom+=2000',
        ease: 'expo',
        scale: 4
    })

    // createZoomMotion('.zoom3',{
    //     type: 'scale',
    //     scale: 40
    // })
}
init()

export { init }