class monthlyNoti {
  static notiMonthly() {
    let today = Utilities.formatDate(new Date(), "GMT+09:00", "yyyy-MM-dd");

    const day = today.slice(-2);
    const month = today.slice(5, 7);
    const year = today.slice(0, 4);
    const weekDay = new Date(today).getDay();

    const lastDayOfThisMonth = Utilities.formatDate(
      new Date(year, month, 0),
      "GMT+09:00",
      "dd"
    );

    // 오늘이 평일이며 이번달의 마지막 영업일인가
    if (
      this.isWeekDay(weekDay) &&
      this.isLastWorkDay(year, month, day, lastDayOfThisMonth)
    ) {
      const block = blockGenerator.generateBizCheckBlock();
      messageHandler.postMessage(CLIENT_DEV_ID, "", block);
    } else {
      Logger.log(month + "월" + day + "일, 오늘은 월말이 아닙니다.");
    }
  }

  static isLastWorkDay(year, month, day, lastDayOfThisMonth) {
    // 이번 월의 마지막날과 7일 이상 차이나면 일단 false
    if (lastDayOfThisMonth - day > 7) {
      return false;
    }

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

    // 오늘이 공휴일이라면 false
    if (this.isTodayHoliday(year, month, day, holidays)) {
      return false;
    }

    // 주말도, 공휴일도 아닌데 이번 월의 마지막 날이라면 true
    if (day == lastDayOfThisMonth) {
      return true;
    }

    let remainDay = [];
    let dayNumber = lastDayOfThisMonth;
    while (1) {
      if (dayNumber <= day) {
        break;
      }
      const weekDay = new Date(`${year}-${month}-${dayNumber}`).getDay();
      if (this.isWeekDay(weekDay)) {
        remainDay.push(dayNumber - 0);
      }
      dayNumber--;
    }

    // 남은 날짜들에서 공휴일 제거
    const result = remainDay.filter((rd) => {
      return !this.isTodayHoliday(year, month, rd, holidays);
    });

    // 공휴일을 제거하고나서 아무것도 남지 않았다면 오늘이 월말
    return result.length == 0;
  }

  static isTodayHoliday(year, month, day, holidays) {
    let boolean = false;
    holidays.forEach((value) => {
      if (value == `${year}-${month}-${day}`) {
        boolean = true;
      }
    });
    return boolean;
  }

  static isWeekDay(weekDayNumber) {
    return !(weekDayNumber == 6 || weekDayNumber == 0);
  }
}
