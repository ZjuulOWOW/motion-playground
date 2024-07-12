import { useEffect, useState } from "react"
export function Codepen({src}) {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>
            {isClient && (
                <iframe
                    height="600"
                    style={{ width: "100%" }}
                    scrolling="no"
                    title="createPhysicsBasedMotion() basic demo"
                    src={src}
                    loading="lazy"
                    allowtransparency="true"
                >
                    See the Pen{" "}
                    <a href="https://codepen.io/qztweede/pen/abrvXdb">
                        createPhysicsBasedMotion() basic demo
                    </a>{" "}
                    by QZtweede (
                    <a href="https://codepen.io/qztweede">@qztweede</a>) on{" "}
                    <a href="https://codepen.io">CodePen</a>.
                </iframe>
            )}
        </>
    )
}
