import { defineStore } from 'pinia'
/* Importation des données depuis un fichier json - La conversion est automatique */
/* import categories from "../data/categoriesList.json" */
/* @ est un raccourcis pour partir du dossier src */
import categories from "@/data/categoryList.json"

const STORE_NAME = 'categories'
const STORE_LOCALE_STORAGE_KEY = 'categories'

const getDefaultState = () => categories
const getCurrentState = () => {
  const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY)
  return localeData ? JSON.parse(localeData) : getDefaultState()
}

export const useCategoriesStore = defineStore(STORE_NAME, {
    state: () => {
      return {
        categories: getCurrentState(),
        editCategoryMode: false,
        categoryToEditId: null
      }
    },
    getters: {
      getCategories : (state) => state.categories,
      getEditCategoryMode : (state) => state.editCategoryMode,
      getCategoryToEditId: (state) => state.categoryToEditId,
      getCategoryById: (state) => (id) => {
        return state.categories.find(category => category.id == id)
      }
    },
    actions: {
      updateLocaleStorage() {
        localStorage.setItem(STORE_LOCALE_STORAGE_KEY, JSON.stringify(this.categories))
      },
      addCategory(category) {
        this.categories.push(category)
        this.updateLocaleStorage()
      },
      updateCategory(category) {
        const index = this.categories.findIndex(el => {
            return el.id === category.id
        })
        this.categories[index] = category
        this.updateLocaleStorage()
        this.resetEditionMode()
      },
      deleteCategory(categoryId) {
        /* Ici on va parcourir le tableau categories et supprimer le produit transmis */
        this.categories = this.categories.filter(el => el.id != categoryId)
        this.updateLocaleStorage()
      },
      setEditCategoryMode(mode) {
        this.editCategoryMode = mode
      },
      setCategoryToEditId(id) {
        this.categoryToEditId = id
      },
      resetEditionMode() {
        this.categoryToEditId = null
        this.editCategoryMode = false 
      }
    }
  })