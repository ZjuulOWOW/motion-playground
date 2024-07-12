import { useEffect } from "react"
import React from "react"
import { createPhysicsBasedMotion } from "@owowagency/gsap-motion"
import styles from "./SecondOrderDynammics.module.css"

export function Visual() {
    useEffect(() => {
        const canvas = document.getElementById("canvas")
        const container = document.getElementById("container")
        let containerWidth
        const ctx = canvas.getContext("2d")
        const demoEl = document.getElementById("demo")

        let speed
        let damping
        let response

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            speed = document.getElementById("speed").value
            damping = document.getElementById("damping").value
            response = document.getElementById("response").value
            const dynamics = createPhysicsBasedMotion(
                speed,
                damping,
                response,
                0
            )
            const positions = []
            for (let i = 0; i <= canvas.width; i++) {
                const value = dynamics.update(0.01, 100)
                positions.push(value)
            }

            ctx.beginPath()
            ctx.moveTo(0, canvas.height - canvas.height / 4)
            ctx.lineTo(50, canvas.height - canvas.height / 4)
            ctx.lineTo(50, 200)
            ctx.lineTo(canvas.width, 200)
            ctx.strokeStyle = "white"
            ctx.lineWidth = 1
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(0, canvas.height - canvas.height / 4)
            ctx.lineTo(50, canvas.height - canvas.height / 4)
            for (let i = 1; i < canvas.width; i++) {
                ctx.lineTo(
                    i + 50,
                    canvas.height - canvas.height / 4 - positions[i]
                )
            }
            ctx.strokeStyle = "rgb(212,255,122)"
            ctx.lineWidth = 5
            ctx.stroke()
        }

        update()

        window.addEventListener('resize', resize, false);

        function resize(){
            containerWidth = getComputedStyle(container).width.split("px")[0]
            canvas.width = containerWidth
            update()
        }

        resize()

        function syncInputs(sliderId, numberId) {
            const slider = document.getElementById(sliderId)
            const numberInput = document.getElementById(numberId)

            slider.addEventListener("input", function () {
                numberInput.value = this.value
                update()
            })

            numberInput.addEventListener("input", function () {
                slider.value = this.value
                update()
            })
        }
        syncInputs("speed", "speedNumber")
        syncInputs("damping", "dampingNumber")
        syncInputs("response", "responseNumber")

        let dynamics
        let endPos
        let prevEndPos
        let animation

        const demo = () => {
            endPos = dynamics.update(0.01, containerWidth - 80)
            demoEl.style.transform = `translate3d(${endPos}px, 0, 0`
            if (prevEndPos !== endPos) {
                prevEndPos = endPos
                animation = window.requestAnimationFrame(demo)
            } else console.log("finish")
        }

        const play = document.querySelector("#play")

        play.addEventListener("click", () => {
            window.cancelAnimationFrame(animation)
            dynamics = createPhysicsBasedMotion(speed, damping, response, 0)
            animation = window.requestAnimationFrame(demo)
        })
    }, [])

    return (
        <div className="container" id="container">
            <div>
                <canvas id="canvas" height="400" width="800"></canvas>
            </div>
            <div className="controls">
                <div className="inputs">
                    <div className={styles.input}>
                        <label htmlFor="speed">Speed</label>
                        <input
                            type="range"
                            min="0.01"
                            max="4"
                            step="0.01"
                            id="speed"
                        />
                        <input
                            type="number"
                            min="0.01"
                            max="4"
                            step="0.01"
                            value="1"
                            id="speedNumber"
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="damping">Damping</label>
                        <input
                            type="range"
                            min="0.01"
                            max="3"
                            step="0.01"
                            id="damping"
                        />
                        <input
                            type="number"
                            min="0.1"
                            max="3"
                            step="0.01"
                            value="1"
                            id="dampingNumber"
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="response">Response</label>
                        <input
                            type="range"
                            min="-3"
                            max="3"
                            step="0.1"
                            id="response"
                        />
                        <input
                            type="number"
                            min="-3"
                            max="3"
                            step="0.1"
                            value="0"
                            id="responseNumber"
                        />
                    </div>
                </div>
                <button className={styles.play} id="play">
                    Play
                </button>
            </div>
            <div className={styles.demo} id="demoContainer">
                <div className={styles.el} id="demo">
                    🚀
                </div>
            </div>
        </div>
    )
}
