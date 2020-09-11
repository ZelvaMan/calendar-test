<template>
  <div class="flex-container">
    <div class="padding-dates">
      <div class="flex-dates-collumn">
        <!-- <a href="http://keenmate.com/">
        <div class="logo-container">
          <img src="../img/KeenmateLogo.png" style="height:25px; width:25px;" />

          <b style="font-size: 0.7em;">
            KEEN|
            <br />|MATE
          </b>
        </div>
        </a>-->
        <div class="date-container" v-for="i in parseInt(daysOfWeek, 10)" :key="i">
          <i class="starttime-text">{{startTime}}</i>

          <b class="date">{{moment(startDate,"YYYY/MM/DD").add(i -1, 'd').format("DD.MM.")}}</b>

          <i class="endtime-text">{{endTime}}</i>
        </div>
      </div>
    </div>
    <PossisionCollumn
      v-for="e in eventsGroupByPossision"
      :key="e.possision"
      :possision="e.possision"
      :startTime="startTime"
      :endTime="endTime"
      :events="e.events"
      :startDate="startDate"
      :daysOfWeek="daysOfWeek"
    ></PossisionCollumn>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
//import moment from "moment";

import moment from "moment";
Object.defineProperty(Vue.prototype, "$_", { value: _ });
import PossisionCollumn from "./PossisionCollumn.vue";
export default {
  name: "WeekOverview",
  components: {
    PossisionCollumn,
  },
  props: {
    startTime: String,
    endTime: String,
    events: Array,
    //date on which you want to start render week
    startDate: String,
    daysOfWeek: String,
  },
  computed: {
    //group events by possision
    eventsGroupByPossision() {
      //var sdate = this.startDate;
      var visibleEvents = [];

      var inWeek = moment(this.startDate)
        .add(this.daysOfWeek, "days")
        .format("YYYY/MM/DD");
      this.events.forEach((e) => {
        if (moment(e.start).isBetween(this.startDate, inWeek)) {
          visibleEvents.push(e);
        }
      });
      var result = this.$_.chain(visibleEvents)
        .groupBy("possision")
        .map((value, key) => ({ possision: key, events: value }))
        .value();
      return result;
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: auto;

  min-height: 500px;
  flex-wrap: nowrap;
  border-style: solid;
  border-width: 2px;
  margin-right: 10px;
  margin-bottom: 50px;
  height: 650px;
}
.flex-dates-collumn {
  width: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-size: 1.2em;
  height: 100%;
}
.date-container::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px solid rgb(0, 0, 0, 0.3);
}
.padding-dates {
  margin-top: 33px;
}
.date-container {
  padding: 0px 3px;
  border-top: 2px solid rgb(0, 0, 0, 0.4);
  position: relative;
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
  grid-template-rows: 1em auto 1em;
}
.date {
  margin-top: -50%;
}
.starttime-text {
  font-size: 0.75em;
  margin-block-start: 0em;
}
.endtime-text {
  font-size: 0.75em;
}
.logo-container {
  display: flex;
  flex-flow: row;
  color: black;
  text-decoration: none;
  flex-wrap: nowrap;
  height: 29.38px;
  padding: 5px;
}
</style>
