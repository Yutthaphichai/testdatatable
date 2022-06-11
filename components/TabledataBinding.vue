<template>
  <div id="app-container">
    <DxDataGrid class="mt-10 text-green-500" :data-source="employees" key-expr="EmployeeID">
      <DxColumn data-field="FullName"></DxColumn>
      <DxColumn data-field="Position"></DxColumn>
      <DxColumn data-field="BirthDate" data-type="date"></DxColumn>
      <DxColumn data-field="HireDate" data-type="date">
      </DxColumn>
      <DxColumn data-field="City" />
      <DxColumn data-field="Country"></DxColumn>
      <DxColumn data-field="Address" />
      <DxColumn data-field="HomePhone" />
      <DxColumn data-field="PostalCode" />
    </DxDataGrid>
  </div>
</template>
 
<script>
// ...

import {
  DxDataGrid,
  DxColumn,
  // DxGrouping,
  // DxGroupPanel,
  // DxPager,
  // DxPaging,
  // DxSearchPanel,
} from 'devextreme-vue/data-grid';
import service from './employees.service';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    // DxGrouping,
    // DxGroupPanel,
    // DxPager,
    // DxPaging,
    // DxSearchPanel,
    // DiscountCell,
  },
  data() {
    return {
      employees: service.getEmployees(),
    }
  },
}
</script>