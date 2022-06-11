<template>
    <div>
        <!-- {{customers1}} -->
        <div class="content-section introduction">
            <div class="feature-intro">
                <h1>DataTable - Filter</h1>
                <p>Filtering is enabled by defining a filter template per column to populate the filters property of the
                    DataTable.</p>
            </div>
        </div>

        <div class="content-section implementation">
            <div class="card">
                <h5>Filter Menu</h5>
                <p>Filters are displayed in an overlay.</p>
                <DataTable :value="customers1" :paginator="true" class="p-datatable-customers" showGridlines :rows="10"
                    dataKey="id" :filters.sync="filters2" filterDisplay="menu" :loading="loading1"
                    responsiveLayout="scroll"
                    :globalFilterFields="['name','country.name','representative.name','balance','status']">
                    <template #header>
                        <div class="flex justify-content-between">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
                                @click="clearFilter1()" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters2['global'].value" placeholder="Keyword Search" />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No customers found.
                    </template>
                    <template #loading>
                        Loading customers data. Please wait.
                    </template>
                    <Column field="name" header="Name" :styles="{'min-width':'12rem'}">
                        <template #body="{data}">
                            {{data.name}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column header="Country" filterField="country.name" :styles="{'min-width':'12rem'}">
                        <template #body="{data}">
                            <img src="../assets/images/flag_placeholder.png" :class="'flag flag-' + data.country.code"
                                width="30" />
                            <span class="image-text">{{data.country.name}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by country" />
                        </template>
                        <template #filterclear="{filterCallback}">
                            <Button type="button" icon="pi pi-times" @click="filterCallback()"
                                class="p-button-secondary"></Button>
                        </template>
                        <template #filterapply="{filterCallback}">
                            <Button type="button" icon="pi pi-check" @click="filterCallback()"
                                class="p-button-success"></Button>
                        </template>
                        <template #filterfooter>
                            <div class="px-3 pt-0 pb-3 text-center font-bold">Customized Buttons</div>
                        </template>
                    </Column>
                    <Column header="Agent" filterField="representative" :showFilterMatchModes="false"
                        :filterMenuStyle="{'width':'14rem'}" :styles="{'min-width':'14rem'}">
                        <template #body="{data}">
                            <img :alt="data.representative.name"
                                :src="'../assets/images/avatar/' + data.representative.image" width="32"
                                style="vertical-align: middle" />
                            <span class="image-text">{{data.representative.name}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <div class="mb-3 font-bold">Agent Picker</div>
                            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name"
                                placeholder="Any" class="p-column-filter">
                                <template #option="slotProps">
                                    <div class="p-multiselect-representative-option">
                                        <img :alt="slotProps.option.name"
                                            :src="'../assets/images/avatar/' + slotProps.option.image" width="32"
                                            style="vertical-align: middle" />
                                        <span class="image-text">{{slotProps.option.name}}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                        </template>
                    </Column>
                    <Column header="Date" filterField="date" dataType="date" :styles="{'min-width':'10rem'}">
                        <template #body="{data}">
                            {{data.date}}
                        </template>
                        <template #filter="{filterModel}">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                    <Column header="Balance" filterField="balance" dataType="numeric" :styles="{'min-width':'10rem'}">
                        <template #body="{data}">
                            {{data.balance}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>
                    <Column field="status" header="Status" :filterMenuStyle="{'width':'14rem'}"
                        :styles="{'min-width':'12rem'}">
                        <template #body="{data}">
                            <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any"
                                class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.value"
                                        v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span
                                        :class="'customer-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="activity" header="Activity" :showFilterMatchModes="false"
                        :styles="{'min-width':'12rem'}">
                        <template #body="{data}">
                            <ProgressBar :value="data.activity" :showValue="false"></ProgressBar>
                        </template>
                        <template #filter="{filterModel}">
                            <Slider v-model="filterModel.value" :range="true" class="m-3"></Slider>
                            <div class="flex align-items-center justify-content-between px-2">
                                <span>{{filterModel.value ? filterModel.value[0] : 0}}</span>
                                <span>{{filterModel.value ? filterModel.value[1] : 100}}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center"
                        :styles="{'min-width':'8rem'}">
                        <template #body="{data}">
                            <i class="pi"
                                :class="{'true-icon pi-check-circle': data.verified, 'false-icon pi-times-circle': !data.verified}"></i>
                        </template>
                        <template #filter="{filterModel}">
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column>
                </DataTable>
            </div>


        </div>


    </div>
</template>

<script>
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';
import CustomerService from './service/CustomerService';
import FilterMatchMode from './api/FilterMatchMode';
import FilterOperator from './api/FilterOperator';
// import { FilterMatchMode ,FilterOperator } from 'primevue/api';

export default {
    // components: {
    //     DataTable,
    //     Column,
    //     ColumnGroup
    // },
    data() {
        return {
            customers1: null,
            customers2: null,
            filters1: null,
            filters2: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'representative': { value: null, matchMode: FilterMatchMode.IN },
                'status': { value: null, matchMode: FilterMatchMode.EQUALS },
                'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            representatives: [
                { name: "Amy Elsner", image: 'amyelsner.png' },
                { name: "Anna Fali", image: 'annafali.png' },
                { name: "Asiya Javayant", image: 'asiyajavayant.png' },
                { name: "Bernardo Dominic", image: 'bernardodominic.png' },
                { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
                { name: "Ioni Bowcher", image: 'ionibowcher.png' },
                { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
                { name: "Onyama Limba", image: 'onyamalimba.png' },
                { name: "Stephen Shaw", image: 'stephenshaw.png' },
                { name: "XuXue Feng", image: 'xuxuefeng.png' }
            ],
            statuses: [
                'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
            ],
            loading1: true,
            loading2: true
        }
    },
    created() {
        this.customerService = new CustomerService();
        this.initFilters1();
    },
    mounted() {
        this.customers1 = [
            {
                "id": 1000, "name": "James Butt",
                "country": { "name": "Algeria", "code": "dz" },
                "company": "Benton, John B Jr",
                "date": "2015-09-13", "status": "unqualified",
                "verified": true,
                "activity": 17,
                "representative": { "name": "Ioni Bowcher", "image": "ionibowcher.png" },
                "balance": 70663
            }, {
                "id": 1001,
                "name": "Josephine Darakjy",
                "country": { "name": "Egypt", "code": "eg" },
                "company": "Chanay, Jeffrey A Esq",
                "date": "2019-02-09",
                "status": "proposal",
                "verified": true,
                "activity": 0,
                "representative": {
                    "name": "Amy Elsner",
                    "image": "amyelsner.png"
                }, "balance": 82429
            }, {
                "id": 1002,
                "name": "Art Venere",
                "country": {
                    "name": "Panama",
                    "code": "pa"
                },
                "company": "Chemel, James L Cpa",
                "date": "2017-05-13",
                "status": "qualified",
                "verified": false,
                "activity": 63,
                "representative": {
                    "name": "Asiya Javayant",
                    "image": "asiyajavayant.png"
                },
                "balance": 28334
            },
            {
                "id": 1003,
                "name": "Lenna Paprocki",
                "country": {
                    "name": "Slovenia",
                    "code": "si"
                },
                "company": "Feltz Printing Service",
                "date": "2020-09-15",
                "status": "new",
                "verified": false,
                "activity": 37,
                "representative": {
                    "name": "Xuxue Feng",
                    "image": "xuxuefeng.png"
                },
                "balance": 88521
            },
            {
                "id": 1004,
                "name": "Donette Foller",
                "country": {
                    "name": "South Africa",
                    "code": "za"
                },
                "company": "Printing Dimensions",
                "date": "2016-05-20",
                "status": "proposal",
                "verified": true,
                "activity": 33,
                "representative": {
                    "name": "Asiya Javayant",
                    "image": "asiyajavayant.png"
                },
                "balance": 93905
            },
            {
                "id": 1005,
                "name": "Simona Morasca",
                "country": {
                    "name": "Egypt",
                    "code": "eg"
                },
                "company": "Chapman, Ross E Esq",
                "date": "2018-02-16",
                "status": "qualified",
                "verified": false,
                "activity": 68,
                "representative": {
                    "name": "Ivan Magalhaes",
                    "image": "ivanmagalhaes.png"
                },
                "balance": 50041
            },
            {
                "id": 1006,
                "name": "Mitsue Tollner",
                "country": {
                    "name": "Paraguay",
                    "code": "py"
                },
                "company": "Morlong Associates",
                "date": "2018-02-19",
                "status": "renewal",
                "verified": true,
                "activity": 54,
                "representative": {
                    "name": "Ivan Magalhaes",
                    "image": "ivanmagalhaes.png"
                },
                "balance": 58706
            },
            {
                "id": 1007,
                "name": "Leota Dilliard",
                "country": {
                    "name": "Serbia",
                    "code": "rs"
                },
                "company": "Commercial Press",
                "date": "2019-08-13",
                "status": "renewal",
                "verified": true,
                "activity": 69,
                "representative": {
                    "name": "Onyama Limba",
                    "image": "onyamalimba.png"
                },
                "balance": 26640
            },
        ];
        // this.customerService.getCustomersLarge().then(data => {
        //     this.customers1 = data;
        //     this.loading1 = false;
        //     this.customers1.forEach(customer => customer.date = new Date(customer.date));
        // });

        // this.customerService.getCustomersLarge().then(data => {
        //     this.customers2 = data;
        //     this.loading2 = false;
        //     this.customers2.forEach(customer => customer.date = new Date(customer.date));
        // });

        // console.log("cus", this.customers1);
    },
    methods: {
        // formatDate(value) {
        //     return value.toLocaleDateString('en-US', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric',
        //     });
        // },
        // formatCurrency(value) {
        //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        // },
        clearFilter1() {
            this.initFilters1();
        },
        initFilters1() {
            this.filters1 = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'representative': { value: null, matchMode: FilterMatchMode.IN },
                'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
                'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
                'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
            }
        }
    }
}
</script>

