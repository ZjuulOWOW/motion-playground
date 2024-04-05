import {createMouseMotion} from "./scripts/lib/createMouseMotion.js";

createMouseMotion('#js-mousechaser', {
    scope: '#js-container',
    stiffness: 3,
    ease: 'linear'
})

createMouseMotion('#js-mousechaser2', {
    scope: '#js-container2',
    stiffness: 3,
    ease: 'ease-in-out',
    easeOnLeave: 'ease-in-out'
})

createMouseMotion('#js-container2', {
    scope: '#js-container2',
    stiffness: 3,
    ease: 'linear',
    easeOnLeave: 'elastic'
})

createMouseMotion('#js-mousechaser3', {
    scope: '#js-container3',
    stiffness: 1,
    damping: 6000,
    ease: 'ease',
    returnOnLeave: false
})

createMouseMotion('#js-mousechaser4', {
    stiffness: 1,
    damping: 1000
})