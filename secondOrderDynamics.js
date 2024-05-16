import Chart from "chart.js/auto"
import gsap from "gsap"
import {
    createPhysicsBasedMotion,
    getMousePosition,
} from "@owowagency/gsap-motion"

const recordChart = document.getElementById("recordChart").getContext("2d")
const visualisationChart = document
    .getElementById("visualisationChart")
    .getContext("2d")

let mouseX
let mouseY
let moveToX
let moveToY
const cursor = document.querySelector(".cursor")
let dynamicsX = createPhysicsBasedMotion(1, 1.5, 1, 0)
let dynamicsY = createPhysicsBasedMotion(1, 1.5, 1, 0)
let mousePositions = []
let elPositions = []
let timeStamps = []
let recordMotion = document.getElementById("recordMotion")
let chart1
let chart2

let damping = parseFloat(document.getElementById("damping").value)
let speed = parseFloat(document.getElementById("speed").value)
let response = parseFloat(document.getElementById("response").value)

const dt = 0.1
const totalTime = 10

let xp = 0
let y = 0
let yd = 0

let timePoints = []
let positionPoints = []

for (let t = 0; t <= totalTime; t += dt) {
    const k1 = damping / (Math.PI * speed)
    const k2 = 1 / (2 * Math.PI * speed * (2 * Math.PI * speed))
    const k3 = (response * damping) / (2 * Math.PI * speed)

    const xd = (Math.sin(t) - xp) / dt
    yd =
        yd +
        (dt * (Math.sin(t) + k3 * xd - y - k1 * yd)) /
            Math.max(k2, (dt * dt) / 2 + dt * k1)

    y = y + dt * yd

    timePoints.push(t)
    positionPoints.push(y)

    xp = y
}

const update = () => {
    if (chart2) {
        timePoints = []
        positionPoints = []
        chart2.destroy()
    }
    damping = parseFloat(document.getElementById("damping").value)
    speed = parseFloat(document.getElementById("speed").value)
    response = parseFloat(document.getElementById("response").value)
    dynamicsX = createPhysicsBasedMotion(speed, damping, response, 0)
    dynamicsY = createPhysicsBasedMotion(speed, damping, response, 0)
    plotVisualisationChart()
}

gsap.ticker.add(() => {
    moveToX = getMousePosition().client.x
    moveToY = getMousePosition().client.y
    mouseX = dynamicsX.update(17 / 1000, moveToX)
    console.log(mouseX)
    mouseY = dynamicsY.update(17 / 1000, moveToY)
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
})

function getGraphValues() {
    mousePositions.push(moveToX)
    elPositions.push(mouseX)
    timeStamps.push("") // veranderen in timestamps?
}

function plotGraph() {
    chart1 = new Chart(recordChart, {
        type: "line",
        data: {
            labels: timeStamps,
            datasets: [
                {
                    label: "Mouse position X",
                    data: mousePositions,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Element position X",
                    data: elPositions,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    })
}

recordMotion.addEventListener("click", () => {
    if (chart1) {
        chart1.destroy()
    }
    timeStamps = []
    mousePositions = []
    elPositions = []
    window.addEventListener("mousemove", getGraphValues)
    setTimeout(() => {
        window.removeEventListener("mousemove", getGraphValues)
        plotGraph()
    }, 3000)
})

const allInput = document.querySelectorAll(".physicsInput")
allInput.forEach((input) => input.addEventListener("input", update))

function plotVisualisationChart() {
    chart2 = new Chart(visualisationChart, {
        type: "line",
        data: {
            labels: timePoints,
            datasets: [
                {
                    label: "Mouse position X",
                    data: positionPoints,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Element position X",
                    data: elPositions,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    })
}

console.log("Time:", timePoints)
console.log("Position:", positionPoints)

update()    