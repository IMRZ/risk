<template>
  <MapSvgLayer id="regions">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
      @click="click(region)"
    />
  </MapSvgLayer>
</template>

<script>
import { reactive } from '@vue/composition-api';
import _regions from "@/data/regions.json";
import _painted from "@/data/painted.json"
import MapSvgLayer from "@/components/MapSvgLayer.vue";

export default {
  components: { MapSvgLayer },
  setup() {
    const regions = reactive(_regions);

    // paint red/blue
    Object.values(regions).forEach((region) => {
      region.fill = _painted[region.key];
    });

    const style = (region) => ({ fill: `${region.fill}` });

    const click = (region) => {
      if (region.fill === 'red') {
        region.fill = 'blue';
      } else if (region.fill === 'blue') {
        region.fill = 'transparent';
      } else {
        region.fill = 'red';
      }
    };

    return {
      regions,
      style,
      click
    };
  }
};
</script>

<style lang="scss" scoped>
.region {
  fill: transparent;
  fill-opacity: 0.4;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.2;
  }
}
</style>
