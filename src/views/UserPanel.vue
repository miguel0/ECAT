<template>
    <div>
        <Navbar/>
        <b-container>
            <b-row>
                <b-col>
                    <UserList/>
                </b-col>
                <b-col>
                    <UserProfile/>
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