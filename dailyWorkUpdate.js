const DW_META_PLATPORM_RANGE = 4;
const DW_META_PLATPORM_COUNT = 4;
const DW_META_CONTENTS_RANGE = DW_META_PLATPORM_RANGE + DW_META_PLATPORM_COUNT + 1;
const DW_META_CONTENTS_COUNT = 7;
const DW_APP_RANGE = DW_META_CONTENTS_RANGE + DW_META_CONTENTS_COUNT + 1;
const DW_APP_COUNTE = 5;

class dailyWorkUpdate {
  static dailyNoti() {
    const today = Utilities.formatDate(new Date(), "GMT+09:00", "yyyy-MM-dd");
    
    const weekDayNumber = new Date(today).getDay();
    if (this.isWeekDay(weekDayNumber) == false) {
      return;
    }

    if (this.isTodayHoliday(today) == true) {
      return;
    }

    const dailyWorkSheet =
      SpreadsheetApp.openByUrl(DAILYWORKSHEETLINK).getSheets()[0];

    const platformNameArray = dailyWorkSheet.getRange(DW_META_PLATPORM_RANGE, 3, DW_META_PLATPORM_COUNT, 1).getValues();
    const contentsNameArray = dailyWorkSheet.getRange(DW_META_CONTENTS_RANGE, 3, DW_META_CONTENTS_COUNT, 1).getValues();
    const appNameArray = dailyWorkSheet.getRange(DW_APP_RANGE, 3, DW_APP_COUNTE, 1).getValues();

    const platformDateArray = dailyWorkSheet
      .getRange(4, 5, 4, 1)
      .getDisplayValues();
    const contentsDateArray = dailyWorkSheet
      .getRange(9, 5, 7, 1)
      .getDisplayValues();
    const appDateArray = dailyWorkSheet
      .getRange(17, 5, 5, 1)
      .getDisplayValues();

    let text = "";

    platformDateArray.forEach((value, index) => {
      if (value < today) {
        const name = platformNameArray[index];
        text += "<@" + TEAM_MATE_ID_LIST[name] + "> ";
      }
    });

    contentsDateArray.forEach((value, index) => {
      if (value < today) {
        const name = contentsNameArray[index];
        text += "<@" + TEAM_MATE_ID_LIST[name] + "> ";
      }
    });

    appDateArray.forEach((value, index) => {
      if (value < today) {
        const name = appNameArray[index];
        text += "<@" + APP_TEAM_ID_LIST[name] + "> ";
      }
    });

    if (text.length == 0) {
      return;
    }

    const block = blockGenerator.getDailyWorkBlock(text + "\n");
    messageHandler.postMessage(CLIENT_DEV_ID, "", block);
  }

  static isTodayHoliday(today) {
    const year = today.slice(0, 4);
    const holidayRef = HOLIDAY_JSON_URL;
    const response = UrlFetchApp.fetch(holidayRef);
    if (response.getResponseCode() !== 200) {
      Logger.log("response error");
      return ["에러"];
    }
    const jsonText = response.getContentText();
    const textObj = JSON.parse(jsonText);
    const thisYearData = textObj[year];

    const holidays = Object.keys(thisYearData);

    let boolean = false;
    holidays.forEach((value) => {
      if (value == today) {
        boolean = true;
      }
    });
    return boolean;
  }

  static isWeekDay(weekDayNumber) {
    return !(weekDayNumber == 6 || weekDayNumber == 0);
  }
}
