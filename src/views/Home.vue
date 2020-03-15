<template>
  <v-layout column justify-center align-center>
    <v-row xs12 sm8 md12 style="max-width: 88 rem">
      <v-col v-for="module in modules" :key="module.id">
        <router-link :to="`/module/${module.id}`">
          <h2>{{module.name}}</h2>
        </router-link>
        <v-row justify="start">
          <v-card class="ma-2"
          height="8em"
          width="16em"
          v-for="session in getSessionsByModuleId(module.id)"
          :key="session.id"
          >
            <v-card-title class="subtitle-1">
              {{session.name}}
            </v-card-title>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  async mounted() {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({moduleId: m.id}))
    )
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapGetters('sessions', ['getSessionsByModuleId'])
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule'])
  }
}
</script>
