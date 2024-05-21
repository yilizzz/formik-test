import "./App.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getResult } from "./getResult";
import CatTree from "./components/tree/tree";

function App() {
  const [catUrl, setCatUrl] = useState([]);
  const catDialog = document.getElementById("catDialog");
  const [raceChecked, setRaceChecked] = useState([]);
  const [raceExpanded, setRaceExpanded] = useState([
    "sanhua",
    "shizi",
    "huban0",
  ]);
  const formik = useFormik({
    initialValues: {
      catNum: 1,
      catRaces: [],
      racesNumbers: {},
      adoptionForever: true,
      // catColor: "#000000",
      adoptionDate: "2024-05-01",
      email: "",
      keyWords: "",
    },
    validationSchema: Yup.object().shape({
      catNum: Yup.number().required("Required"),
      catRace: Yup.array().of(Yup.string()).min(1, "Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      setCatUrl(getResult(values));

      catDialog?.showModal();
    },
  });

  useEffect(() => {
    console.log("formik races", formik.values.catRaces);
    console.log("formik numbers", formik.values.racesNumbers);
  }, [formik.values.racesNumbers, formik.values.catRaces]);

  useEffect(() => {
    if (raceChecked != formik.values.catRaces) {
      formik.setFieldValue("catRaces", raceChecked);
    }
  }, [raceChecked]);

  useEffect(() => {
    const races = [...formik.values.catRaces];
    const currentNumbers = formik.values.racesNumbers || {};

    // First, remove any keys from currentNumbers that are not in the updated races
    const filteredCurrentNumbers = Object.keys(currentNumbers).reduce(
      (obj, key) => {
        if (races.includes(key)) {
          obj[key] = currentNumbers[key];
        }
        return obj;
      },
      {}
    );

    // Now add or update the keys from the races array
    const numbers = races.reduce((obj, race) => {
      // If the key doesn't exist, initialize it with 1; otherwise, keep the current value.
      obj[race] = obj[race] !== undefined ? obj[race] : 1;
      return obj;
    }, filteredCurrentNumbers);

    formik.setFieldValue("racesNumbers", numbers);
  }, [formik.values.catRaces]);

  const raceData = [
    {
      value: "sanhua",
      label: "SanHua",
      children: [
        {
          value: "red-sanhua",
          label: "Red SanHua",
        },
        {
          value: "black-sanhua",
          label: "Black SanHua",
        },
        {
          value: "white-sanhua",
          label: "White SanHua",
        },
      ],
    },
    {
      value: "shizi",
      label: "ShiZi",
      children: [
        {
          value: "orange-shizi",
          label: "Orange ShiZi",
        },
        {
          value: "white-shizi",
          label: "White ShiZi",
        },
      ],
    },
    {
      value: "huban0",
      label: "HuBan",
      children: [
        {
          value: "huban",
          label: "HuBan",
        },
      ],
    },
  ];
  const findLabelByValue = (data, valueToFind) => {
    for (let item of data) {
      const foundChild = item.children.find(
        (child) => child.value === valueToFind
      );
      if (foundChild) {
        return foundChild.label;
      }
    }
    return null;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "#33691E", textAlign: "center", width: "100%" }}>
        Cat Adoption
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
          color: "#21421e",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <label htmlFor="catNum">
            <span style={{ color: "red" }}>* </span>How many cats I want ( min 1
            max 5) :{" "}
          </label>
          <input
            id="catNum"
            name="catNum"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.catNum}
            min="1"
            max="5"
          />
          {formik.errors.catNum ? (
            <span style={{ color: "red" }}>{formik.errors.catNum}</span>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <label htmlFor="catRace">
            {" "}
            <span style={{ color: "red" }}>* </span>I'd like to have race :
          </label>

          <CatTree
            data={raceData}
            checked={raceChecked}
            setChecked={setRaceChecked}
            expanded={raceExpanded}
            setExpanded={setRaceExpanded}
          />
          <select
            style={{ minHeight: "200px" }}
            name="catRaces"
            id="catRaces"
            multiple={true}
            value={formik.values.catRaces}
            onChange={(e) => {
              const options = e.target.selectedOptions
                ? [...e.target.selectedOptions]
                : [];

              const values = options.map((option) => option.value);
              formik.setFieldValue("catRaces", values);
            }}
          >
            <option value="">--Please choose one or multiple option--</option>
            {raceData.map((item) => (
              <optgroup label={item.label} key={item.label}>
                {item.children.map((race) => (
                  <option key={race.label} value={race.value}>
                    {race.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {formik.errors.catRaces ? (
            <div style={{ color: "red" }}>{formik.errors.catRaces}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Number of each race : </label>
          {formik.values.catRaces?.map((race) => {
            return (
              <div key={race}>
                <span>{findLabelByValue(raceData, race)}</span>
                <input
                  min="1"
                  max="5"
                  id={race}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value;

                    const numericValue = value ? Number(value) : ""; // Convert to number, fallback to empty string if value is empty
                    // const newValues = {
                    //   ...formik.values.racesNumbers, // Copy all existing values
                    //   [race]: numericValue, // Update the specific key with the new value
                    // };
                    // console.log("update", newValues);

                    // formik.setFieldValue(`racesNumbers`, newValues);

                    formik.setFieldValue(`racesNumbers[${race}]`, numericValue);
                  }}
                  value={formik.values.racesNumbers[race] || ""}
                />
              </div>
            );
          })}
        </div>

        <div>
          <label htmlFor="adoptionForever">
            This adoption will be forever :
          </label>
          <input
            id="adoptionForever"
            name="adoptionForever"
            type="checkbox"
            checked={formik.values.adoptionForever}
            onChange={() => {
              formik.setFieldValue(
                "adoptionForever",
                !formik.values.adoptionForever
              );
            }}
          />
        </div>

        <div>
          <label htmlFor="adoptionDate">I would like to adopte before : </label>
          <input
            id="adoptionDate"
            name="adoptionDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.adoptionDate}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <label htmlFor="email">
            <span style={{ color: "red" }}>* </span>My email for contact :{" "}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <label htmlFor="catSex">Sex that I prefer : </label>
          {sexRadios.map((__, index) => {
            return (
              <label
                key={index}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <input
                  name="catSex"
                  type="radio"
                  checked={formik.values.catSex === sexRadios[index]}
                  onChange={(e) =>
                    formik.setFieldValue("catSex", e.target.value)
                  }
                  value={sexRadios[index]}
                />
                <span>{sexRadios[index]}</span>
              </label>
            );
          })}
        </div> */}

        <div>
          <label htmlFor="keyWords">I have already specific key words : </label>

          <input
            id="keyWords"
            name="keyWords"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.keyWords}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <dialog id="catDialog">
        <form
          method="dialog"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h2>Check your email in 3 days, Good luck to your adoption !</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {catUrl.map((cat) => {
              return (
                <img
                  width="200"
                  height="200"
                  src={cat}
                  alt=""
                  style={{ borderRadius: "10px" }}
                ></img>
              );
            })}
          </div>
          <p>
            If we have no cat available, we invite you to join us to catch stray
            cats...
          </p>
          <div>
            <button value="cancel">Cancel</button>
            <button id="confirmBtn" value="default">
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default App;
