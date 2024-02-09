<script>

export default {
  name: "ProductCategoryCard",

  data () {
    
  },
  props: {
    category: {
      type: Object,
      default: null,
    }
  },
  computed: {
    
  },  
  methods: {
     
    }
  }


// creer un objet qui renseigne les noms de la categorie. qqpart c'est deja pops products.
// si la categorie existe déja, ne pas l'afficher.

</script>

<template>
  <article 
    v-if="category != null"
    class="card" 
    style="width: 18rem;"
  >

  <router-link :to="{name: 'ProductDetailsPage', params: {id: category.id}}" style="text-decoration: none">
    <section class="card-body">
      <p class="card-title" style="font-size:1.5rem ; color:black;">
        {{category.name}}
      </p>
      <img
        :src="category.image"
        :alt="category.name"
        style="max-width: 90%; max-height: 90%; margin:auto;"
      >
    </section>
  </router-link>
  </article>
  <section
    v-else
    class="card" 
    style="width: 18rem;"
  >
    <img src="..." class="card-img-top" alt="...">
    <h3 >Ce produit n'existe pas</h3>
  </section>

</template>
