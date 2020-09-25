<template>
  <div class="table">
    <div class="dates-container">
      <div
        :style="'width:' + (getNameWidth/1.7).toString()  + 'em; min-width:' + (getNameWidth/1.7).toString()  + 'em;'"
        class="white-space"
      >
        <button v-on:click="reset" class="btn btn-default" style="height:2em;">
          <i class="fa fa-undo" aria-hidden="true"></i>
        </button>
      </div>
      <div class="date-container" v-for="n in parseInt(daysOfWeek)" :key="n">
        <b>{{moment(startDate).add(n -1,"d").format("dddd")}}</b>
        <br />
        {{moment(startDate).add(n -1,"d").format("DD.MM")}}
      </div>
      <div class="date-container">
        <b>
          hodin
          za týden
        </b>
      </div>
      <div class="date-container">
        <b>
          hodin
          za měsíc
        </b>
      </div>
    </div>
    <div class="overview-container">
      <div class="name-container input">Overview</div>

      <LineContainerHorizontal
        :startTime="startTime"
        :endTime="endTime"
        v-for="date in eventsGroupedByDay"
        :key="date.date"
        :events="date.events"
        class="input"
      ></LineContainerHorizontal>

      <div class="input total-hours"></div>
      <div class="input total-hours"></div>
    </div>
    <EventCreatorLine
      v-for="(ri, i) in selectedResourceInfos"
      :key="ri.id"
      :ref="i"
      :id="i"
      :events="getEventWithResource(ri.id)"
      :resourceInfo="ri"
      :daysOfWeek="daysOfWeek"
      :weekDateStart="startDate"
      :possisions="possisions"
      :NameSize="getNameWidth"
      v-on:input="onInput"
      v-on:change-focus-up="changeFocusUp"
      :startTime="startTime"
      :endTime="endTime"
      :totalHoursMonth="getTotalHoursMonth(ri.id)"
    ></EventCreatorLine>

    <div class="select">
      <multiselect
        v-model="selectSelected"
        :options="unselectedRINames"
        v-on:input="SelectInputHandler"
      ></multiselect>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";

import moment from "moment";
//import moment from "moment";
Object.defineProperty(Vue.prototype, "$_", { value: _ });
import EventCreatorLine from "./EventCreatorLine";
import LineContainerHorizontal from "./LineContainerHorizontal";
export default {
  name: "EventCreatorWOverview",
  components: {
    EventCreatorLine,
    LineContainerHorizontal,
  },
  data() {
    return {
      selectSelected: null,

      eventsByResource: this.groupByResource(),
      unselectedResourceInfos: this.getDefaultHidden(),
      selectedResourceInfos: this.getDefaultDisplayed(),
    };
  },
  props: {
    daysOfWeek: String,
    startDate: String,
    events: Array,
    resourceInfos: Array,
    possisions: Array,

    startTime: String,
    endTime: String,
  },
  watch: {
    events() {
      this.eventsByResource = this.groupByResource();
    },
  },
  mounted() {},
  methods: {
    changeFocusUp(e) {
      console.log("change focus up");
      var day = e.day;
      console.log(day);
      var targetRefId = e.refId;
      console.log(targetRefId);
      var newId = parseInt(targetRefId) - 1;

      console.log(ref.changeFocus);
      var ref = this.$refs[newId][0];
      console.log(ref);
      ref.changeFocus(day);
    },
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
    onInput(e) {
      //need to fix emit so it will join with other resources
      this.$emit("input", this.eventsForEmit(e));
    },

    getResourceInfo(resource) {
      var res = null;
      this.resourceInfos.forEach((rs) => {
        if (rs.id == resource) res = rs;
      });
      return res;
    },

    getEventWithResource(resource) {
      var result = [];
      var events = [];
      var inWeek = moment(this.startDate)
        .add(this.daysOfWeek, "days")
        .format("YYYY/MM/DD");
      this.eventsByResource.forEach((e) => {
        if (e.resource == resource) {
          events = e.events;
        }
      });
      events.forEach((e) => {
        if (moment(e.start).isBetween(this.startDate, inWeek)) {
          result.push(e);
        }
      });
      return result;
    },
    groupByResource() {
      var result = this.$_.chain(this.events)
        // Group the elements of Array based on `color` property
        .groupBy("resource")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => ({ resource: key, events: value }))
        .value();
      return result;
    },
    eventsForEmit(groupedResource) {
      var events = [];
      var concated = false;
      console.log(groupedResource);
      this.eventsByResource.forEach((r) => {
        console.log(r);
        if (r.resource == groupedResource.resource) {
          console.log("Emminted possision");
          //* is resource curently emited
          var eventsForResource = [];
          concated = true;
          var inWeek = moment(groupedResource.startDate)
            .add(groupedResource.daysOfWeek, "days")
            .format("YYYY/MM/DD");
          var sd = moment(groupedResource.startDate)
            .add(-1, "days")
            .format("YYYY/MM/DD");
          console.log(inWeek);
          //* foreach all event with that resource
          r.events.forEach((e) => {
            //! events isnt from that week
            if (!moment(e.start, "YYYY/MM/DD").isBetween(sd, inWeek)) {
              //! add event to events for resourcec
              eventsForResource.push(e);
              console.log("isnt between ");
              console.log(e);
            }
          });
          //
          console.log("added events that arent from that week");
          console.log(eventsForResource);
          //ad events from emit
          eventsForResource = eventsForResource.concat(groupedResource.events);
          events = events.concat(eventsForResource);
        } else {
          events = events.concat(r.events);
        }
      });
      if (!concated) {
        events = events.concat(groupedResource.events);
      }
      return events;
    },
    getTotalHoursMonth(resourceId) {
      var total = 0;
      var events = [];
      var month = moment(this.startDate, "YYYY/MM/DD").format("MM");
      this.events.forEach((e) => {
        var isSameMonth =
          moment(e.start, "YYYY/MM/DD HH:mm").format("MM") == month;
        if (e.resource == resourceId && isSameMonth) {
          events.push(e);
        }
      });
      events.forEach((e) => {
        var start = moment(
          moment(e.start, "YYYY/MM/DD HH:mm").format("HH:mm"),
          "HH:mm"
        );
        var end = "";
        if (e.end == "cl") {
          end = moment(this.endTime, "HH:mm");
        } else {
          end = moment(e.end, "HH:mm");
        }

        var range = moment.duration(start.diff(end));
        var hours = range.asHours();
        total += Math.abs(hours);
      });
      console.log("total for month for " + resourceId);

      console.log(total);
      return total.toString();
    },
    SelectInputHandler() {
      console.log("select input name:" + this.selectSelected);
      if (this.selectSelected == null) {
        return;
      }
      //add resource to visible resources
      var ri = this.getResourcecByName(
        this.unselectedResourceInfos,
        this.selectSelected
      );
      this.selectedResourceInfos.push(ri);
      //delete from unselected resources
      this.unselectedResourceInfos.splice(
        this.unselectedResourceInfos.findIndex(
          (v) => v.name === this.selectSelected
        ),
        1
      );
      //deselct
      this.selectSelected = null;
    },
    getResourcecByName(resourceInfos, name) {
      var result;
      resourceInfos.forEach((ri) => {
        if (ri.name == name) {
          result = ri;
          return result;
        }
      });
      return result;
    },
    getDefaultDisplayed() {
      var displayed = [];
      this.resourceInfos.forEach((ri) => {
        if (!ri.hidden || ri.hidden == undefined) {
          displayed.push(ri);
        }
      });
      return displayed;
    },
    getDefaultHidden() {
      var hidden = [];
      this.resourceInfos.forEach((ri) => {
        if (ri.hidden) {
          hidden.push(ri);
        }
      });
      return hidden;
    },
    reset() {
      this.unselectedResourceInfos = this.getDefaultHidden();
      this.selectedResourceInfos = this.getDefaultDisplayed();
    },
  },
  computed: {
    eventsWDate() {
      var events = this.events;
      events.forEach((e) => {
        e.date = moment(e.start, "YYYY/MM/DD").format("MM/DD");
      });
      return events;
    },
    getNameWidth() {
      var longest = this.resourceInfos.reduce(function (a, b) {
        return a.name.length > b.name.length ? a : b;
      });
      return longest.name.length;
    },
    unselectedRINames() {
      var names = [];
      this.unselectedResourceInfos.forEach((ri) => {
        names.push(ri.name);
      });
      console.log(names);
      return names;
    },
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

    //get names of undisplayed resources
  },
};
</script>
<style scoped>
.table {
  display: table;
}
.dates-container {
  display: table-row;
  width: auto;
  padding-left: 5px;
  border-bottom: 2px solid black;
}

.date-container {
  display: table-cell;
  border: solid transparent 1px;
  width: 6em;
  text-align: center;
}
.white-space {
  display: table-cell;
  margin: 1px;
}
.select {
  padding: 1px;
  display: table-cell;
}
.overview-container {
  display: table-row;
  background: white;
}
.dates-container {
  display: table-row;
  width: auto;
  padding-left: 5px;
  border-bottom: 2px solid black;
}

.date-container {
  display: table-cell;
  border: solid transparent 1px;
  width: 6em;
}
.white-space {
  display: table-cell;
  margin: 1px;
}
.select {
  padding: 1px;
  display: table-cell;
}
.input {
  width: 6em;
  display: table-cell;
  resize: both;
  overflow: none;
  border: solid 1px rgb(128, 128, 128, 0.4);
  font-weight: bolder;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>  