import { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const [isDateEntered, setIsDateEntered] = useState(false);

  const handleChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const isValidDate = (day, month, year) => {
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthYear = parseInt(date.year);
    const birthMonth = parseInt(date.month);
    const birthDay = parseInt(date.day);

    if (!isValidDate(birthDay, birthMonth, birthYear)) {
      console.log("Invalid date entered.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    let ageYears = currentYear - birthYear;
    let ageMonths = currentMonth - birthMonth;
    let ageDays = currentDay - birthDay;

    if (
      birthMonth > currentMonth ||
      (birthMonth === currentMonth && birthDay > currentDay)
    ) {
      ageYears -= 1;
    }

    if (ageDays < 0) {
      const daysInPrevMonth = new Date(
        currentYear,
        currentMonth - 1,
        0
      ).getDate();
      ageDays += daysInPrevMonth;
      ageMonths -= 1;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
    setIsDateEntered(true);
  };

  return (
    <>
      <form className="card" onSubmit={handleSubmit}>
        <div className="details">
          <div className="input-age">
            <label className="card-label" htmlFor="day">
              Day
            </label>
            <input
              min={1}
              max={31}
              className="card-input"
              type="number"
              name="day"
              id="day"
              value={date.day}
              onChange={handleChange}
            />
          </div>
          <div className="input-age">
            <label className="card-label" htmlFor="month">
              Month
            </label>
            <input
              min={1}
              max={12}
              className="card-input"
              type="number"
              name="month"
              id="month"
              value={date.month}
              onChange={handleChange}
            />
          </div>
          <div className="input-age">
            <label className="card-label" htmlFor="year">
              Year
            </label>
            <input
              min={1900}
              max={2025}
              className="card-input"
              type="number"
              name="year"
              id="year"
              value={date.year}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="calculate">
          <div className="black-line"></div>
          <button type="submit" className="btn">
            <i className="fa fa-long-arrow-down"></i>
          </button>
        </div>
        <div className="age-display">
          <h1>
            {isDateEntered ? (
              <span className="variable">{age.years}</span>
            ) : (
              <span className="variable">{"--"}</span>
            )}{" "}
            years
          </h1>
          <h1>
            {isDateEntered ? (
              <span className="variable">{age.months}</span>
            ) : (
              <span className="variable">{"--"}</span>
            )}{" "}
            months
          </h1>
          <h1>
            {isDateEntered ? (
              <span className="variable">{age.days}</span>
            ) : (
              <span className="variable">{"--"}</span>
            )}{" "}
            days
          </h1>
        </div>
      </form>
    </>
  );
}

export default App;
