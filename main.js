import {createMouseMotion} from './lib/scripts/createMouseMotion.js'
import {createPageTransition} from './lib/scripts/createPageTransition.js'
import {createZoomMotion} from "./lib/scripts/createZoomMotion.js";
//
// createPageTransition({
//     duration: 800,
//     background: 'darkblue'
// })

createMouseMotion('#js-mousechaser', {
    scope: '#js-container',
    range: 30,
    duration: 10000,
    ease: 'linear',
})

createMouseMotion('#js-mousechaser2', {
    scope: '#js-container2',
    range: 40,
    duration: 800
})

createMouseMotion('#js-container2', {
    scope: '#js-container2',
    range: 30,
    duration: 800
})

createMouseMotion('#js-mousechaser3', {
    scope: '#js-container3',
    range: -100,
    ease: 'ease',
    returnOnLeave: false
})

createMouseMotion('#js-mousechaser4', {
    range: 100,
    duration: 0
})

createZoomMotion('.zoom1', {
    scale: 4,
    start: 800,
})

createZoomMotion('.zoom2', {
    direction: 'out',
    scale: 20,
    start: 732,
    end: 'bottom+=2000',
    path: '#path'
})

createZoomMotion('.zoom3',{
    type: 'scale',
    scale: 40
})