<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'


// switch locale
const { locale } = useI18n({ useScope: 'global' })
const switchLocale = () => {
  if (locale.value === 'cn') {
    locale.value = 'en'
  } else {
    locale.value = 'cn'
  }
}


// get time state for greeting
const getTimeState = computed(() => {
  let timeNow = new Date()
  let hours = timeNow.getHours()
  let state = ``

  if (hours >= 0 && hours <= 10) {
    state = `morning`
  } else if (hours > 10 && hours <= 14) {
    state = `noon`
  } else if (hours > 14 && hours <= 18) {
    state = `after`
  } else if (hours > 18 && hours <= 24) {
    state = `evening`
  }

  return state
})

// todo interfate
interface todo {
  text: string,
  done: boolean,
  createdAt: number
}

const name = ref<string | null>(null)
const input = ref<string | null>(null)
const todos = ref<todo[]>([])

// add todo
const addTodo = () => {
  if (input.value !== null && input.value !== '') {
    todos.value.push({
      text: input.value,
      done: false,
      createdAt: new Date().getTime()
    })
    input.value = ''
  }
}

// delete todo
const delTodo = (target: todo) => {
  todos.value = todos.value.filter(t => t !== target)
}

// order todo list, newest first
const orderedTodos = computed(() => {
  return todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt
  })
})


// update localStorage when change
watch(name, newVal => {
  if (newVal !== null) {
    localStorage.setItem('name', newVal)
  }
})

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

watch(locale, newVal => {
  localStorage.setItem('locale', locale.value as string)
})

// get name, todos and locale from localStorage
onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos') as string) || []
  locale.value = localStorage.getItem('locale') || 'cn'
})

</script>

<template>

  <div class="window">
    <div class="title-bar">
      <button class="close" @click="switchLocale">CN</button>
      <h1 class="title">{{ $t('appTitle') }}</h1>
      <button class="resize"></button>
    </div>
  </div>

  <main>
    <header>
      <h2>{{ $t(`timeState.${getTimeState}`) }} !</h2>
      <input id="name" v-model.trim="name" type="text" maxlength="10" :placeholder="$t('nameholder')">
    </header>
    <div class="add-todo">
      <h3>{{ $t('addTodo') }}</h3>
      <input type="text" v-model.trim="input" @keyup.enter="addTodo" :placeholder="$t('todoHolder')" />
      <button class="btn" @click="addTodo">{{ $t('addBtn') }}</button>
    </div>
    <div class="todo-list">
      <h3>{{ $t('todos') }}</h3>
      <div v-if="orderedTodos.length">
        <div class="field-row todo" v-for="(t, idx) in orderedTodos">
          <input :id="idx.toString()" type="checkbox" v-model="t.done">
          <label :for="idx.toString()">{{ t.text }}</label>
          <button class="btn del" @click="delTodo(t)">{{ $t('delTodo') }}</button>
        </div>
      </div>
      <div v-else>
        <p>{{ $t('noTodos') }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.window {
  max-width: 440px !important;
  margin: auto auto;
  margin-top: 20px;
}

main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 400px;
  box-sizing: border-box;
  margin: auto auto;
  padding: 0 25px;
}

header {
  display: flex;
  align-items: center;
}

header input {
  max-height: 2em;
  max-width: min(calc(90vw - 220px), 450px - 220px);
  font-size: 2em;
  margin-left: 5px;
  border-width: 0;
  background: none;
  font-weight: 500;
}

.add-todo input {
  height: 2em;
  font-size: 1.25em;
  width: 90%;
}

.add-todo button {
  margin-top: 10px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.todo .del {
  height: 20px;
  font-size: 12px !important;
  padding: 0 !important;
  text-align: center;
  line-height: 12px;
  margin-left: auto;
}
</style>
