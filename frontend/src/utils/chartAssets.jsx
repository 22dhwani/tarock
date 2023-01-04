import chartBgDark from '../assets/chart/chart_bg_black_text.png';
import chartBgWHite from '../assets/chart/chart_bg_white_text.png';

import ChartDataAnalyst from "../assets/chart/my_card/Analyst.png"
import ChartDataArtist from "../assets/chart/my_card/Artist.png"
import ChartDataChallenger from "../assets/chart/my_card/Challenger.png"
import ChartDataCounsel from "../assets/chart/my_card/Counsel.png"
import ChartDataCrafter from "../assets/chart/my_card/Crafter.png"
import ChartDataEnthusiast from "../assets/chart/my_card/Enthusiast.png"
import ChartDataForeseer from "../assets/chart/my_card/Foreseer.png"
import ChartDataInspector from "../assets/chart/my_card/Inspector.png"
import ChartDataJournalist from "../assets/chart/my_card/Journalist.png"
import ChartDataMediator from "../assets/chart/my_card/Mediator.png"
import ChartDataOrganizer from "../assets/chart/my_card/Organizer.png"
import ChartDataPerformer from "../assets/chart/my_card/Performer.png"
import ChartDataPersuader from "../assets/chart/my_card/Persuader.png"
import ChartDataProtector from "../assets/chart/my_card/Protector.png"
import ChartDataTenacious from "../assets/chart/my_card/Tenacious.png"
import ChartDataVisionary from "../assets/chart/my_card/Visionary.png"


export function getUserChartImageData(personality) {
  return userChartDataImages[personality]
}

export const userChartDataImages = {
  Analyst: { bg: chartBgWHite, chart: ChartDataAnalyst },
  Artist: { bg: chartBgWHite, chart: ChartDataArtist },
  Challenger: { bg: chartBgWHite, chart: ChartDataChallenger },
  Enthusiast: { bg: chartBgWHite, chart: ChartDataEnthusiast },

  Persuader: { bg: chartBgDark, chart: ChartDataPersuader },
  Mediator: { bg: chartBgDark, chart: ChartDataMediator },
  Inspector: { bg: chartBgDark, chart: ChartDataInspector },
  Visionary: { bg: chartBgDark, chart: ChartDataVisionary },

  Performer: { bg: chartBgDark, chart: ChartDataPerformer },
  Foreseer: { bg: chartBgDark, chart: ChartDataForeseer },
  Protector: { bg: chartBgDark, chart: ChartDataProtector },
  Tenacious: { bg: chartBgDark, chart: ChartDataTenacious },

  Organizer: { bg: chartBgWHite, chart: ChartDataOrganizer },
  Counsel: { bg: chartBgWHite, chart: ChartDataCounsel },
  Crafter: { bg: chartBgWHite, chart: ChartDataCrafter },
  Journalist: { bg: chartBgWHite, chart: ChartDataJournalist },
}