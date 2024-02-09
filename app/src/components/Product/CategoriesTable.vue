<script>
import { mapState, mapActions } from 'pinia'
import { useCategoriesStore } from '../../stores'

export default {
    name: 'CategoriesTable',
    data() {
        return {
            nothing: null
        }
    },
    props: {
        categories: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        editCategory(categoryId) {
            this.setEditCategoryMode(true)
            this.setCategoryToEditId(categoryId)
        },
        ...mapActions(useCategoriesStore, ["deleteCategory", "setEditCategoryMode", "setCategoryToEditId"])
    },
    computed: {
        ...mapState(useCategoriesStore, ["getCategories"])
        
    }
}
</script>

<template>
    <section id="categories-table" class="container">
        <h2 class="text-center">Categories Table</h2>
        
        
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr 
                    v-for="item in getCategories"
                    :key="item.id"
                >
                    <td>
                        <router-link
                            :to="{name: 'ProductDetailsPage', params: {id: item.id}}"
                        >
                            {{ item.name }}
                        </router-link>
                    </td>
                    <td>
                    <img :src="item.image" :alt="item.name" style="max-width: 100%; max-height: 100%; margin:auto;"/>
                    </td>
                    <td>
                        <button 
                            class="btn btn-primary"
                            @click="editCategory(item.id)"
                        >
                            Éditer
                        </button>
                        <!-- Ajouter un bouton de suppression d'un produit -->
                        <!-- au clic, appel de la fonction emitDeleteProduct(product) -->
                        <button 
                            class="btn btn-danger"
                            @click="deleteCategory(item.id)"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>