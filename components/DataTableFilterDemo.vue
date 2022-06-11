<template>

    <div class="card">
        <!-- {{ customers }} -->
        <h5>Session Storage</h5>
        <DataTable :value="customers" :paginator="true" :rows="10" :filters.sync="filters1"
            :selection.sync="selectedCustomer1" selectionMode="single" dataKey="id" stateStorage="session"
            stateKey="dt-state-demo-session" responsiveLayout="scroll">
            <template #header>
                <span class="p-input-icon-left">
                    <!-- <i class="pi pi-search" /> -->
                    <Input v-model="filters1" placeholder="Global Search" />
                </span>
            </template>
            <Column field="name" header="Name" :sortable="true" :styles="{ width: '25%' }">
                <template #filter>
                    <InputText type="text" v-model="filters1['name']" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Country" :sortable="true" sortField="country.name" filterField="country.name"
                filterMatchMode="contains" :styles="{ width: '25%' }">
                <template #body="slotProps">
                    <img src="../assets/images/flag_placeholder.png" :class="'flag flag-' + slotProps.data.country.code"
                        width="30" />
                    <span class="image-text">{{ slotProps.data.country.name }}</span>
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters1['country.name']" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>
            <Column header="Representative" :sortable="true" sortField="representative.name"
                filterField="representative.name" filterMatchMode="in" :styles="{ width: '25%' }">
                <template #body="slotProps">
                    <img :alt="slotProps.data.representative.name"
                        :src="'../assets/images/avatar/' + slotProps.data.representative.image" width="32"
                        style="vertical-align: middle" />
                    <span class="image-text">{{ slotProps.data.representative.name }}</span>
                </template>
                <template #filter>
                    <MultiSelect v-model="filters1['representative.name']" :options="representatives" optionLabel="name"
                        optionValue="name" placeholder="All" class="p-column-filter">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option">
                                <img :alt="slotProps.option.name"
                                    :src="'../assets/images/avatar/' + slotProps.option.image" width="32"
                                    style="vertical-align: middle" />
                                <span class="image-text">{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column>
            <Column field="status" header="Status" :sortable="true" filterMatchMode="equals" :styles="{ width: '25%' }">
                <template #body="slotProps">
                    <span :class="'customer-badge status-' + slotProps.data.status">{{ slotProps.data.status }}</span>
                </template>
                <template #filter>
                    <Dropdown v-model="filters1['status']" :options="statuses" placeholder="Select a Status"
                        class="p-column-filter" :showClear="true">
                        <template #option="slotProps">
                            <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <template #empty>
                No customers found.
            </template>
        </DataTable>
    </div>
</template>

<script>
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';
import { FilterMatchMode } from 'primevue/api';
import CustomerService from './service/CustomerService';
export default {
    // components: {
    //     DataTable,
    //     Column,
    //     ColumnGroup
    
    // },
    data() {
        return {
            customers: null,
            selectedCustomer1: null,
            selectedCustomer2: null,
            filters1: {},
            filters2: {},
            loading: true,
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
            ]
        }
    },
    // customerService: null,
    created() {
        this.customers = [
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
        // customerService
        this.initFilters1();
        this.initFilters2();
    },
    // mounted() {
    //     this.customerService.getCustomersMedium().then(data => this.customers = data);
    //     // console.log(this.customerService)
    // },
    methods: {
        initFilters1() {
            this.filters1 = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        },
        initFilters2() {
            this.filters2 = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    }
};
</script>
>