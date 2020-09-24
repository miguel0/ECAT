<template>
    <div>
        <Navbar/>
        <b-container>
            <b-row>
                <b-col class="list">
                    <div>
                        <UserList/>
                    </div>
                </b-col>
                <b-col>
                    <div class="profile">
                        <UserProfile/>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import UserProfile from '../components/UserProfile'

export default {
    name: 'UserPanel',
    components: {
        Navbar,
        UserList,
        UserProfile
    }
}
</script>

<style scoped>
.list {
    padding-top: 5%;
}
.profile {
    padding-top: 20%;
}
</style>