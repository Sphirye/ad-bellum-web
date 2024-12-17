<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="display().mobile.value"
    :width="display().mobile.value ? '100%' : '650px'"
  >
    <Card>
      <template v-slot:title>
        Crear usuario

        <v-spacer/>

        <v-btn
          variant="text"
          @click="dialog = false"
          icon
        >
          <v-icon
            size="25"
            icon="mdi-close"
          />
        </v-btn>
      </template>

      <template v-slot:text>
        <v-form ref="form">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="model.username"
                variant="outlined"
                label="Nombre"
                hide-details="auto"
                :rules="[rules.required]"
              />
            </v-col>
  
            <v-col cols="12">
              <v-text-field
                v-model="model.email"
                variant="outlined"
                label="Email"
                hide-details="auto"
                clearable
                :rules=[rules.email]
              />
            </v-col>
  
            <v-col cols="6">
              <v-text-field
                v-model="model.password"
                variant="outlined"
                label="Contraseña"
                hint="La contraseña debe ser de al menos 5 digitos."
                hide-details="auto"
                clearable
                :rules="[
                  (model.password == passwordConfirm), rules.minLength(5),
                ]"
              />
            </v-col>
  
            <v-col cols="6">
              <v-text-field
                v-model="passwordConfirm"
                variant="outlined"
                label="Repetir contraseña"
                hide-details="auto"
                clearable
                :rules="[(model.password == passwordConfirm), rules.minLength(5)]"
              />
            </v-col>
          </v-row>
        </v-form>
      </template>

      <template v-slot:actions>
        <v-btn
          color="primary"
          variant="flat"
          @click="createUser()"
        >
          Crear usuario
        </v-btn>
      </template>
    </Card>

  </v-dialog>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { SingleItem } from '@/handlers/interfaces/ContentUI';
import User from '@/models/User';
import Rules from '@/services/tools/Rules';
import UserService from '@/services/UserService';
import { useDisplay } from 'vuetify';

export default defineComponent({
  data() {
    return {
      dialog: false as boolean,
      model: new User(),
      passwordConfirm: "",
      loading: false,
    }
  },

  computed: {
    display() {
      return useDisplay;
    },

    rules() {
      return Rules
    }
  },

  methods: {
    async createUser() {
      if (await this._isFormValid()) {
        let user: SingleItem<User> = { item: new User }
        await Handler.getItem(this, user, () =>
          UserService.postUser(this, this.model)
        )
        this.$emit('onUserCreated')
        this.dialog = false
      }
    },

    async _isFormValid() {
      const { valid } = await (this.$refs['form'] as any).validate()
      return valid as boolean
    },
  }
})
</script>