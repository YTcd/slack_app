const mainSheetUrl = "https://docs.google.com/spreadsheets/d/18HSpQQXt9Y7N2tretyjR4eiX1u59Zq6HealsBl4kLfg/";
const TIMELINE = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
const NOTITIMELINE = ["12:50", "13:20", "13:50", "14:20", "14:50", "15:20", "15:50", "16:20", "16:50", "17:20"];

const LIST_LENGHT = 10;
const LIST_START_COLUMN = 4;
const WEEK_ROW = [4, 16, 28, 40, 52];

//헬스 키퍼 시간 10분 전 알림
class healthKeeper {
  static healthKeeperNotiAuto() {
    let today = Utilities.formatDate(new Date(), "GMT+09:00", "yyyy-MM-dd");

    const day = today.slice(-2);
    const month = today.slice(5, 7);
    const year = today.slice(0, 4);
    const weekDay = new Date(today).getDay();

    if (monthlyNoti.isWeekDay(weekDay) == false
      && monthlyNoti.isTodayHoliday(year, month, day) == true) {
      return;
    }

    let mainSheet = SpreadsheetApp.openByUrl(mainSheetUrl).getSheetByName("헬스키퍼 가이드");
    let link = this.get16FLinkUrl(mainSheet);
    let healthKeeperSheet = SpreadsheetApp.openByUrl(link).getActiveSheet();

    const todaysList = this.getTodaysList(healthKeeperSheet, day-0);
    const teamMateNameList = Object.keys(TEAM_MATE_ID_LIST);
    for (let i=0; i< todaysList.length; i++) {
      if(teamMateNameList.indexOf(todaysList[i]) > -1) {
        const name = todaysList[i];

        const targetTime = TIMELINE[i];
        const currentTime = Utilities.formatDate(new Date(), "GMT+09:00", "HH:mm");
        const [targetHours, targetMinutes] = targetTime.split(":").map(Number);
        const [currentHours, currentMinute] = currentTime.split(":").map(Number);

        const tatgetTotalMinutes = targetHours * 60 + targetMinutes;
        const currentTotalMinutes = currentHours * 60 + currentMinute;
        
        if(tatgetTotalMinutes >= currentTotalMinutes + 5
        && tatgetTotalMinutes < currentTotalMinutes + 15) {
          messageHandler.postMessageWithoutBlock(META_CHANNEL_ID, `${name}님, ${tatgetTotalMinutes - currentTotalMinutes}분 후 헬스키퍼 시간입니다.`);
        }        
      }
    }

    // 현재 시간과 리스트에 있는 시간 차이 구하기
    // 대상자가 우리팀인지 확인
  }

  // 오늘 예약한 사람들의 리스트를 리턴
  static getTodaysList(sheet, today) {
    let todaysLocation = null;
    for (let i = 1; i <= 5; i++) {
      let val = this.getDayColumn(sheet, i, today);
      if (val != null) {
        todaysLocation = [WEEK_ROW[i - 1], val]; // [행,렬]
      }
    }
    
    if (todaysLocation == null) {
      return;
    }
    let todaysRange = sheet.getRange(todaysLocation[0]/*행*/, todaysLocation[1] + 3 /*렬*/, 10, 1)
    let todays2DList = todaysRange.getValues();
    let todaysList = [];
    for (let i = 0; i < todays2DList.length; i++) {
      todaysList.push(todays2DList[i][0]);
    }
  
    return todaysList;
  }

  // 오늘에 해당하는 열의 순서를 리턴
  static getDayColumn(sheet, weekNumber, today) {
    let week_row = WEEK_ROW[weekNumber - 1];
    let range = sheet.getRange(week_row - 1, LIST_START_COLUMN, 1, 5);
    let dayArr = range.getValues()[0];

    let onlyDayArr = [];
    let pattern = /(?<=\/)\d+(?=\[)/;
    for (let i = 0; i < dayArr.length; i++) {
      let day = dayArr[i].match(pattern);
      if (day != null && day[0] != "") {
        onlyDayArr.push(day[0]);
      }
    }

    let todayColumnIndex = null;
    onlyDayArr.forEach((day, index) => {
      if (day == today) {
        todayColumnIndex = index + 1;
      }
    })
    return todayColumnIndex;
  }

  // 16층 예약 시트 링크 리턴
  static get16FLinkUrl(spreadsheet) {
    let range = spreadsheet.getRange(22, 1, 1, 1);
    let link = range.getRichTextValue().getLinkUrl();
    return link;
  }

  static tenMinueteCheck() {
    messageHandler.postMessageWithoutBlock(TEST_CHANNEL_ID, "test " + Date.now());
  }
}
