"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dummyEventsForEventCreator = exports.possisionList = exports.dummyResourceInfoForEventCreator = void 0;
var dummyResourceInfoForEventCreator = [{
  color: "blue",
  name: "Bartoloměj",
  id: "B",
  possision: "BOH"
}, {
  color: "PURPLE",
  name: "Marek",
  id: "E",
  possision: "BOH",
  hidden: true
}, {
  color: "orange",
  name: "Lukas",
  id: "D",
  possision: "FOH"
}, {
  color: "red",
  name: "Adam",
  id: "A",
  possision: "FOH"
}, {
  color: "green",
  name: "Cecil",
  id: "C",
  possision: "Uklid",
  hidden: true
}]; // TODO add resource dictionary

exports.dummyResourceInfoForEventCreator = dummyResourceInfoForEventCreator;
var possisionList = ["BOH", "Uklid", "FOH"];
exports.possisionList = possisionList;
var dummyEventsForEventCreator = [ //A  
  {
    start: "	2020/08/10 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "	2020/08/11 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "	2020/08/12 8:00 ",
    end: "11:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "	2020/08/13 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "	2020/08/14 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "	2020/08/15 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "	2020/08/16 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, //! --------------------------------------------------------------------
  //! B
  {
    start: "	2020/08/10 10:00 ",
    end: "cl",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/11 10:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/12 17:00 ",
    end: "cl",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/13 8:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/13 16:00 ",
    end: "cl",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/14 10:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/15 10:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "	2020/08/16 10:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, //! --------------------------------------------------------------------
  //! D
  {
    start: "	2020/08/10 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "	2020/08/11 15:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "	2020/08/12 10:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "	2020/08/13 14:00 ",
    end: "20:00",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "	2020/08/14 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "	2020/08/15 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "	2020/08/16 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, //A  
  {
    start: "    2020/08/17 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "    2020/08/18 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "    2020/08/19 8:00 ",
    end: "11:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "    2020/08/20 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "    2020/08/21 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "    2020/08/22 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, {
    start: "    2020/08/23 8:00 ",
    end: "16:00",
    color: "red",
    resource: "A",
    possision: "FOH"
  }, //! --------------------------------------------------------------------
  //! B
  {
    start: "    2020/08/17 17:00 ",
    end: "cl",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/18 11:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/19 17:00 ",
    end: "cl",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/20 8:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/20 16:00 ",
    end: "cl",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/21 17:00 ",
    end: "20:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/22 8:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, {
    start: "    2020/08/23 9:00 ",
    end: "14:00",
    color: "blue",
    resource: "B",
    possision: "BOH"
  }, //! --------------------------------------------------------------------
  //! D
  {
    start: "    2020/08/17 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "    2020/08/18 15:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "    2020/08/19 17:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "    2020/08/20 14:00 ",
    end: "20:00",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "    2020/08/21 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "    2020/08/22 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }, {
    start: "    2020/08/23 14:00 ",
    end: "cl",
    color: "orange",
    resource: "D",
    possision: "FOH"
  }
];
exports.dummyEventsForEventCreator = dummyEventsForEventCreator;