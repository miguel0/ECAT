<template>
    <div class="ver">
        <div class="hor">
            <div>
                <small class="form-text text-muted">
                    Parte
                </small>
                <p class="title">{{desc}}</p>
            </div>
            <div>
                <small class="form-text text-muted">
                    Nombre en inglés
                </small>
                <p class="name">{{en}}</p>
            </div>
            <div>
                <small class="form-text text-muted">
                    Nombre en chino
                </small>
                <p class="name">{{cn}}</p>
            </div>
            <div>
                <small class="form-text text-muted">
                    Nombre alterno
                </small>
                <p class="name">{{other}}</p>
            </div>
            <div id="img">
                    <a v-bind:href="image" target="_blank"><b-img :src="image" fluid></b-img></a>
            </div>
        </div>
        <div class="hor-right">
            <div class="right">
                <small class="form-text text-muted">
                    Número de parte
                </small>
                <p class="partno" id="myInput">{{partno}}</p>
            </div>
            <div class="my_list">
                <p style="text-align: center">Se encuentra en:</p>
                <div class="list_no_title overflow-auto">
                    <b-list-group>
                        <b-list-group-item v-for="i in children" :key="i">
                            <div class="list-hor"><p>{{ i }}</p><p>x20</p></div>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </div>
    </div>
</template>>

<script>

export default {
    name: 'Part',
    data() {
		return {
			image: 'https://mobileimages.lowes.com/product/converted/008236/008236686920.jpg?size=pdhi',
			desc: 'Tornillo',
			partno: 'Q218B0820',
			en: 'Screw',
			cn: '内六角圆柱头螺钉',
			other: 'Tornillo de prueba',
			parents: [],
			children: ['Camión C7H', 'Camión C8H', 'Camión C9H', 'Camión CAH', 'Camión CBH', 'Camión C7H', 'Camión C8H', 'Camión C9H', 'Camión CAH', 'Camión CBH' ]
		}
    }
}
</script>

<style scoped>
.ver {
	display: flex;
	flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 70vh;
    padding-left: 4%;
    padding-right: 4%;
}
.hor {
	display: flex;
	flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    width: 100%;
    height: 100%;
    padding-left: 0%;
    margin-bottom: 4%;
}
.hor-right {
	display: flex;
	flex-direction: column;
    align-items: flex-end;
    justify-content: start;
    width: 100%;
    height: 100%;
    padding-right: 0%;
    margin-bottom: 4%;
}
.title{
    font-size: 40px;
    font-weight: bold;
    text-align: start;
    margin-right: 0%;
    word-wrap: break-word;
    max-width: 100%;
    margin-top: 3%;
    margin-bottom: 3%;
}
.partno{
    font-size: 20px;
    color:black;
    margin-top: 3%;
    margin-bottom: 3%;
}
.name{
    font-size: 20px;
    margin-right: 0%;
    margin-top: 3%;
    margin-bottom: 3%;
}
#img {
	height:100%;
	width:70%;
    margin-top: 5%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: row;
}
.my_list {
	width: 100%;
    padding-right: 0%;
    padding-left: 15%;
    padding-top: 5%;
}
.list_no_title {
	max-height: 50%;
}
.list-hor{
    display: flex;
    justify-content: space-between;
}
.right{
    text-align: end;
}
</style>