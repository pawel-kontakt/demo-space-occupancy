/*
 * Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
 */

export const runtimeSettings = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      liveStreamUrl: process.env.VUE_APP_LIVE_STREAM_URL_FOR_WEB
    }
  } else {
    return window.RuntimeSettings;
  }
};
