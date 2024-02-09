
<script>

import { mapState } from 'pinia'
import { useCategoriesStore  } from '@/stores'
import {ProductCategoryCard} from '@/components'

export default {
    name: "ProductsCategoryPage",
    components: {
        ProductCategoryCard
    },
    computed: {
        ...mapState(useCategoriesStore, ["getCategories"])
    }
}
</script>
<template>
    <section class="container row">
        <product-category-card
            v-for="category in getCategories"
            :key="category.id"
            :category="category"
            class="col-4"
        />
    </section>
</template>