import {createMouseMotion} from './lib/scripts/createMouseMotion.js'
import {createPageTransition} from './lib/scripts/createPageTransition.js'
import {createZoomMotion} from "./lib/scripts/createZoomMotion.js";

createPageTransition({
    duration: 800,
    background: 'darkblue'
})

createMouseMotion('#js-mousechaser', {
    scope: '#js-container',
    range: 30,
    duration: 10000,
    ease: 'linear',
})

createMouseMotion('#js-mousechaser2', {
    scope: '#js-container2',
    range: 40,
})

createMouseMotion('#js-container2', {
    scope: '#js-container2',
    range: 30,
    ease: 'linear',
})

createMouseMotion('#js-mousechaser3', {
    scope: '#js-container3',
    range: -100,
    duration: 1000,
    ease: 'ease',
    returnOnLeave: false
})

createMouseMotion('#js-mousechaser4', {
    range: 100,
    duration: 1000
})

createZoomMotion('.zoom1', {
    // direction: 'in',
    // scale: 4,
    // start: 800,
    // end: 'bottom-=400'
})

createZoomMotion('.zoom2', {
    direction: 'out',
    type: 'scale',
    scale: 2,
    start: 400,
    end: 'bottom+=100',
    ease: 'ease-in-out'
})

createZoomMotion('.zoom3',{
    type: 'scale',
    scale: 40
})