<script>
import {CategoryForm, CategoriesTable} from "@/components"

export default {
    name: "CategoryAdmin",
    components: {
        CategoryForm,
        CategoriesTable
        
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<template>
    <section class="d-flex wrap">
        <category-form class="col-6"/>
        <categories-table class="col-6" s/>
    </section>
</template>