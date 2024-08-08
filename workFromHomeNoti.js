const APP_RANGE = 13;
const APP_NUMBER_OF_PEOPLE = 5;
const META_RANGE = APP_RANGE + APP_NUMBER_OF_PEOPLE;
const META_NUMBER_OF_PEOPLE = 11;

class workFromHomeNoti {
  static notiWorkFromHome() {
    const biweekly = workFromHomeRange.getValue();
    if (biweekly == true) {
      workFromHomeRange.setValue(false);
    } else {
      workFromHomeRange.setValue(true);
      return;
    }

    const jaetaeckSheet = SpreadsheetApp.openByUrl(JAETAECKSHEETLINK);
    const recentSheet = jaetaeckSheet.getSheets();
    //시트 있는지 확인
    const today = new Date();
    const tommorrow = Utilities.formatDate(
      new Date(today.setDate(today.getDate() + 1)),
      "GMT+09:00",
      "yyyy-MM-dd"
    );

    const getWeek = (date) => {
      const currentDate = date.getDate();
      const firstDay = new Date(date.setDate(1)).getDay();
      return Math.ceil((currentDate + firstDay) / 7);
    };

    const week = getWeek(new Date(tommorrow)) + "째주";
    const isSheetExist = recentSheet[0].getName().includes(week);
    if (!isSheetExist) {
      Logger.log("이번주는 재택이 없나봐요");
      return;
    }

    const appTeamRange = recentSheet[0].getRange(APP_RANGE, 4, APP_NUMBER_OF_PEOPLE, 1);
    const metaTeamRange = recentSheet[0].getRange(META_RANGE, 4, META_NUMBER_OF_PEOPLE, 1);
    const appValues = appTeamRange.getValues();
    const metaValues = metaTeamRange.getValues();

    const hasNotDoneItYet = [];

    appValues.forEach((v, index) => {
      if (v == "") {
        const nameRange = recentSheet[0].getRange(APP_RANGE + index, 2, 1, 1);
        const name = nameRange.getValue() + "";
        if (APP_TEAM_ID_LIST[name]) {
          hasNotDoneItYet.push("<@" + APP_TEAM_ID_LIST[name] + "> ");
        } else {
          hasNotDoneItYet.push(nameRange.getValue() + "님 ");
        }
      }
    });
    metaValues.forEach((v, index) => {
      if (v == "") {
        const nameRange = recentSheet[0].getRange(META_RANGE + index, 2, 1, 1);
        const name = nameRange.getValue() + "";
        if (TEAM_MATE_ID_LIST[name]) {
          hasNotDoneItYet.push("<@" + TEAM_MATE_ID_LIST[name] + "> ");
        } else {
          hasNotDoneItYet.push(nameRange.getValue() + "님 ");
        }
      }
    });

    if (hasNotDoneItYet.length == 0) {
      return;
    }

    let text = "";
    hasNotDoneItYet.forEach((v) => {
      text += v;
    });

    const block = blockGenerator.getWorkFromHomeBlock(text + "\n");
    messageHandler.postMessage(CLIENT_DEV_ID, "", block);
  }
}
