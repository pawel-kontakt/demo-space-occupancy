/*
 * Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
 */

import {runtimeSettings} from "@/components/ConfigService";

export class OccupancyLiveStream {

    constructor() {
        this.utf8Decoder = new TextDecoder('utf-8');

    }

    async start() {
        console.log('Starting occupancy live stream.');
        const response = await fetch(runtimeSettings().liveStreamUrl);
        if (!response.ok) {
            throw new Error('There was an error in establishing connection with Occupancy Live Stream data, please try again later.');
        }

        const reader = response.body.getReader();
        return this.createEventsGenerator(reader);
    }

    async *createEventsGenerator(reader) {
        let {value: chunk, done: readerDone} = await reader.read();
        chunk = chunk ? this.utf8Decoder.decode(chunk) : '';

        const re = /\n|\r|\r\n/gm;
        let startIndex = 0;

        for (; ;) {
            let result = re.exec(chunk);
            if (!result) {
                if (readerDone) {
                    break;
                }
                let remainder = chunk.substr(startIndex);
                ({value: chunk, done: readerDone} = await reader.read());
                chunk = remainder + (chunk ? this.utf8Decoder.decode(chunk) : '');
                startIndex = re.lastIndex = 0;
                continue;
            }
            yield JSON.parse(chunk.substring(startIndex, result.index));
            startIndex = re.lastIndex;
        }
        if (startIndex < chunk.length) {
            // last line didn't end in a newline char
            yield JSON.parse(chunk.substr(startIndex));
        }
    }

    stop() {

    }
}
