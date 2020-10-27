<template>
    <div class="ver">
        <div class="hor">
            <p class="title">{{desc}}</p>
            <p class="partno">{{partno}}</p>
        </div>
        <div class="hor">
            <p class="name">{{en}}</p>
            <p class="name">{{cn}}</p>
        </div>
        <div class="hor">
            <div id="img">
                    <b-img :src="image" fluid></b-img>
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
    name: 'DetailedPart',
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
	flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100vh;
}
.hor {
	display: flex;
	flex-direction: row;
    align-items: center;
    width: 80%;
    padding-left: 10%;

}
.title{
    font-size: 40px;
    font-weight: bold;
    text-align: start;
    margin-right: 2%;
    word-wrap: break-word;
    max-width: 60%;
    margin-top: 3%;
    margin-bottom: 3%;
}
.partno{
    font-size: 20px;
    color:darkgray;
    margin-top: 3%;
    margin-bottom: 3%;
}
.name{
    font-size: 20px;
    margin-right: 5%;
    margin-top: 3%;
    margin-bottom: 3%;
}
#img {
	height:100%;
	width:50%;
    margin-top: 5%;
    margin-bottom: 5%;
}
.my_list {
	width: 100%;
    padding-right: 20%;
    padding-left: 5%;
}
.list_no_title {
	max-height: 150px;
}
.list-hor{
    display: flex;
    justify-content: space-between;
}
</style>