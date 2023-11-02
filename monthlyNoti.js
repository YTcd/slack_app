class monthlyNoti {
    static notiMonthly() {
      let today = Utilities.formatDate(new Date(), "GMT+09:00", "yyyy-MM-dd");
      today = "2023-10-31"
      const day = today.slice(-2);
      const month = today.slice(5, 7);
      const year = today.slice(0, 4);
      const weekDay = new Date(today).getDay();
      // 오늘이 평일이며 이번달의 마지막 영업일인가
      if (this.isWeekDay(weekDay) && this.isLastWorkDay(year, month, day)) {
        const block = voteBlockGenerator.generateBizCheckBlock();
        messageHandler.postMessage(META_CHANNEL_ID,"",block);
      } else {
        Logger.log(month+"월"+day+"일, 오늘은 월말이 아닙니다.");
      }
    }
  
    static isLastWorkDay(year, month, day) {
      let dayNumber = day - 0;
      const remainDay = [];
      while (1) {
        dayNumber++;
        const weekDay = new Date(`${year}-${month}-${dayNumber}`).getDay();
        // 평일만 기록
        if (this.isWeekDay(weekDay)) {
          remainDay.push(dayNumber);
        }
        // 월말이면 중지
        if (this.isEndOfMonth(month, dayNumber)) {
          break;
        }
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
      if(this.isTodayHoliday(year,month,day,holidays)){
        return false;
      };
  
      // 남은 평일들이 공휴일이라면 true
      if(this.isDeletedHoliday(year, month, remainDay,holidays)){
        return true;
      }
  
      // 영업일이 남아있다.
      return false;
    }
  
    static isTodayHoliday(year,month, day,holidays){
      let boolean = false;
      holidays.forEach((value)=>{
        if(value == `${year}-${month}-${day}`){
          boolean= true;
        }
      });
      return boolean;
    };
  
    static isDeletedHoliday(year, month, dayArr,holidays) {
      
  
      const thisMonthData = [];
      holidays.forEach((value)=>{
        if(value.slice(5,7) == month){
          thisMonthData.push(value);
        }
      })
  
      // 남은 평일 카운트
      let count = dayArr.length;
      
      const staticCount = dayArr.length;
      let sliceCount = 0;
  
      // 공휴일 걸러냄
      dayArr.forEach((day)=>{
        thisMonthData.forEach((month)=>{
          if(month.slice(-2) == day){
            count--;
            sliceCount++;
          }
        })
      })
      
      return count == 0 && staticCount >= sliceCount;
    }
  
    static isWeekDay(weekDayNumber) {
      switch (weekDayNumber) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          return true;
        case 6:
        case 0:
          return false;
      }
    }
  
    static isEndOfMonth(month, day) {
      switch (month) {
        case "01":
        case "03":
        case "05":
        case "07":
        case "08":
        case "10":
        case "12":
          return day >= 31;
        case "04":
        case "06":
        case "09":
        case "11":
          return day >= 30;
        case "02":
          return day >= 28;
      }
    }
  }
  