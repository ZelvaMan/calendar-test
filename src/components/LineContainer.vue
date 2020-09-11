<template>
  <div class="line-container">
    <ResourceLine
      v-for="resourceEvents in this.eventsGroupedByResource"
      v-bind:key="resourceEvents.resource"
      :startTime="startTime"
      :endTime="endTime"
      :events="resourceEvents.events"
    ></ResourceLine>
  </div>
</template>
<script>
import ResourceLine from "./ResourceLine.vue";
import Vue from "vue";
import _ from "lodash";
//import { ISO_8601 } from 'moment';
Object.defineProperty(Vue.prototype, "$_", { value: _ });
export default {
  name: "LineContainer",
  components: {
    ResourceLine,
  },
  props: {
    //array with event viz. notes.md
    events: Array,
    //when day beggin( HH:mm)
    startTime: String,

    //when day end( HH:mm)
    endTime: String,
  },

  computed: {
    // group events  by resource- sorted by alphabet
    eventsGroupedByResource() {
      var grouped = this.groupBy();
      return grouped;
    },
  },
  methods: {
    // Group the elements of Array based on resource prop
    groupBy() {
      var result = this.$_.chain(this.events)
        .groupBy("resource")
        .map((value, key) => ({ resource: key, events: value }))
        .value();
      result = _.sortBy(result, "resource");
      return result;
    },
  },
};
</script>

<style scoped>
.line-container {
  padding: 5px;
  height: 20%;
  min-width: 40px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;

  border-top: 1.5px solid rgb(0, 0, 0, 0.4);
}
</style>