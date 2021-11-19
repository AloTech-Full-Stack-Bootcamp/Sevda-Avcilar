import { series } from "./data.js";
import { fancyLogSeriesReport } from "./utils.js";

export function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;

  this.add = function (serie) {
    //Pushing new serie
    this.series.push(serie);
    //If serie has been watched
    if (serie.isWatched) {
      //We increase the value of numberOfWatched by one
      this.numberOfWatched += 1;
      //If last serie doesn't exist, then give "serie" to last serie
      if (this.lastSerie === undefined) {
        this.lastSerie = serie;
      }
      //If last serie exists, compare our serie and the existing last serie with their dates
      else {
        const finished1 = new Date(this.lastSerie.finishedDate);
        const finished2 = new Date(serie.finishedDate);
        if (finished1 < finished2) {
          this.lastSerie = serie;
        }
      }
    }
    //If serie has not been watched
    else {
      //Checking if current serie and next serie exist
      if (this.currentSerie === undefined) {
        this.currentSerie = serie;
      } else if (this.nextSerie === undefined) {
        this.nextSerie = serie;
      }
    }
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;
  };
  //Checking series data if we have series to process
  if (series.length > 0) {
    series.forEach((serie) => {
      this.add(serie);
    });
  }
  this.finishSerie = function () {
    //Our current serie is being the last serie. Because we watched it
    this.lastSerie = this.currentSerie;
    //Finding index of the last serie, we need it for the currentSerie and nextSerie
    const result = this.series.findIndex(
      (obj) => obj.name === this.lastSerie.name
    );

    let count = 0; //Count is for starting from the currentSerie's index for finding nextSerie
    //Finding currentSerie
    for (let i = result + 1; i < this.series.length; i++) {
      if (this.series[i].finishedDate === undefined) {
        this.currentSerie = this.series[i];
        count += 1;
        break;
      }
    }
    //Finding nextSerie
    for (let i = result + count + 1; i < this.series.length; i++) {
      if (this.series[i].finishedDate === undefined) {
        this.nextSerie = this.series[i];
        break;
      }
    }
    //Updating watched and unwatched series' numbers
    this.numberOfWatched += 1;
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}

// Case 1
// -------------------------------------------------

/*const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport();*/

// Case 2
// -------------------------------------------------

/*const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();
mySeriesTracker.printSeriesReport();*/

// Case 3
// -------------------------------------------------

/*const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4"
};
mySeriesTracker.add(newSerie);
mySeriesTracker.printSeriesReport();*/
