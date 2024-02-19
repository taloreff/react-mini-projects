const { useState, useEffect, useRef } = React;
import { utilService } from "../services/util.service.js";

export function SeasonClock() {
  const [isDark, setIsDark] = useState(false);
  const [date, setDate] = useState(new Date());
  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      onStopTimer();
    };
  }, []);

  function getSeason() {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) {
      return "Spring";
    } else if (month >= 5 && month <= 8) {
      return "Summer";
    } else if (month >= 9 && month <= 10) {
      return "Autumn";
    } else {
      return "Winter";
    }
  }

  function onStopTimer() {
    clearInterval(intervalIdRef.current);
  }

  function toggleDarkMode() {
    setIsDark(prevIsDark => !prevIsDark);
  }

  const dynClass = isDark ? "dark" : "light";

  return <div className={`season-container ${dynClass}`} onClick={toggleDarkMode}>
    <h1 className="header-title">Season Clock</h1>
    <h1>
      {utilService.getMonthName(date)} ({getSeason()})
    </h1>
    <img src={`../seasons/${getSeason().toLowerCase()}.png`} alt="season" />
    <h2>{utilService.getDayName(date, "en")}</h2>
    <div className="clock">{date.toLocaleTimeString()}</div>
  </div>
}
