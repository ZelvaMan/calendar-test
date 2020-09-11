<template>
  <app-container :is-loading="false " top-nav-color="success" no-bars>
    <template #top-nav>
      <top-nav-link :to="{name: 'route1'}">route1</top-nav-link>
      <top-nav-link :to="{name: 'route2'}">route2</top-nav-link>
      <top-nav-link :to="{name: 'route3'}">route3</top-nav-link>
      <top-nav-link :to="{name: 'route4'}">route4</top-nav-link>
    </template>
    <template #side-nav>
      <demo-sidenav />
    </template>
    <Page>
      <div class="header">
        <h1>WeekOverview</h1>

        <div class="buttons">
          <lteButton
            class="btn-wspace"
            :is-primary="true"
            v-on:click.native="removeWeek()"
          >previous week</lteButton>
          <lteButton class="btn-wspace" :is-primary="true" v-on:click.native="addWeek()">next week</lteButton>
        </div>
      </div>

      <div class="flex-container">
        <WeekOverview
          :startTime="startTime"
          :endTime="endTime"
          :events="events"
          :startDate="date"
          :possisions="getPossisions"
          daysOfWeek="7"
        />

        <div class="right-container">
          <EventCreator
            daysOfWeek="7"
            v-on:input="addEvent"
            :startTime="startTime"
            :endTime="endTime"
            :events="events"
            :resourceInfos="EventCreatorData.resourceInfo"
            :startDate="date"
          ></EventCreator>
          <div class="info" title="info">
            <card class="collumns">
              <p>
                Barvy jmen
                odpovidaji
                barvam car
              </p>
              <div style="margin-left: 20px">
                <h3>zkratky</h3>
                <p>
                  f == FOH
                  <br />u == Uklid
                  <br />b == BOH
                  <br />cl == zaviracka
                  <br />
                </p>
              </div>
            </card>
          </div>
        </div>
      </div>
    </Page>
  </app-container>
</template>
 



<script>
// main.js
import Vue from "vue";
import VueAdminLte from "@keenmate/vue-adminlte";
// import code of original (mostly) adminlte project
import "@keenmate/vue-adminlte/src/vue-adminlte-setup";
//import VueRouter from "vue-router";

import moment from "moment";
import Multiselect from "vue-multiselect";

import WeekOverview from "./components/WeekOverview.vue";
import EventCreator from "./components/EventCreator";
// register globally

//Vue.use(VueRouter);
Vue.use(VueAdminLte);
Vue.component("multiselect", Multiselect);
import {
  dummyEventsForEventCreator,
  dummyResourceInfoForEventCreator,
  possisionList,
} from "./data/DummyData.js";
export default {
  name: "App",
  components: { WeekOverview, EventCreator },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
.flex-container {
  flex-direction: row;

  height: 100%;
  display: flex;
}
.info {
  flex-direction: collumn;
  padding-top: 20px;
  display: flex;
}
.collumns {
  display: flex;
  flex-direction: row;
}

.right-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 10px;
}
.vertical {
  flex-direction: column;
  display: flex;
}
.buttons {
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-left: 25px;
}
.header {
  flex-direction: row;
  display: flex;
}
.btn-wspace {
  margin-left: 10px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>