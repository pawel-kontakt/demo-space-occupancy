/*
 * Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
 */

import _ from 'lodash';

export const LocationStore = {
    "id": 1,
    "name": "Kio Cloud Lab",
    "floors": [
        {
            "id": 2,
            "name": "Lab",
            "rooms": [
                {
                    "id": 3,
                    "name": "Grace Hopper Conference Room",
                    "roomSensors": [
                        {
                            "trackingId": "d2:c6:2d:33:c8:5c"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[1.21, 12.00], [4.19, 12.00], [4.19, 9.60], [1.21, 9.60], [1.21, 12.00]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 4,
                    "name": "Hospital Lab",
                    "roomSensors": [
                        {
                            "trackingId": "e8:ba:af:36:9a:fb"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[8.02, 16.60], [11.11, 16.60], [11.11, 13.80], [8.02, 13.80], [8.02, 16.60]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 5,
                    "name": "Margaret Hamilton Conference Room",
                    "roomSensors": [
                        {
                            "trackingId": "e4:d8:20:06:58:75"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[8.02, 13.57], [11.11, 13.57], [11.11, 11.78], [8.02, 11.78], [8.02, 13.57]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 3001,
                    "name": "Desk 01",
                    "roomSensors": [
                        {
                            "trackingId": "e7:71:cd:01:ae:1c"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[8.30, 9.90], [9.65, 9.90], [9.65, 9.18], [8.30, 9.18], [8.30, 9.90]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 3002,
                    "name": "Desk 02",
                    "roomSensors": [
                        {
                            "trackingId": "c9:be:6e:1d:8b:31"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[9.74, 9.90], [11.09, 9.90], [11.09, 9.18], [9.74, 9.18], [9.74, 9.90]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 3003,
                    "name": "Desk 03",
                    "roomSensors": [
                        {
                            "trackingId": "d8:b9:bf:41:94:3b"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[8.30, 9.12], [9.65, 9.12], [9.65, 8.39], [8.30, 8.39], [8.30, 9.12]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 3004,
                    "name": "Desk 04",
                    "roomSensors": [
                        {
                            "trackingId": "cd:ae:9c:f6:5e:ea"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[9.74, 9.12], [11.09, 9.12], [11.09, 8.39], [9.74, 8.39], [9.74, 9.12]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 3005,
                    "name": "Desk 05",
                    "roomSensors": [
                        {
                            "trackingId": "d6:d4:4f:e2:33:b4"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[8.30, 7.36], [9.65, 7.36], [9.65, 6.64], [8.30, 6.64], [8.30, 7.36]]]
                        },
                        "properties": {}
                    }
                },
                {
                    "id": 3006,
                    "name": "Desk 06",
                    "roomSensors": [
                        {
                            "trackingId": "c3:73:ad:21:89:fd"
                        }
                    ],
                    "xyGeojson": {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[9.74, 7.36], [11.09, 7.36], [11.09, 6.64], [9.74, 6.64], [9.74, 7.36]]]
                        },
                        "properties": {}
                    }
                }
            ],
            "level": 0,
            "xyGeojson": {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[12.74, 18.2], [0, 18.2], [0, 0], [12.74, 0], [12.74, 18.2]]]
                }
            },
            "imageXyGeojson": {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[0, 18.2], [12.7, 18.2], [12.7, 0], [0, 0], [0, 18.2]]]
                }
            }
        }
    ],
    "zones": [{
        "name": "Conference Rooms",
        "icon": "mdi-account-group",
        "xyGeojson": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[7.64, 16.90], [11.80, 16.90], [11.80, 11.18], [7.64, 11.80], [7.64, 16.90]]]
            }
        }
    }, {
        "name": "Hot Desking",
        "icon": "mdi-desk",
        "xyGeojson": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[7.90, 10.10], [11.50, 10.10], [11.50, 5.62], [7.90, 5.62], [7.90, 10.10]]]
            }
        }
    }]
};

export function findSensor(floor, sensorId) {
    return _.flatMap(floor.rooms, (room) => room.roomSensors).filter(sensor => sensor.trackingId === sensorId)
}

export function findRoomForSensor(floor, sensorId) {
    return floor.rooms.find(room => room.roomSensors.some(sensor => sensor.trackingId === sensorId));
}
