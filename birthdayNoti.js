class bitrhdayNoti {
  static notiBirthDay() {
    const mmdd = Utilities.formatDate(new Date(), "GMT+09:00", "MMdd");
    const name = this.searchTeamMate(mmdd);
    if (name == null) {
      Logger.log("생일자가 없는 날이네요.");
      return;
    }

    const block = blockGenerator.getBirthdayBlock(name);
    messageHandler.postMessage(META_CHANNEL_ID, "", block);
  }

  static searchTeamMate(mmdd) {
    const list = BIRTHDAY_LIST;
    if (list[mmdd] != null) {
      return list[mmdd];
    }
    return null;
  }
}
