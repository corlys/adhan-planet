import React from "react";
// import "../App.css";

const TimeBox = (props) => {
  const { nation, city, time_for, timings, isLoading, meta } = props;
  if (!isLoading) {
    return (
      <>
        <div className="section__box section__box--adhan">
          <h3>{time_for}</h3>
          <h2>{timings[time_for].slice(0, 5)}</h2>
          <h4>
            {city} {meta.timezone}
          </h4>
        </div>
      </>
    );
  }
};

export default TimeBox;
