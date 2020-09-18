<template>
  <app-container :is-loading="false " top-nav-color="success" no-bars>
    <template #top-nav>
      <button v-on:click="setPage('f')" class="btn-transparent">Double component</button>
      <button v-on:click="setPage('s')" class="btn-transparent">Single Component</button>
    </template>
    <template #side-nav>
      <demo-sidenav />
    </template>
    <first-page v-if="page =='f'"></first-page>
    <second-page v-if="page =='s'"></second-page>
  </app-container>
</template>
 



<script>
//!PAGES
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
// main.js
import Vue from "vue";
import VueAdminLte from "@keenmate/vue-adminlte";
// import code of original (mostly) adminlte project
import "@keenmate/vue-adminlte/src/vue-adminlte-setup";
//import VueRouter from "vue-router";

import moment from "moment";
import Multiselect from "vue-multiselect";
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
  components: { FirstPage, SecondPage },
  data() {
    return {
      page: "f",
    };
  },
  methods: {
    setPage(page) {
      this.page = page;
    },
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
.btn-transparent {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>