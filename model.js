const map = {
  block: [1, 1],
  some: [1, 2],
};

class model {
  static init() {
    if (this.usedData == undefined) {
      this.usedData = {};
    }
  }

  static setBlock(_b) {
    this.block = _b;
    this.usedData["block"] = _b;
  }

  static getBlock() {
    return this.block;
  }

  static setSome(_some) {
    this.some = _some;
    this.usedData["some"] = _some;
  }

  static syncUsedData() {
    const arr = Object.keys(this.usedData);
    const uniqueArr = new Set(arr);
    const modelSheet = spriteSheet.getSheetByName("모델");
    uniqueArr.forEach((value) => {
      const range = modelSheet.getRange(map[value][0], map[value][1]);
      range.setValue(this[value]);
    });
  }
}
