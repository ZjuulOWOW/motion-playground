import Chart from "chart.js/auto"
import gsap from "gsap"
import { createPhysicsBasedMotion, getMousePosition } from "@owowagency/gsap-motion";
let myChart

let mouseX
    let mouseY
    let moveToX
    let moveToY
    const cursor = document.querySelector(".cursor")
    let dynamicsX = createPhysicsBasedMotion(1, 1.5, 1, 0)
    let dynamicsY = createPhysicsBasedMotion(1, 1.5, 1, 0)

    gsap.ticker.add(() => {
        moveToX = getMousePosition().client.x
        moveToY = getMousePosition().client.y
        mouseX = dynamicsX.update(17 / 1000, moveToX)
        mouseY = dynamicsY.update(17 / 1000, moveToY)
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    })

// Function to calculate the displacement of a second-order dynamic system
function calculateDisplacement(time, damping, speed, response) {
    const omega_n = speed
    const zeta = damping
    
    const omega_d = omega_n * Math.sqrt(1 - zeta ** 2)
    const phi = Math.atan((omega_d * response) / (zeta * omega_n * response))

    const displacement =
        response *
        Math.exp(-zeta * omega_n * time) *
        Math.cos(omega_d * time + phi)
    return displacement
}

// Function to update the chart with new parameters
function update() {
    const damping = parseFloat(document.getElementById("damping").value)
    const speed = parseFloat(document.getElementById("speed").value)
    const response = parseFloat(document.getElementById("response").value)
    console.log(
        `speed: ${speed}`,
        `damping: ${damping}`,
        `response: ${response}`
    )

    const data = []
    for (let t = 0; t <= 5; t += 0.1) {
        const displacement = calculateDisplacement(t, damping, speed, response)
        data.push({ x: t, y: displacement })
    }

    if (!myChart) {
        const canvas = document.getElementById("myChart")
        const ctx = canvas.getContext("2d")

        myChart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Displacement vs Time",
                        data: data,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                        fill: false,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "Time",
                        },
                    },
                    y: {
                        min: -5,
                        max: 5,
                        type: "linear",
                        position: "left",
                        title: {
                            display: true,
                            text: "Displacement",
                        },
                    },
                },
            },
        })
    } else {
        myChart.data.datasets[0].data = data
        myChart.update()
    }

    dynamicsX = createPhysicsBasedMotion(speed, damping, response, 0)
    dynamicsY = createPhysicsBasedMotion(speed, damping, response, 0)

}

// Add input event listeners to update the chart when inputs change
document.getElementById("damping").addEventListener("input", update)
document.getElementById("speed").addEventListener("input", update)
document.getElementById("response").addEventListener("input", update)

// Initial chart rendering
update()
