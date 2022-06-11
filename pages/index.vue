<template>
  <div>
    <!-- <div class="mb-10 ml-10 mr-10 mt-10">
      <p class="text-center text-green-600">Tabledata </p>
      <Table />
    </div> -->
    <div class="mb-10 ml-10 mr-10 mt-10">
      <p class="text-center text-green-600">Tabledata Binding</p>
      <!-- <Testdataprime /> -->
    </div>
    <div class="mb-10 ml-10 mr-10 mt-10">
      <p class="text-center text-green-600">primevue Binding</p>
      <test />
      <!-- <DataTableFilterDemo /> -->
      <Vuetablecom />
    </div>
    </div>

</template>

<script>
// import Testdataprime from '../components/Testdataprime.vue'
import test from '../components/test.vue';
import DataTableFilterDemo from '../components/DataTableFilterDemo.vue';
import Vuetablecom from '../components/Vuetablecom.vue';
// import Tabledataprime from '../components/Testdataprime.vue';
// import primevue from '../components/Primevue.vue'
export default {
  components: { test, DataTableFilterDemo, Vuetablecom
},
  // components: { primevue },

  name: 'IndexPage'
}
</script>
