<template>
  <page>
    <h1>Event Creator with lines</h1>
    <div class="buttons">
      <lteButton
        class="btn-wspace"
        :is-primary="true"
        v-on:click.native="removeWeek()"
      >previous week</lteButton>
      <lteButton class="btn-wspace" :is-primary="true" v-on:click.native="addWeek()">next week</lteButton>
    </div>
    <EventCreatorWOverview
      daysOfWeek="7"
      v-on:input="addEvent"
      :startTime="startTime"
      :endTime="endTime"
      :events="events"
      :resourceInfos="EventCreatorData.resourceInfo"
      :startDate="date"
    ></EventCreatorWOverview>
  </page>
</template>

<script>
import EventCreatorWOverview from "../components/EventCreatorWOverview.vue";
import {
  dummyEventsForEventCreator,
  dummyResourceInfoForEventCreator,
  possisionList,
} from "../data/DummyData.js";

import moment from "moment";
export default {
  name: "SecondPage",
  components: {
    EventCreatorWOverview,
  },
  data() {
    return {
      EventCreatorData: {
        events: dummyEventsForEventCreator,
        resourceInfo: dummyResourceInfoForEventCreator,
      },
      eventCreatorEvents: [],
      dummyEventsBool: true,
      possisions: possisionList,
      events: [],
      startTime: "8:00",
      endTime: "22:00",
      date: "2020/08/10",
    };
  },
  methods: {
    addEvent(events) {
      console.log(events);
      this.events = events;
    },
    removeWeek() {
      this.date = moment(this.date, "YYYY/MM/DD")
        .add(-7, "d")
        .format("YYYY/MM/DD");
    },
    addWeek() {
      this.date = moment(this.date, "YYYY/MM/DD")
        .add(7, "d")
        .format("YYYY/MM/DD");
    },
  },
  computed: {
    getPossisions() {
      var p = this.possisions;

      console.log(" get possisions:");
      console.log(p);
      return p;
    },
  },
  mounted() {
    console.log(this.data);
    moment.locale("cs");
    this.events = this.EventCreatorData.events;
  },
};
</script>

<style  scoped>
</style>