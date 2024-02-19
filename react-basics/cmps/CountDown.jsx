const { useState, useEffect, useRef } = React

export function CountDown({ startFrom, onDone, toTime }) {
  const [count, setCount] = useState(toTime ? Math.floor((toTime - Date.now()) / 1000) : startFrom || 10);
  const intervalIdRef = useRef()

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount(prevCount => prevCount - 1)
    }, 1000);
    if (count === 0) {
      onDone()
      onStopTimer()
    }

    return () => {
      onStopTimer()
    };
  }, [count])

  function onStopTimer() {
    clearInterval(intervalIdRef.current)
  }

  const under7SecStyles = {
    backgroundColor: "red",
    color: "red",
  }

  return (
    <div
      className="countdown-container"
      style={count < 7 ? under7SecStyles : {}}
    >
      <h3 className="component-title">Count Down</h3>
      <div className="inner-border">{count}</div>
      <button
        onClick={() => {
          setCount(startFrom)
        }}
      >
        Reset to {startFrom}
      </button>
    </div>
  )
}
