<template>
  <div class="c-map" :class="{'expanded-map': expanded }">
    <div
      v-if="pointInfo.code && !pointInfo.geometry && !expanded"
      class="not-mapped-msg-container"
    >
      <div class="not-mapped-msg">
        {{ $t("Not mapped") }}
      </div>
    </div>

    <transition name="fade">
      <div v-if="pending" class="spinner-overlay">
        <spinner-anim scale="1" />
      </div>
    </transition>

    <div class="map__card-content container mx-auto">
      <div v-if="expanded" class="my-auto mx-auto h-full lg:flex flex-col justify-center max-w-md lg:absolute">
        <div class="bg-white lg:pb-10 lg:p-10 pt-10 pb-3 mb-5 lg:rounded-lg lg:shadow-lg sm: p-6">
          <div class="c-map__title mb-5">
          <h1 class="text-neutral-base lg:text-3xl text-left text-xl font-bold mb-4">Acompanhe os gastos públicos da cidade de São Paulo em tempo real</h1>
          <p class="text-neutral-light lg:text-base text-left text-sm mt-2">O projeto Cuidando do Meu Bairro propõe tornar mais inteligível a visualização dos dados das despesas públicas a partir da geolocalização dos gastos</p>
        </div>
        <div class="">
          <div class="c-map__search-address lg:mb-5 mb-3">
              <input
                id="search-address-input"
                class="c-map__search-address-input form-control
                block
                w-full
                lg:p-4
                text-base
                font-normal
                text-neutral-base
                placeholder:text-neutral-base
                bg-white bg-clip-padding
                border border-solid border-neutral-light
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-base focus:outline-none"
                type="text"
                v-model="searchAddress"
                @keypress.enter="locateAddress"
                :placeholder="$t('Search for an address')"
                focused
              />
          </div>
          <div class="c-map__year-submit grid grid-cols-2 gap-4 h-8">
            <div>
              <year-select class="w-44" />
            </div>
            <div>
              <button class="btn w-full h-full border-2 hover:bg-primary-dark font-medium text-xs leading-tight uppercase rounded border-primary-base hover:border-primary-dark bg-primary-base text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" @click="locateAddress">Buscar</button>
            </div>
          </div>
        </div>
        </div>
        
        <div class="c-map__legend flex rounded-lg lg:shadow-lg justify-around items-center bg-white p-1 sm: px-6 sm: mb-4">
            <span class="text-neutral-base text-sm font-bold">{{ $t("Map legend") }}:</span>
            <div
              v-for="category in categories"
              :key="category"
              class="capitalize map-category p-2"
            >
              <img :src="$assets[category]" class="w-5 mx-auto" />
              <span class="text-neutral-light text-xs">{{ $t(category) }}</span>
            </div>
        </div>
      </div> 
    </div> 
 
    <div id="map-parent-container" :class="{ 'expanded-map': expanded }">
      <l-map ref="map" id="map-container" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <v-marker-cluster :options="markerClusterOptions">
          <l-geo-json
            v-if="geoJson.features"
            :key="geoJson.features[0].properties.uid"
            v-for="geoJson in geoJsons"
            :geojson="geoJson"
            :options="geoJsonOptions"
          />
        </v-marker-cluster>
      </l-map>

      <div class="map-attribution">
        <a target="_blank" class="mx-5" href="https://www.openstreetmap.org/copyright/pt-BR">
          © Contribuidores do OpenStreetMap
        </a>
      </div>
      <div v-if="expanded" class="map-update-time mx-5">
        {{ $t("source") }}:
        <a
          target="_blank"
          href="https://orcamento.sf.prefeitura.sp.gov.br/orcamento/execucao.php"
          >Secretaria de Finanças</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import L from "leaflet";
import axios from "axios";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import YearSelect from "@/components/YearSelect.vue";
import { assets } from "@/assets";

var greenIcon = L.icon({
  iconUrl: assets.empenhado,
  iconSize: [25, 41],
  popupAnchor: [0, -10],
});
var blueIcon = L.icon({
  iconUrl: assets.liquidado,
  iconSize: [25, 41],
  popupAnchor: [0, -10],
});
var redIcon = L.icon({
  iconUrl: assets.planejado,
  iconSize: [25, 41],
  popupAnchor: [0, -10],
});
var icons = {
  orcado: redIcon,
  atualizado: redIcon,
  empenhado: greenIcon,
  liquidado: blueIcon,
};

export default {
  name: "map-despesas",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    YearSelect,
  },
  data() {
    var self = this;
    return {
      center: L.latLng(-23.58098, -46.61293),
      zoom: 12,
      searchAddress: "",
      categories: ["planejado", "empenhado", "liquidado"],
      url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerClusterOptions: {
        maxClusterRadius: 100,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      },
      geoJsonOptions: {
        pointToLayer(feature, latlng) {
          return L.marker(latlng, { icon: icons[feature.properties.state] });
        },
        onEachFeature(feature, layer) {
          layer.on("click", self.pointClicked);
        },
      },
    };
  },
  computed: {
    // if the map should display expanded or not
    expanded() {
      return this.routeName === "home";
    },
    geoJsons() {
      return [this.yearPoints];
    },
    ...mapState({
      routeName: (state) => state.route.name,
      yearPoints: (state) => state.money.yearPoints,
      pointInfo: (state) => state.money.pointInfo,
      pending: (state) => state.money.pending.yearPoints,
    }),
  },
  methods: {
    pointClicked(event) {
      let code = event.target.feature.properties.uid;
      this.$refs.map.mapObject.panTo(event.latlng);
      this.$router.push({ name: "despesa", params: { code } });
    },
    zoomToPointInfo(pointInfo) {
      if (pointInfo && pointInfo.geometry) {
        let c = pointInfo.geometry.coordinates;
        let l = L.latLng([c[1], c[0]]);
        this.$refs.map.mapObject.flyTo(l, 18);
      }
    },
    async locateAddress() {
      let base = "https://nominatim.openstreetmap.org/search/";
      let query =
        "?format=json&limit=1&countrycodes=br&viewbox=-47.16,-23.36,-45.97,-23.98&bounded=1";
      let url = base + this.searchAddress + query;
      let json = (await axios.get(url)).data;
      if (json) {
        if (json.length)
          this.$refs.map.mapObject.setView([json[0].lat, json[0].lon], 16);
        else this.addError("address_not_found");
      }
    },
    ...mapActions(["addError"]),
  },
  watch: {
    pointInfo(newValue) {
      this.zoomToPointInfo(newValue);
    },
    routeName(newValue) {
      if (newValue === "home")
        this.$refs.map.mapObject.flyTo(this.center, this.zoom);
      else if (newValue === "despesa") this.zoomToPointInfo(this.pointInfo);
    },
  },
};
</script>

<style lang="scss">
  .c-map {
    min-width: 100%;
    transition: all 0.5s ease-out;
    height: 40vh;
    display: inline-block;
    position: relative;
    z-index: 0;
    &.expanded-map {
      height: 75vh;
    }
  }
  .map-update-time {
    background-color: rgba(0,0,0,.5);
    border-radius: 5px 5px 0 0;
    bottom: 0;
    color: #fff;
    font-size: 9pt;
    padding: 2px 10px;
    position: absolute;
    z-index: 1100;
  }
  #map-container {
    z-index: 0;
    height: 100%;
  }
  .expanded-map > #map-container {
    height: 100%;
  }
  #map-parent-container{
    height: 40vh;
    width: 100%;
    position: relative;
    z-index: -100;
    &.expanded-map {
      width: 100%;
      margin: 0px;
      height: 75vh;
      position: relative;
    }
  }
  .search-address {
    z-index: 100;
    @media (min-width: screen-xs) {
      right: 30px;
      width: 370px;
      top: 20px;
      position: absolute;
      border-radius: 4px;
    }
    @media (min-width: screen-sm) {
      right: 130px;
    }
    input {
      width: 400px;
      border: 0px none;
      height: 40px;
      padding-left: 10px;
    }
    .btn {
      height: 40px;
    }
    img {
      height: 20px;
    }
  }
  .marker-cluster { 
    color: white;
    background-color: none;
    text-align: center;
    font-size: 12pt;
    line-height: 40px;
    font-weight: bold;
    background-image: url('../assets/icons/mapa/cluster.svg');
    background-size: 100%;
  }
  .leaflet-control-attribution {
    display: none;
  }
  .map-attribution {
    position: absolute;
    bottom: 0px;
    right: 2px;
    font-size: 7pt;
  }
  .map-legend-container {
    // @extend .flex
    width: 100%;
    position: absolute;
    bottom: 10px;
    justify-content: center;
    pointer-events: none;

    .map-legend {
      font-size: 10pt;
      position: relative;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 20px;
      border-radius: 3px;
      min-width: 160px;
    }
    .map-category {
      margin-left: 15px;
      display: inline-block;
      img {
        margin-right: 5px;
        height: 25px;
      }
    }
  }
</style>