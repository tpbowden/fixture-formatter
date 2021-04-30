import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { groupBy } from "lodash";

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const beginning = moment()
  .clone()
  .startOf("month");

const loadFixtures = async (date) => {
  const today = moment().format("YYYY-MM-DD");
  const start = moment(date).format("YYYY-MM-DD");
  const end = moment(date)
    .endOf("month")
    .format("YYYY-MM-DD");

  const res = await fetch(
    `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${end}%2FstartDate%2F${start}%2FtodayDate%2F${today}%2Ftournament%2Fpremier-league%2Fversion%2F2.4.5?timeout=5`
  );
  const json = await res.json();
  const matchData = json.payload[0].body.matchData[0];

  if (!matchData) {
    return [];
  }

  const events = Object.values(matchData.tournamentDatesWithEvents)
    .map((o) => o[0].events)
    .flat();

  const matchDays = groupBy(events, (e) =>
    moment(e.startTime).format("DD/MM/YYYY")
  );

  return Object.keys(matchDays)
    .sort()
    .map((day) => [
      day,
      matchDays[day].map(
        (f) => `${f.homeTeam.name.full} v ${f.awayTeam.name.full}`
      ),
    ]);
};

const DatePicker = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {months.map((n) => (
      <option
        key={n}
        value={beginning
          .clone()
          .add(n, "months")
          .toISOString()}
      >
        {beginning
          .clone()
          .add(n, "months")
          .format("MMMM YY")}
      </option>
    ))}
  </select>
);

const Fixtures = ({ data }) => {
  const ref = useRef();
  if (!data) {
    return null;
  }

  const selectAndCopy = () => {
    ref.current.select();
    document.execCommand("copy");
    window.alert("Copied");
  };

  const text = data.map((d) => `${d[0]}\n${d[1].join("\n")}`).join("\n\n");

  return (
    <div>
      <button
        onClick={selectAndCopy}
        style={{ backgroundColor: "green", color: "white", fontSize: "16px" }}
      >
        Copy
      </button>
      <br />
      <textarea
        ref={ref}
        readOnly
        style={{ padding: "10px" }}
        rows={50}
        cols={100}
        value={text}
      />
    </div>
  );
};

export const App = () => {
  const [date, setDate] = useState(beginning.toISOString());
  const [loading, setLoading] = useState(false);
  const [fixtures, setFixtures] = useState();

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await loadFixtures(date);
        setFixtures(data);
      } catch (e) {
        alert(`It broke: ${e.message}`);
        throw e;
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [date]);

  return (
    <div>
      <h1>
        Select month: <DatePicker value={date} onChange={setDate} />
      </h1>
      <div>{loading ? "Loading..." : <Fixtures data={fixtures} />}</div>
    </div>
  );
};
