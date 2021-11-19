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
    this.series.push(serie);

    if (serie.isWatched) {
      this.numberOfWatched += 1;
      if (this.lastSerie === undefined) {
        this.lastSerie = serie;
      } else {
        const finished1 = new Date(this.lastSerie.finishedDate);
        const finished2 = new Date(serie.finishedDate);
        if (finished1 < finished2) {
          this.lastSerie = serie;
        }
      }
    } else {
      if (this.currentSerie === undefined) {
        this.currentSerie = serie;
      } else if (this.nextSerie === undefined) {
        this.nextSerie = serie;
      }
    }
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;
  };

  //check to see if we have series to process
  if (series.length > 0) {
    series.forEach((serie) => {
      this.add(serie);
    });
  }

  this.finishSerie = function () {
    this.lastSerie = this.currentSerie;
    const result = this.series.findIndex(
      (obj) => obj.name === this.lastSerie.name
    );

    let count = 0;
    for (let i = result + 1; i < this.series.length; i++) {
      if (this.series[i].finishedDate === undefined) {
        this.currentSerie = this.series[i];
        count += 1;
        break;
      }
    }
    for (let i = result + count + 1; i < this.series.length; i++) {
      if (this.series[i].finishedDate === undefined) {
        this.nextSerie = this.series[i];
        break;
      }
    }
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
