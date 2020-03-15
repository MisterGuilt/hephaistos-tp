<template>
  <v-layout column justify-center align-center>
    <h1> {{module.name}} </h1>
      <div v-for="session in sessions" :key="session.id">
        <router-link :to="`/session/${session.id}/do/1`">
          <h2>{{session.name}}</h2>
        </router-link>
        <v-row justify="start">
          <v-card class="ma-2"
          height="8em"
          width="16em"
          v-for="exercise in getExercisesBySessionId(session.id)"
          :key="exercise.id"
          >
            <router-link :to="`/session/${session.id}/do/${exercise.id}`">
              <v-card-title class="subtitle-1">
                {{exercise.title}}
              </v-card-title>
            </router-link>
              <v-card-subtitle>
                {{exercise.lang}}
              </v-card-subtitle>
            </v-card>
        </v-row>
      </div>
  </v-layout>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  async mounted() {
    await this.fetchModule({id: this.moduleId})
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({moduleId: m.id}))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({sessionId: s.id}))
    )
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    module() {
        return this.getModuleById(this.moduleId) || {name: 'Loading...'}
    },
    moduleId() {
        return parseInt(this.$route.params.id)
    },
    sessions() {
        return this.getSessionsByModuleId(this.moduleId)
    }
  },
  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  }
}
</script>
