<template>
  <div class="event-creator-line-container" :style="this.colorBorderStyleString">
    <div :style="colorStyleString" class="name-container">
      {{resourceInfo.name}}
      <div style="font-size: 0.6em">({{resourceInfo.possision}})</div>
    </div>

    <div
      v-for="n in parseInt(daysOfWeek, 10)"
      :key="n"
      :ref="n"
      :id="   n+ '-' +resourceInfo.id "
      v-on:blur="onChange"
      v-on:keydown.space="onEnter"
      v-on:keydown.enter="onEnter"
      v-on:focus="onFocus"
      v-on:keydown.up="keyUp"
      v-on:keydown.down="keyDown"
      v-on:keydown.right="keyRight"
      v-on:keydown.left="keyLeft"
      :contenteditable="true"
      class="input"
      v-on:cut="onCut"
    />
    <div class="input total-hours" ref="total-week"></div>
    <div class="input total-hours" ref="total-month">{{totalHoursMonth}}</div>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
//import moment from "moment";
Object.defineProperty(Vue.prototype, "$_", { value: _ });
import moment from "moment";
export default {
  name: "EventCreatorLine",
  data() {
    return {
      eventsByDay: [],
      //contains all dates with x
      disabledDates: [],
      xRefs: [],
    };
  },
  props: {
    // !  must contain name color id and default possision
    resourceInfo: Object,

    startTime: String,
    endTime: String,
    events: Array,
    daysOfWeek: String,
    weekDateStart: String,
    NameSize: Number,
    possisions: Array,
    totalHoursMonth: String,
    id: Number,
  },
  watch: {
    events() {
      //* render events from this.events
      console.log("setting events by date");
      this.eventsByDay = this.eventsData(this.events);
      this.setTextAreasByEvents();
    },

    weekDateStart() {
      console.log("weekDateStart changed");
      this.eventsByDay = this.eventsData(this.events);
      this.setTextAreasByEvents();
    },
  },
  methods: {
    isHoliday(date){
      var daysoff = this.resourceInfo.holidays
      console
      if(daysoff != null){
        if(daysoff.includes(date)){
          return true
        }
      }
      return false

    },
    onCut(e) {
      //TODO store some data id edit ois eabled
      e.preventDefault();
    },
    changeFocus(day) {
      console.log("Change focus method called");
      console.log(day);
      var newObject = this.$refs[day];
      if (newObject != null) {
        newObject[0].focus();

        console.log("Changing focus");
      }
    },
    keyUp(e) {
      console.log("keyUp");
      //change resource to one above, but keep same day
    },
    keyDown(e) {
      console.log("keyDown");
      //change resource to one below, keep day same
    },
    keyRight(e) {
      console.log("keyRight");
      //get element id with n +1
      // e.preventDefault();
      // var oldId = e.target.id;
      // var day = parseInt(oldId.slice(0, oldId.indexOf("-"))) + 1;
      // console.log(day);
      // var resource = oldId.slice(oldId.lastIndexOf("-") + 1); // 1==','.length
      // var newObject = this.$refs[day];
      // console.log(newObject);
      // if (newObject != null) {
      //   newObject[0].focus();
      //   console.log("changing focus");
      // } else {
      //   //change row
      // }
    },
    keyLeft(e) {
      console.log("keyLeft");

      // e.preventDefault();
      // var oldId = e.target.id;
      // var day = parseInt(oldId.slice(0, oldId.indexOf("-"))) - 1;
      // if (day < 0) day = this.daysOfWeek;
      // console.log(day);
      // var resource = oldId.slice(oldId.lastIndexOf("-") - 1); // 1==','.length
      // var newObject = this.$refs[day];
      // console.log(newObject);
      // if (newObject != null) {
      //   //change focus to new object
      //   newObject[0].focus();
      //   this.selectAll(newObject[0]);
      //   console.log("focus changed");
      // }
      // if (day < 1) {
      //   console.log("emitting change focus up");
      //   this.$emit("change-focus-up", { day: day, refId: this.id });
      // }
    },
    onFocus(e) {
      console.log("focusCHanged");
      console.log(e.target);
      this.selectAll(e.target);
    },
    selectAll(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    },
    // sets default texts for textaras
    setTextAreasByEvents() {
      if (this.xRefs) {
        this.xRefs.forEach((e) => {
          console.log(e);
          e.classList.remove("x");
        });
      }
      this.xRefs = [];
      this.eventsGroupedByDay.forEach((d) => {
        //difference between start date an date, used to calculate textare ID
        var diff = this.daysDiff(this.weekDateStart, d.date);
        //get textarea ref based on days between date and weekDateStart
        var textarea = this.$refs[diff + 1][0];
        //get event string
        if(this.isHoliday(d.date)){
          textarea.innerText = "H"
          return
        }
        if (textarea.innerText.toLowerCase() != "x") {
          textarea.classList.remove("x");

          var str = this.createDayString(d.events);
          //set textare to that string
          textarea.innerText = str;
        } else {
          this.xRefs.push(textarea);
          if (!textarea.classList.contains("x")) textarea.classList.add("x");
        }
      });
      this.$refs["total-week"].innerText = this.totalHoursWeek.toString();
      this.$refs["total-month"].innerText = this.totalHoursMonth;
    },
    //create day string for events to be render in textareas
    createDayString(events) {
      //create variables
      var str = "";

      //foreach events and create string for each one and joint them together
      events.forEach((e) => {
        var s = this.createEventString(e);
        str += s;
        str += "\n";
      });
      return str;
    },
    //create string for  event
    createEventString(event) {
      //get start and end in right formats
      var start = moment(event.start, "YYYY/MM/DD HH:mm").format("HH:mm");
      var end;
      if (event.end == "cl") {
        end = "cl";
      } else {
        end = moment(event.end, "HH:mm").format("HH:mm");
      }
      var possision = "";

      //check if event have set different possision
      if (event.possision != this.resourceInfo.possision) {
        //in that case set first char of string to first char of possision
        possision = event.possision.charAt(0);
      }
      //joint string together
      var str = possision + start + "-" + end;
      return str;
    },

    //event handlerer for text areasa
    onChange(event) {
      console.log("change vent fired");
      this.onChangeHandler(event.target);
    },
    //methof fot hangeling onchange events
    onChangeHandler(target) {
      console.log("Change trigered s:" + target.innerText);
      //delete gray background if there isnt x
      if (target.innerText == "") {
        target.classList.remove("x");

        console.log("emptyy text- returning");
        return;
      }
      //if input is x, it adds gray background
      if (target.innerText.toLowerCase().includes("x")) {
        if (!target.classList.contains("x")) target.classList.add("x");
        target.innerText = "x";
        console.log("return");

        return;
      }
      //if value is H ( holidays) it will return 
      if(target.innerText.includes("H")){
        return;
      }
      //if value is too small to be valid return
      if (target.innerText.replace(/' '|\n/g, "").lenght < 3) {
        console.log("too short text- returning");
        target.classList.remove("x");
        return;
      }

      console.log("not return");
      //split string by \n
      var spl = target.innerText.split("\n");
      //*if there is only one event
      if (spl == undefined) spl = target.innerText;

      //get target id
      var id = target.id[0];

      //set default values
      var events = [];
      //* valid strings
      var sIfError = "";
      var error = false;

      //foreach strings and create events for every one of them
      spl.forEach((s, i) => {
        if (s != " " || s != "") {
          var e = this.createEvent(spl[i], id);
          //if error in crearing event ( propablly parsing)
          if (e == null) {
            error = true;
          } else {
            //add to events and to valid string
            events.push(e);
            sIfError += s + "\n";
          }
        }
      });
      if (error == true) {
        //set value to have only valid events
        console.log("error seting text");
        target.innerText = sIfError;
      }
      //set events
      console.log("id:" + id - 1);
      this.eventsByDay[id - 1].events = events;
      //emit
      console.log("emit function caller");
      this.emit();
    },
    //create event
    createEvent(string, id) {
      var date = moment(this.weekDateStart, "YYYY/MM/DD").add(id - 1, "d");
      //add date to disabled dates
      if (string == " " || string == "") {
        //if string is empty
        result = null;
      }
      var c = string.charAt(0);
      var possision = this.resourceInfo.possision;
      if (!(c >= "0" && c <= "9")) {
        //* if first character isnt number
        possision = this.getPossision(c);
        //delete first car
        string = string.substring(1);
      }
      //parse times from string
      var times = this.parseTimes(string);
      var result = null;
      //if times are valid

      if (times == null || times.start > times.end) {
        result = null;
      } else {
        var eventObject = {
          start: date.format("YYYY/MM/DD") + " " + times.start,
          end: times.end,
          color: this.resourceInfo.color,
          resource: this.resourceInfo.id,
          possision: possision,
        };
        result = eventObject;
      }

      return result;
    },
    //return object wih two moment time start and end
    parseTimes(string) {
      //create result object

      var result = { start: "", end: "" };
      //split string to 2 datetimes
      if (string.includes("-")) {
        console.log("parse times with ---------------");
        var splitted = string.split("-");
        result.start = moment(splitted[0], "HH:mm").format("HH:mm");
        if (splitted[1] == "cl") {
          result.end = "cl";
        } else {
          result.end = moment(splitted[1], "HH:mm").format("HH:mm");
        }
        if (
          !moment(splitted[0], "HH:mm").isValid() ||
          !(moment(splitted[1], "HH:mm").isValid() || splitted[1] == "cl")
        ) {
          result = null;
        }
      } else {
        console.log("parsing time without -");
        result.end = "cl";
        result.start = moment(string, "HH:mm").format("HH:mm");
        if (!moment(string, "HH:mm").isValid()) {
          result = null;
        }
      }
      //start

      //end
      //* if end is cl(close) set time to endTime

      return result;
    },
    //* enter and space press handler will add new line to code
    onEnter() {
      // this.onChangeHandler(e.target);
    },
    //! emits events
    emit() {
      console.log("emitting ");
      console.log(this.eventsToEmit());
      this.$emit("input", {
        startDate: this.weekDateStart,
        daysOfWeek: this.daysOfWeek,
        resource: this.resourceInfo.id,
        events: this.eventsToEmit(),
      });
    },
    //* format events for emit => add all event to one array
    eventsToEmit() {
      var result = [];
      this.eventsByDay.forEach((events) => {
        result = result.concat(events.events);
      });
      return result;
    },
    //! retun diferent (in days ) between 2 dates
    daysDiff(date1, date2) {
      //parse dates to moment objects
      var start = moment(date1, "YYYY/MM/DD");
      var end = moment(date2, "YYYY/MM/DD");
      //! get diif using math abs and moment duration
      return Math.abs(moment.duration(start.diff(end)).asDays());
    },
    //*check if array have events with that datre
    haveDate(array, date) {
      //get moment datr
      var tdate = moment(date, "YYYY/MM/DD").format("YYYY/MM/DD");
      var r = undefined;
      //foreach all event, return that datatr
      array.forEach((d) => {
        if (d.date == tdate) {
          r = d;
          return;
        }
      });
      return r;
    },
    //? does it do something?
    //TODO find if is it usefull
    eventsData() {
      var res = [];
      this.eventsGroupedByDay.forEach((d, i) => {
        res[i] = d;
      });
      return res;
    },

    //get possision starting with that char
    getPossision(char) {
      // TODO GET POSSISIONS TO COMPONENT
      // var res = "";

      // this.possisions.forEach(r => {
      //   if (char == r.atChar(0)) res = r;
      // });
      // return res;
      char = char.toLowerCase();
      if (char == "f") return "FOH";
      if (char == "u") return "Uklid";
      if (char == "b") return "BOH";
    },
  },
  computed: {
    //* return total number which this resource workde this week
    totalHoursWeek() {
      var result = 0;
      this.events.forEach((e) => {
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
        result += Math.abs(hours);
      });
      //console.log(result);
      return result.toString();
    },
    //create style for resourcename
    colorStyleString() {
      return (
        "color:" +
        this.resourceInfo.color +
        ";width:" +
        this.NameSize.toString() / 1.7 +
        "em;" +
        " min-width:" +
        this.NameSize.toString() / 1.7 +
        "em;"
      );
    },
    //create style for border
    colorBorderStyleString() {
      return " border-left: 5px solid " + this.resourceInfo.color + ";";
    },
    //return events but add date prop
    eventsWDate() {
      var events = this.events;
      events.forEach((e) => {
        e.date = moment(e.start, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD");
      });
      return events;
    },
    //! group event by date
    eventsGroupedByDay() {
      var result = [];
      var events = this.eventsWDate;
      var byDate = this.$_.chain(events)
        .groupBy("date")
        .map((value, key) => ({
          date: key,
          events: value,
        }))
        .value();

      var cdate = moment(this.weekDateStart, "YYYY/MM/DD").format("YYYY/MM/DD");
      //! fills dates without events with empty object
      //! IMPORTANT for rendering
      for (let i = 0; i < parseInt(this.daysOfWeek); i++) {
        //check if there are events with this date
        var d = this.haveDate(byDate, cdate);
        if (d != undefined) {
          result.push(d);
        } else {
          //if there arent push object ith empty dates
          result.push({ date: cdate, events: [] });
        }
        cdate = moment(cdate, "YYYY/MM/DD").add(1, "d").format("YYYY/MM/DD");
      }
      return result;
    },
  },
  mounted() {
    this.setTextAreasByEvents();
  },
};
</script>

<style scoped>
.event-creator-line-container {
  display: table-row; /* or inline-flex */
  width: auto;
  background: White;
}
.input-container {
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
.name-container {
  border: solid 1px rgb(128, 128, 128, 0.4);

  display: table-cell;
}
.total-hours {
  background: #c0c0c0;
  vertical-align: middle;
}
.x {
  background: #e3dddc;
}
</style>