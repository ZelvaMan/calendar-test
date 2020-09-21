<template>
  <div class="resource-line">
    <div
      class="line"
      v-bind:style="createStyleString(div)"
      v-for="div in this.divsComputed"
      v-bind:key="div.id"
    ></div>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
Vue.prototype.moment = moment;
export default {
  name: "ResourceLine",
  data() {
    return {
      // transparen color, used for empty divs
      tcolor: "rgba(0, 0, 0, 0);",
    };
  },
  props: {
    startTime: String,
    endTime: String,
    //must have: start end color
    events: Array,
  },
  computed: {
    //make divs for every event , and spaces between events
    divsComputed() {
      var startHour = moment(this.startTime, "hh:mm").format("HH");
      var endHour = moment(this.endTime, "hh:mm").format("HH");
      var hours = 24 - startHour - (24 - endHour);

      //percent per hour
      var pPHour = 100 / hours;

      //percent per quorter
      var pPQuarter = pPHour / 4;
      var id = 0;

      //if there aren't any events, fill
      var divs = [{ color: this.tcolor, width: "100", id: ++id }];

      var lastEventEnd = startHour;
      var lastEventMinute = "0";
      //check if there are any events
      if (this.events != undefined) {
        divs = [];

        this.events.forEach((e) => {
          //parese start and end objects from
          var eStartMoment = moment(e.start, "YYYY/MM/DD hh:mm");
          var eStart = {
            hour: eStartMoment.format("HH"),
            minute: eStartMoment.format("mm"),
          };
          var eEndMoment;
          if (e.end == "cl") {
            eEndMoment = moment(this.endTime, "hh:mm");
          } else {
            eEndMoment = moment(e.end, "hh:mm");
          }
          var eEnd = {
            hour: eEndMoment.format("HH"),
            minute: eEndMoment.format("mm"),
          };

          //if is event bigger then range, set ti to full width
          if (eStart.hour < startHour) eStart.hour = startHour;
          if (eEnd.hour > endHour) eEnd.hour = endHour;

          // calculate div width
          var bDivHeigh = (eStart.hour - lastEventEnd) * pPHour;
          bDivHeigh -= this.minToQuarter(lastEventMinute) * pPQuarter;
          bDivHeigh += this.minToQuarter(eStart.minute) * pPQuarter;
          //fill blank space between last event end and this
          var blankDiv = {
            color: this.tcolor,
            width: bDivHeigh,
            id: ++id,
          };
          if (blankDiv.width != 0) {
            divs.push(blankDiv);
          }

          // calculate div width based on event lenght
          var divHeigh = (eEnd.hour - eStart.hour) * pPHour;
          divHeigh -= this.minToQuarter(eStart.minute) * pPQuarter;
          divHeigh += this.minToQuarter(eEnd.minute) * pPQuarter;

          //create div and add it to divs
          var eDiv = { color: e.color, width: Math.round(divHeigh), id: ++id };
          divs.push(eDiv);

          //set event end to end of event
          lastEventEnd = eEnd.hour;
          lastEventMinute = eEnd.minute;
        });
      }

      return divs;
    },
  },
  methods: {
    //conmvert minutes to quarters  30= 2 ...
    minToQuarter(minute) {
      return Math.round(minute / 15);
    },
    //creatr dynamic style string
    createStyleString(div) {
      var v = "width:" + div.width + "%; background:" + div.color + ";";
      return v;
    },
  },
};
</script>

<style scoped>
.resource-line {
  margin-left: 3px;
  width: 100%;
  height: 2px;
  margin-top: 2px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.red {
  background: red;
}
</style>