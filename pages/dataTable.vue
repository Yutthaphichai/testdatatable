<!-- <template>
    <DataTable :columns="columns" :data="data" actions="view,edit,delete" title="Users from JSON" @edit="onRowEdit"
        @view="onRowView"></DataTable>
</template>
<script>
import DataTable from "../components/DataTable";
import usersData from "../components/usersData";
export default {
    components: {
        DataTable
    },
    data() {
        return {
            data: usersData,
            columns: [
                {
                    label: "Name",
                    prop: "name",
                    maxWidth: 220,
                    sortable: true
                },
                {
                    label: "Email",
                    prop: "email",
                    component: "EmailLink",
                    maxWidth: 240,
                    sortable: true
                },
                {
                    label: "Gender",
                    prop: "gender",
                    component: "GenderBadge",
                    maxWidth: 100,
                    sortable: true
                },
                {
                    label: "Salary",
                    prop: "salary",
                    component: "Salary",
                    minWidth: 150,
                    maxWidth: 180,
                    sortable: true
                }
            ]
        };
    },
    methods: {
        onRowView(row) {
            alert("View clicked");
        },
        onRowEdit(row) {
            alert("Edit clicked");
        }
    }
};
</script>
<style>
</style> -->
