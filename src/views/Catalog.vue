<template>
    <div>
        <!--<Navbar/>-->
        <br>
        <b-container>
            <b-row>
                <b-col>
                    <b-form-input :placeholder="searchPlaceHolder" type='search'></b-form-input>
                </b-col>
            </b-row>
        </b-container>
        
    </div>
    
</template>

<script>

//import Navbar from '../components/Navbar' 

export default {
    name: 'Catalog',
    components: {
        //Navbar
    },
    data() {
        return {
            searchPlaceHolder: 'Busca por VIN'
        }
    }
}
</script>
<style scoped>
.back {
    background-color: red;
}
.main {
    max-width: 70%;
}
</style>