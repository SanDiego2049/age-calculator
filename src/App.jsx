import { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [age, setAge] = useState({
    years: "",
    months: "",
    days: "",
  });

  const [isDateEntered, setIsDateEntered] = useState(false);

  const handleChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentDay = new Date().getDate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthYear = parseInt(date.year);
    const birthMonth = parseInt(date.month);
    const birthDay = parseInt(date.day);

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
      // Handle invalid input gracefully
      console.log("Invalid date input.");
      return;
    }

    let ageYears = currentYear - birthYear;
    let ageMonths = currentMonth - birthMonth;
    let ageDays = currentDay - birthDay;

    // Handle if birth month/day hasn't occurred yet this year
    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears -= 1;
    }

    if (ageDays < 0) {
      const daysInPreviousMonth = new Date(
        currentYear,
        currentMonth - 1,
        0
      ).getDate(); // Get the last day of the previous month
      ageDays += daysInPreviousMonth;
      ageMonths -= 1;
    }

    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    });
    
    if (birthYear && birthMonth && birthDay) {
      setIsDateEntered(true);
    }

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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="calculate">
          <div className="black-line"></div>
          <button type="submit" className="btn">
            <i class="fa fa-long-arrow-down"></i>
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

// MY CODE BEFORE CHATGPT INTERVENTION. LEARN FROM IT
// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [date, setDate] = useState({
//     day: 0,
//     month: 0,
//     year: 0,
//   });
//   const [isDateEntered, setIsDateEntered] = useState(false);

//   const handleChange = (e) => {
//     console.log(date);
//     setDate({ ...date, [e.target.name]: e.target.value });
//   };

//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth();
//   const currentDay = new Date().getDate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const dayOfBirth = currentDay - date.day;
//     const monthOfBirth = currentMonth - date.month;
//     const yearOfBirth = currentYear - date.year;
//     if (dayOfBirth && monthOfBirth && yearOfBirth) {
//       setIsDateEntered(true);
//     }
//     setDate({ ...date, day: dayOfBirth, month: monthOfBirth, year: yearOfBirth })
//   };

//   return (
//     <>
//       <form className="card" onSubmit={handleSubmit}>
//         <div className="details">
//           <div className="input-age">
//             <label className="card-label" htmlFor="day">
//               Day
//             </label>
//             <input
//               min={1}
//               max={31}
//               className="card-input"
//               type="number"
//               name="day"
//               id="day"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="input-age">
//             <label className="card-label" htmlFor="month">
//               Month
//             </label>
//             <input
//               min={1}
//               max={12}
//               className="card-input"
//               type="number"
//               name="month"
//               id="month"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="input-age">
//             <label className="card-label" htmlFor="year">
//               Year
//             </label>
//             <input
//               min={1900}
//               max={2025}
//               className="card-input"
//               type="number"
//               name="year"
//               id="year"
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="calculate">
//           <div className="black-line"></div>
//           <button type="submit" className="btn">
//             ⬇️
//           </button>
//         </div>
//         <div className="age-display">
//           <h1>
//             {isDateEntered ? (
//               <span className="variable">{date.year}</span>
//             ) : (
//               <span className="variable">{"--"}</span>
//             )}{" "}
//             years
//           </h1>
//           <h1>
//             {isDateEntered ? (
//               <span className="variable">{date.month}</span>
//             ) : (
//               <span className="variable">{"--"}</span>
//             )}{" "}
//             months
//           </h1>
//           <h1>
//             {isDateEntered ? (
//               <span className="variable">{date.day}</span>
//             ) : (
//               <span className="variable">{"--"}</span>
//             )}{" "}
//             days
//           </h1>
//         </div>
//       </form>
//     </>
//   );
// }

// export default App;
