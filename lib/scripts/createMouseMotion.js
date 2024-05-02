async function createMouseMotion(target, options) {
    const targetElement = document.querySelector(target)
    if (!targetElement) return

    let customEases, elastic, bounce, toLinear

    await (async () => {
        ;(customEases = (await import("./customEases.js")).customEases),
            (elastic = (await import("./customEases.js")).elastic),
            (bounce = (await import("./customEases.js")).bounce),
            (toLinear = (await import("./customEases.js")).toLinear)
    })()

    const {
        scope: motionScope,
        range: motionRange = 100,
        ease: motionEase = "ease",
        duration: motionDuration = 0,
        returnOnLeave: motionReturnOnLeave = true,
        easeOnLeave: motionEaseOnLeave = "elastic",
        use3D: motionUse3D = false,
    } = options

    const motionContainer = motionScope
        ? document.querySelector(motionScope)
        : document

    const motionContainerBounds =
        motionScope && motionContainer.getBoundingClientRect()
    const initialScrollX = window.scrollX
    const initialScrollY = window.scrollY

    let targetBounds = targetElement.getBoundingClientRect()

    let targetX =
        targetBounds.x +
        (targetBounds.right - targetBounds.x) / 2 +
        window.scrollX
    let targetY =
        targetBounds.y +
        (targetBounds.bottom - targetBounds.y) / 2 +
        window.scrollY

    const setBounds = () => {
        targetBounds = targetElement.getBoundingClientRect()
        targetX =
            targetBounds.x +
            (targetBounds.right - targetBounds.x) / 2 +
            window.scrollX
        targetY =
            targetBounds.y +
            (targetBounds.bottom - targetBounds.y) / 2 +
            window.scrollY
    }
    setBounds()
    window.addEventListener("resize", () => {
        setBounds()
    })

    var prevMouseX
    var prevMouseY
    var prevScrollX = 0
    var prevScrollY = 0
    var elRotateX
    var elRotateY

    const motionTiming = {
        easing: motionEase,
        fill: "forwards",
        duration: motionDuration,
    }

    motionContainer.addEventListener("mousemove", (e) => {
        if (motionUse3D) {
            elRotateX =
                (e.pageY -
                    (motionContainerBounds.top + initialScrollY) -
                    motionContainerBounds.height / 2) /
                (motionContainerBounds.height / 100)
            elRotateY =
                (e.pageX -
                    (motionContainerBounds.left + initialScrollX) -
                    motionContainerBounds.width / 2) /
                (motionContainerBounds.width / 100)
        }
        applyMouseMotion(e)
    })

    motionContainer.addEventListener("scroll", () => {
        if (prevMouseX && prevMouseY) {
            prevMouseY = prevMouseY + (scrollY - prevScrollY)
            prevScrollY = scrollY
            prevMouseX = prevMouseX + (scrollX - prevScrollX)
            prevScrollX = scrollX
            applyMouseMotion()
        }
    })

    function applyMouseMotion(e) {
        console.log('start tween')
        if (motionUse3D) {
            targetElement.animate(
                {
                    transform: `translate3D(${
                        -(targetX - (e ? e.pageX : prevMouseX)) /
                        (100 / motionRange)
                    }px,${
                        -(targetY - (e ? e.pageY : prevMouseY)) /
                        (100 / motionRange)
                    }px,0) 
                    rotateY(${elRotateY}deg) rotateX(${-elRotateX}deg)`,
                },
                motionTiming
            ).onfinish = () => {
                console.log('end tween')
            }
        } else {
            targetElement.animate(
                {
                    transform: `translate3D(${
                        -(targetX - (e ? e.pageX : prevMouseX)) /
                        (100 / motionRange)
                    }px,${
                        -(targetY - (e ? e.pageY : prevMouseY)) /
                        (100 / motionRange)
                    }px,0)`,
                },
                motionTiming
            )
        }
        prevMouseY = e ? e.pageY : prevMouseY
        prevMouseX = e ? e.pageX : prevMouseX
    }


    if (motionReturnOnLeave) {
        motionContainer.addEventListener("mouseleave", (e) => {
            targetElement.animate(
                {
                    transform: "translate3D(0,0,0)",
                },
                {
                    duration: 1200,
                    fill: "forwards",
                    easing: customEases.includes(motionEaseOnLeave)
                        ? toLinear(eval(motionEaseOnLeave))
                        : motionEaseOnLeave,
                }
            )
        })
    }
}

export { createMouseMotion }
