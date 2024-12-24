class sheetHandler {
  static clearRecentVoteBlock(channel_id) {
    if (channel_id == null) {
      return;
    } else if (channel_id == "schedule") {
      const cache = CacheService.getScriptCache();
      cache.remove(META_CHANNEL_ID);
      cache.remove(META_CONTENTS_ID);
      cache.remove(META_PLATPORM_ID);
    } else {
      const cache = CacheService.getScriptCache();
      cache.remove(channel_id);
    }
  }

  static getVoteBlockBySheet(channelId) {
    const cache = CacheService.getScriptCache();
    let value = cache.get(channelId);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }

  static updateRecentVoteBlock(channelID, block) {
    const cache = CacheService.getScriptCache();
    cache.put(channelID,block);
  }
}
