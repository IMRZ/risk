<template>
  <div id="app">
    <div class="panel">
      <span>armies</span>
    </div>
    <div class="outline">
      <svg ref="svg" class="svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <image
          :href="require('./data/elector_counts_parchment_map.png')"
          :width="741"
          :height="741"
        />
        <MapSvgLayerRegion />
      </svg>
    </div>
    <div class="panel">
      <span>regions</span>
    </div>
  </div>
</template>

<script>
import MapSvgLayerRegion from "@/components/MapSvgLayerRegion";

export default {
  components: {
    MapSvgLayerRegion
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  background-color: black;
}

body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-container {
  display: block;
  width: 741px;
  height: 741px;
  padding: none;
  margin: none;
}

.outline {
  border: 2px solid #b29871;
}

.panel {
  border: 2px solid #b29871;
  flex: 1;
  height: calc(741px + 4px);
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  user-select: none;
}
</style>
