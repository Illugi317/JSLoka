<template>
  <main>
      <div>
        <input type="text" v-bind="searchText" @keydown="reload"  />
      </div>
      <div :key="concerts.indexOf(concert)" v-for="concert in concerts">
          <img v-if="!concert.hidden" :src="concert.imageSource" alt="" @click="openWindow(concerts.indexOf(concert))">
      </div>
      <div v-if="infoWindowOpen" class="infoWindow">
          <p>{{ infoWindowConcert.eventDateName }}</p>
          <p>{{ infoWindowConcert.name }}</p>
          <p>{{ infoWindowConcert.dateOfShow }}</p>
          <p>{{ infoWindowConcert.userGroupName }}</p>
          <p>{{ infoWindowConcert.eventHallName }}</p>
          <a @click="closeWindow">Loka</a>
      </div>
  </main>
</template>

<script>

export default {

    mounted() {
        console.log("!");
        this.loadConcerts();
    },

    data() {
        return {
            searchText: "",
            concerts: [],
            infoWindowOpen: false,
            infoWindowConcert: {}
        }
    },

    methods: {
        reload()
        {
            for (let concert of this.concerts) {
                concert.hidden = !concert.eventDateName.includes(this.searchText);
            }
            console.log(this.concerts)
        },
        loadConcerts()
        {
            console.log("!!")
            let self = this;
            axios.get("https://apis.is/concerts").then(function (response) {
                console.log(response)
                self.concerts = response.data.results;
                for (let concert of self.concerts) {
                    concert.hidden = false;
                }
            }).catch(function () {
                console.log("Failed to load concerts")
            });
        },
        openWindow (selectedID) 
        {
            this.infoWindowConcert = this.concerts[selectedID];
            this.infoWindowOpen = true;
        },
        closeWindow() 
        {
            this.infoWindowOpen = false;
        }
    }
};
</script>

<style>
    .infoWindow {
        display: block;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        width: 500px;
        height: 500px;
        box-shadow: 0 0 1px 1px gray;
    }
</style>
