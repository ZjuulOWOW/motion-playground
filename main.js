import {createMouseMotion} from './lib/scripts/createMouseMotion.js'
import {createPageTransition} from './lib/scripts/createPageTransition.js'
import {createZoomMotion} from "./lib/scripts/createZoomMotion.js"

function init(){ //createMotion()?
    createPageTransition({
        duration: 500,
        direction: 'top bottom',
        background: 'black',
        color: 'pink',
        customTitle: 'Custom',
        type: 'flow'
    })

    createMouseMotion('#js-mousechaser', {
        scope: '#js-container',
        range: 10,
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

    createZoomMotion('.zoom2', {
        direction: 'out',
        path: '#path',
        end: 'bottom+=1000',
        ease: 'expo'
    })

    createZoomMotion('.zoom3',{
        type: 'scale',
        scale: 40
    })
}
init()

export {init}