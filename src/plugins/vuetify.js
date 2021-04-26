/*
 * Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
 */

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00bceb',
                secondary: '#005073',
                accent: '#3A49B5'
            },
        },
    },
})
