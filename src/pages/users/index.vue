<template>
  <v-container>
    <Card>
      <template v-slot:title>
        Usuarios
      </template>

      <template v-slot:text>
        <v-data-table
          :headers="headers"
          hideDefaultFooter
          :items="users.items"
        >
          <template v-slot:item.createdDate="{ item }">
            {{ item.createdDate?.toFormat('DD HH:MM') }}
          </template>
        </v-data-table>
      </template>
    </Card>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem } from '@/handlers/interfaces/ContentUI';
import User from '@/models/User';
import UserService from '@/services/UserService';

export default defineComponent({
  data() {
    return {
      headers: [
        { title: 'Id', align: 'center', value: 'id', width: '80px' },
        { title: 'Email', align: 'center', value: 'email' },
        { title: 'Fecha de creación', align: 'center', value: 'createdDate' },
      ] as any,
      users: { items: [], totalItems: 0 } as MultipleItem<User>,
      loading: false,
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      await Handler.getItems(this, this.users, () =>
        UserService.getUsers(this)  
      )
    },
  },
})
</script>