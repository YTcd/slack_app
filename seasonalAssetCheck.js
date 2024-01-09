const S3_DEV = "https://static.dev.doubledowncasino2.com/";
const S3_QA = "https://static.qa.doubledowncasino2.com/";
const S3_PROD = "https://static.doubledowncasino2.com/";
const CONFIG = "Config.json";

const DEV_CONFIG = S3_DEV + "seasonal_assets/Config.json";
const QA_CONFIG = S3_QA + "seasonal_assets/Config.json";
const PROD_CONFIG = S3_PROD + "seasonal_assets/Config.json";

class seasonalAssetCheck {
  static showCheckSeasonlMenu(parameter) {
    const channelID = parameter.channel_id;
    const userID = parameter.user_id;
    messageHandler.postMessageOnlyVisible(
      channelID,
      "",
      blockGenerator.seasonalAssetsCheckBlock(),
      userID
    );
  }

  static checkSeasonalList(payload) {
    const environment = this.getEnv(payload);
    const feature = this.getFeature(payload);

    const env =
      environment == "dev"
        ? S3_DEV
        : environment == "qa"
        ? S3_QA
        : environment == "prod"
        ? S3_PROD
        : "";
    if (env == "") {
      return;
    }

    const envConfig = env + "seasonal_assets/Config.json";
    const response = UrlFetchApp.fetch(envConfig);
    if (response.getResponseCode() !== 200) {
      Logger.log("버전 정보 파일 불러오기 실패");
    }
    const jsonText = response.getContentText();
    const versionRegex = /(\d+\.\d+\.\d+)/;
    const match = jsonText.match(versionRegex);
    const versionString = match ? match[0] : null;
    if (!versionString) {
      Logger.log("버전 정보 확인 실패");
    }

    let existSeasonList = [];
    SEASON_LIST.forEach((season) => {
      try {
        let assetsLink = "";
        Logger.log("피쳐네임: " + feature);
        switch (feature) {
          case "DesktopTheme":
            assetsLink = this.getDesktopThemeAssetLink(
              env,
              versionString,
              season
            );
            break;
          case "CheckIn":
            assetsLink = this.getCheckInAssetLink(env, versionString, season);
            break;
          case "MatchMakerWidget":
            assetsLink = this.getMatchMakerWidgetAssetLink(
              env,
              versionString,
              season
            );
            break;
          case "MatchMaker":
            assetsLink = this.getMatchMakerAssetLink(
              env,
              versionString,
              season
            );
            break;
          case "Shop":
            assetsLink = this.getShopAssetLink(env, versionString, season);
            break;
        }

        const rs = UrlFetchApp.fetch(assetsLink);
        if (response.getResponseCode() !== 200) {
          throw "시즌 존재하지 않음";
        }

        if (rs) {
          existSeasonList.push(season);
        }
      } catch (e) {
        Logger.log("로드 실패: " + season);
      }
    });
    let text = "";
    if (existSeasonList.length != 0) {
      existSeasonList.forEach((v) => {
        text += v + "\n";
      });
    }
    messageHandler.postMessageWithoutBlock(
      payload.container.channel_id,
      environment + " s3에 업로드 되어있는 " + feature + ":\n" + text
    );
  }

  static getCheckInAssetLink(env, versionString, season) {
    return (
      env +
      "seasonal_assets/" +
      versionString +
      "/CheckIn/" +
      season +
      "/chunks/mobile/nomin/V1/popup/seasonalevent/checkin/CheckIn.json"
    );
  }

  static getDesktopThemeAssetLink(env, versionString, season) {
    return (
      env +
      "seasonal_assets/" +
      versionString +
      "/DesktopTheme/" +
      season +
      "/chunks/desktop/nomin/V1/popup/seasonalevent/desktoptheme/DesktopTheme.json"
    );
  }

  static getMatchMakerAssetLink(env, versionString, season) {
    return (
      env +
      "seasonal_assets/" +
      versionString +
      "/MatchMaker/" +
      season +
      "/chunks/mobile/nomin/V1/popup/seasonalevent/matchmaker/MatchMaker.json"
    );
  }

  static getMatchMakerWidgetAssetLink(env, versionString, season) {
    return (
      env +
      "seasonal_assets/" +
      versionString +
      "/MatchMaker/" +
      season +
      "/widget/Widget_Seasonal_MatchMaker.json"
    );
  }

  static getShopAssetLink(env, versionString, season) {
    return (
      env +
      "seasonal_assets/" +
      versionString +
      "/Shop/" +
      season +
      "/BuyChips_seasonal.json"
    );
  }

  static getEnv(payload) {
    const blockID = payload.actions[0].block_id;
    const keys = Object.keys(payload.state.values[blockID]);
    return payload.state.values[blockID][keys[0]].selected_option.value;
  }

  static getFeature(payload) {
    const blockID = payload.actions[0].block_id;
    const keys = Object.keys(payload.state.values[blockID]);
    return payload.state.values[blockID][keys[1]].selected_option.value;
  }
}
