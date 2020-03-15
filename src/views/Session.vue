<template>
  <v-container>
    <v-col>
      <v-card class="ma-2"
      height="8em"
      width="16em"
      v-for="exercise in getExercisesBySessionId(sessionId)"
      :key="exercise.id"
      >
      <router-link :to="`/session/${sessionId}/do/${exercise.id}`">
        <v-card-title class="subtitle-1">
          {{exercise.title}}
        </v-card-title>
      </router-link>
        <v-card-subtitle>
          {{exercise.lang}}
        </v-card-subtitle>
      </v-card>
    </v-col>
    <v-col>
      <div id="editor" class="exercise-editor-ace-editor"></div>
    </v-col>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'
export default {
  data() {
    return {
      exerciseId: this.$route.params.exerciseId,
      sessionId: this.$route.params.sessionId,
      editor: null
    }
  },
  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapGetters('sessions', ['getSessionById']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    session() {
        return this.getSessionById(this.moduleId) || {name: 'Loading...'}
    },
  },
  methods: {
    ...mapActions("exercises", ["fetchExercisesForSession", "fetchExerciseForSession"])
  },
  async mounted() {
    this.fetchExerciseForSession({sessionId: this.sessionId,exerciseId: this.exerciseId});
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode(`ace/mode/${this.lang}`)

  }
}
</script>

<style>
.exercise-editor-ace-editor {
 position: relative;
 height: 20rem;
}
</style>
