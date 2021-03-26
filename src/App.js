import React, { useState, useEffect } from "react";

import "./App.css";
import AdhanBox from "./component/TimeBox.component";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [city, setCity] = useState("Bekasi");
  const [nation, setNation] = useState("Indonesia");
  const [prayerTime, setPrayerTime] = useState({});
  const [prayers, setPrayers] = useState([
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ]);

  // const getPrayerTime = async () => {
  //   try {
  //     const today = new Date();
  //     const response = await fetch(
  //       `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${nation}&method=3&month=${
  //         today.getMonth() + 1
  //       }&year=${today.getFullYear()}`
  //     );
  //     const prayerTimeApi = await response.json();
  //     let prayerTimeToday = prayerTimeApi.data.filter((obj) => {
  //       const compare = new Date(obj.date.readable);
  //       return today.getDate() === compare.getDate();
  //     });
  //     // console.log(prayerTimeToday[0].timings.Fajr);
  //     setPrayerTime((prevState) => {
  //       prevState = prayerTimeToday[0];
  //       return prevState;
  //     });
  //     setIsLoading(false);
  //     // console.log(prayerTimeToday);
  //     // console.log(prayerTime);
  //   } catch (error) {
  //     setIsError("Internet Error");
  //   }
  // };

  useEffect(() => {
    const today = new Date();
    fetch(
      `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${nation}&method=3&month=${
        today.getMonth() + 1
      }&year=${today.getFullYear()}`
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        }
        setIsLoading(false);
        setIsError(true);
        throw new Error(res.statusText);
      })
      .then((adzan) => {
        let prayerTimeToday = adzan.data.filter((obj) => {
          const compare = new Date(obj.date.readable);
          return today.getDate() === compare.getDate();
        });
        setPrayerTime((prevState) => {
          prevState = prayerTimeToday[0];
          return prevState;
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="adhan">
      {isError && <h1>Somethings Wrong...</h1>}
      {isLoading && <h1>Loading...</h1>}
      {isLoading ||
        prayers.map((time_for) => {
          return (
            <AdhanBox
              nation={nation}
              city={city}
              time_for={time_for}
              isLoading={isLoading}
              {...prayerTime}
              key={time_for}
            />
          );
        })}
    </section>
  );
};

export default App;
