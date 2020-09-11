<template>
  <div class="flex-possision-collumn">
    <div class="resource-name">{{this.possision}}</div>
    <LineContainer
      :startTime="startTime"
      :endTime="endTime"
      v-for="date in eventsGroupedByDay"
      :key="date.date"
      :events="date.events"
    ></LineContainer>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import moment from "moment";
Object.defineProperty(Vue.prototype, "$_", { value: _ });
import LineContainer from "./LineContainer.vue";
export default {
  name: "PossisionCollumn",
  components: { LineContainer },
  props: {
    startTime: String,
    endTime: String,
    possision: String,
    events: Array,
    startDate: String,
    daysOfWeek: String,
  },
  computed: {
    //add date property based on start to every event
    eventsWDate() {
      var events = this.events;
      events.forEach((e) => {
        e.date = moment(e.start, "YYYY/MM/DD").format("MM/DD");
      });
      return events;
    },

    //group event by day while fill empty days in week with
    eventsGroupedByDay() {
      var result = [];
      var events = this.eventsWDate;
      //var sdate = this.startDate;
      //group events by date
      var byDate = this.$_.chain(events)
        .groupBy("date")
        .map((value, key) => ({ date: key, events: value }))
        .value();

      //curent date for foreach
      var curDate = moment(this.startDate, "YYYY/MM/DD").format("MM/DD");

      //foeach
      for (let i = 0; i < this.daysOfWeek; i++) {
        //chekc for event with this date
        var d = this.haveDate(byDate, curDate);
        //if there are events add to resul
        if (d != undefined) {
          result.push(d);
        }
        //else push object with date and empty events for render
        else {
          result.push({ date: curDate, events: [] });
        }
        //add one day ti curdate
        curDate = moment(curDate, "MM/DD").add(1, "d").format("MM/DD");
      }

      // console.log("grouped by day ");
      // console.log(result);
      return result;
    },
  },
  methods: {
    //return all events from array with matching date
    haveDate(array, date) {
      //format date
      var tdate = moment(date, "MM/DD").format("MM/DD");

      var r = undefined;
      array.forEach((d) => {
        if (d.date == tdate) {
          r = d;
          return;
        }
      });
      return r;
    },
  },
};
</script>

<style scoped>
.flex-possision-collumn {
  width: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  float: right;

  border-left: 2px solid rgb(0, 0, 0, 0.4);
  min-width: 40px;
}
.resource-name {
  height: 35px;
  padding: 5px;
  min-width: 40px;
}
</style>