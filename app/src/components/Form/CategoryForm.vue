<script>
import { mapState, mapActions } from 'pinia'
import { useCategoriesStore } from '../../stores'

export default {
  name: "CategoryForm",
  emits: ["updateCategory"],
  /* Utilisation d'un hook du cycle de vie du composant */
  /* mounted() {
    console.log(this);
  }, */
  watch: {
    getCategoryToEditId(newValue) {
      if (
        this.getEditCategoryMode && newValue != null && !this.confirmEditMode ||
        this.getEditCategoryMode && newValue != this.currentCategoryId
      ) {
        // IMPORTER LE PRODUIT SELECTIONNÉ
        const category = this.getCategoryById(this.getCategoryToEditId)
        this.name = category.name;
        this.image = category.image;
        this.category = this.getCategoryById(this.getCategoryToEditId).category;
        this.confirmEditMode = true;
        this.currentCategoryId = this.categoryToEditId;
      }
    }
  },
  data() {
    return {
      name: "",
      image: "",
      
      confirmEditMode: false,
      currentCategoryId: null
    };
  },
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    categoryToEdit: {
      type: Object,
      default: null,
    },
  },
  methods: {
    submitForm() {
      if (this.getEditCategoryMode && this.getCategoryToEditId != null) {
        const category = {
          id: this.getCategoryToEditId,
          name: this.name,   
          image: this.image,     
          category: this.category,
        };
        console.log("category", this.category)
        /* this.$emit("updateProduct", product); */
        this.updateCategory(category)
        this.confirmEditMode = false
        this.currentCategoryId = null
      } else {
        const category = {
          id: Math.floor(Math.random() * Date.now()),
          name: this.name,
          image: this.image, 
          category: this.category,
        };
        this.addCategory(category)
      }
      this.resetForm()
    },
    resetForm() {
      this.name = null
      this.image = null
      this.category = null
    },
    cancel() {
      this.resetForm()
      this.confirmEditMode = false
      this.currentCategoryId = null
      this.resetEditionMode()
    },
    /* version avec Alias */
    ...mapActions(useCategoriesStore, {
      addCategory: "addCategory",
      updateCategory: "updateCategory",
      resetEditionMode: "resetEditionMode"
    })
    /* version sans Alias */
    /* ...mapActions(useProductsStore, ["addProduct", "updateProduct"]) */
  },
  computed: {
    ...mapState(useCategoriesStore, [
      "getEditCategoryMode",
      "getCategoryToEditId" ,
      "getCategoryById"
    ]),
  }
};
</script>

<template>
  <section>
    <h2 class="w-f">Categories Form</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          aria-describedby="name-help"
          v-model="name"
          required
        />       
      </div>
      <div class="mb-4">
        <label for="text" class="form-label">Your Img URL</label>
        <input
        type="text" 
        class="form-control" 
        id="image" 
        name="image"
        aria-describedby="image-help"
        v-model="image"
        required
        />
      </div>  
      <!-- <div class="mb-3">
        <label for="category" class="form-label">Catégorie</label>
        <select id="category" class="form-select" v-model="category" required>
          <option value="meat">Viande</option>
          <option value="vegetable">Légume</option>
          <option value="drink">Boisson</option>
          <option value="sweet">Confiserie</option>
        </select>
      </div>
       -->
      
      <button
        class="btn"
        type="submit"
        :class="getEditCategoryMode ? 'btn-primary' : 'btn-success'"
      >
        {{ getEditCategoryMode ? "Mettre à Jour" : "Enregistrer" }}
      </button>
      <button
        v-if="getEditCategoryMode"
        class="btn btn-danger"
        type="button"
        @click="cancel"
      >
        Annuler
      </button>
      <button
        v-else
        class="btn btn-danger"
        type="button"
        @click="resetForm"
      >
        Reset
      </button>
    </form>
  </section>
</template>
