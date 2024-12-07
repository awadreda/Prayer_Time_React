import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Prayer from "./Prayer";
import  { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
// import "moment/dist/locale/ar";

moment.locale("ar");

type APIRespose = { 
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
};

const CityOptions: { [key: string]: string } = {
  Cairo: "القاهرة",
  Alexandria: "الإسكندرية",
  Qena: "قنا",
};

const avaibleCities = [
  {
    displayName: "القاهرة",
    apiName: "Cairo",
  },
  {
    displayName: "الإسكندرية",
    apiName: "Alexandria",
  },
  {
    displayName: "قنا",
    apiName: "Qena",
  },
];

const CitiesToShow = avaibleCities.map((city) => {
  return (
    <MenuItem key={city.apiName} value={city.apiName}>
      {city.displayName}
    </MenuItem>
  );
});

export default function MainContent() {
  const [selectedCity, setSelectedCity] = useState({
    disPLayName: "القاهرة",
    apiName: "Cairo",
  });

  const [nextPrayer, setNextPrayer] = useState({
    key: "Asr",
    display: "العصر",
    time: moment(),
  });
  const [theRemingTime,setRemingTime] =useState("");

  
   
  async function fetchPrayer() {
    const data = await axios.get<APIRespose>(
      `https://api.aladhan.com/v1/timingsByCity/20-09-2024?city=${selectedCity.apiName}&country=EG&method=4&adjustment=1`
    );

    console.log(data.data.data.timings);
    setTiming(data.data.data.timings);
  }

  const [today, setToday] = useState("");

  useEffect(() => {
    fetchPrayer();
    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm A"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const [timings, setTiming] = useState({
    Fajr: "0",
    Dhuhr: "0",
    Asr: "0",
    Maghrib: "0",
    Isha: "0",
  });

  const timesMoment = [
    { key: "Fajr", display: "الفجر", time: moment(timings.Fajr, "hh:mm") },
    { key: "Dhuhr", display: "الظهر", time: moment(timings.Dhuhr, "hh:mm") },
    { key: "Asr", display: "العصر", time: moment(timings.Asr, "hh:mm") },
    {
      key: "Maghrib",
      display: "المغرب",
      time: moment(timings.Maghrib, "hh:mm"),
    },
    { key: "Isha", display: "العشاء", time: moment(timings.Isha, "hh:mm") },
  ];

    
    function SetCounderDownTimer()
    {
        let comingPrayer = timesMoment.find((pray)=>pray.time.isAfter(moment()))

        if(!comingPrayer)
          comingPrayer = timesMoment[0];

        console.log("lol")
        console.log(comingPrayer)


        setNextPrayer(comingPrayer);

        if (comingPrayer.key === "Fajr" && comingPrayer.time.isBefore(moment())) {
          const fromNowToMidDurration = moment("23:59:59", "hh:mm:ss").diff(
            moment()
          );

          const fromMidToFajr = moment(nextPrayer.time).diff(
            moment("00:00:00", "hh:mm:ss")
          );

          const totalDuration = fromNowToMidDurration + fromMidToFajr;
          const RemingTime=moment.duration(totalDuration);
          console.log("lolTotal");
          console.log("the totalDuration issss", totalDuration);
          console.log("The Reming Time", `${RemingTime.hours()}:${RemingTime.minutes()}:${RemingTime.seconds()}`);
            setRemingTime(
              `${RemingTime.hours()}:${RemingTime.minutes()}:${RemingTime.seconds()}`
            );
          }
          else {
            
            const RemingTime = moment.duration(comingPrayer.time.diff(moment()));
            console.log("The Reming Time", `${RemingTime.hours()}:${RemingTime.minutes()}:${RemingTime.seconds()}`);
            
            setRemingTime(
              `${RemingTime.hours()}:${RemingTime.minutes()}:${RemingTime.seconds()}`
            );

        }
        

    }

    // SetCounderDownTimer();
  useEffect(() => {

    const interval = setInterval(() => {
      SetCounderDownTimer();
   
    }, 1000);

    return () => {
       clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ timings]);




  return (
    <>
      {/* top Row */}
      <Grid
        container
        style={{
          padding: "20px ",
        }}
      >
        <Grid size={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.disPLayName}</h1>
          </div>
        </Grid>

        <Grid size={6}>
          <h2>متبقى حتى صلاة {nextPrayer.display} </h2>
          <h1> {theRemingTime} </h1>
        </Grid>
      </Grid>

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* Prayers Cards */}

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-around"}
      >
        <Prayer
          image="../../src/Images/01.jpg"
          nameOfPrayer="الفجر"
          timeOfPreyer={timings.Fajr}
        />
        <Prayer
          image="../../src/Images/02.jpg"
          nameOfPrayer="الظهر"
          timeOfPreyer={timings.Dhuhr}
        />
        <Prayer
          image="../../src/Images/03.jpg"
          nameOfPrayer="العصر"
          timeOfPreyer={timings.Asr}
        />
        <Prayer
          image="../../src/Images/04.jpg"
          nameOfPrayer="المغرب"
          timeOfPreyer={timings.Maghrib}
        />
        <Prayer
          image="../../src/Images/05.jpg"
          nameOfPrayer="العشاء"
          timeOfPreyer={timings.Isha}
        />
      </Stack>

      {/* Prayers Cards */}

      {/* Select */}

      <FormControl
        style={{
          width: "20%", // ,backgroundColor:"white"
          display: "flex",
          margin: "auto",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <InputLabel
          style={{ color: "white", fontWeight: "bold" }}
          id="demo-simple-select-label"
        >
          المدينة
        </InputLabel>
        <Select
          style={{
            backgroundColor: "#444569",
            borderColor: "white",
            color: "white",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="City"
          onChange={(e: SelectChangeEvent<string>) => {
            const NewApiName = e.target.value;
            const NewCityName = CityOptions[NewApiName];
            console.log(NewApiName);
            console.log(NewCityName);
            setSelectedCity({
              ...selectedCity,
              apiName: NewApiName,
              disPLayName: NewCityName,
            });
          }}
        >
          {CitiesToShow}
          {/* <MenuItem value={"Cairo"}>القاهرة</MenuItem>
          <MenuItem value={"Alexandria"}>الإسكندرية</MenuItem>
          <MenuItem value={"Qena"}>قنا</MenuItem> */}
        </Select>
      </FormControl>

      {/* Select */}
    </>
  );
}
