<template>
  <div class="line-container">
    <ResourceLineHorizontal
      v-for="resourceEvents in this.eventsGroupedByResource"
      v-bind:key="resourceEvents.resource"
      :startTime="startTime"
      :endTime="endTime"
      :events="resourceEvents.events"
    ></ResourceLineHorizontal>
  </div>
</template>
<script>
import ResourceLineHorizontal from "./ResourceLineHorizontal";
import Vue from "vue";
import _ from "lodash";
//import { ISO_8601 } from 'moment';
Object.defineProperty(Vue.prototype, "$_", { value: _ });
export default {
  name: "LineContainerHorizontal",
  components: {
    ResourceLineHorizontal,
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
  display: flex;
  width: 6rem;
  height: 100%;
  flex-wrap: nowrap;
  flex-direction: column;
  padding: 3px;
  border-top: 1.5px solid rgb(0, 0, 0, 0.4);
}
</style>