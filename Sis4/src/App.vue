<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  TeamOutlined,
  ReadOutlined,
  CheckSquareOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)

const selectedKeys = computed(() => [route.name])
const title = computed(() => route.meta.title || '')

function onMenuClick({ key }) {
  router.push({ name: key })
}
</script>

<template>
  <a-layout class="shell">
    <a-layout-sider v-model:collapsed="collapsed" collapsible breakpoint="lg" theme="light">
      <div class="brand">{{ collapsed ? 'SD' : 'Student Dashboard' }}</div>
      <a-menu :selected-keys="selectedKeys" mode="inline" @click="onMenuClick">
        <a-menu-item key="dashboard">
          <DashboardOutlined />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="students">
          <TeamOutlined />
          <span>Students</span>
        </a-menu-item>
        <a-menu-item key="courses">
          <ReadOutlined />
          <span>Courses</span>
        </a-menu-item>
        <a-menu-item key="assignments">
          <CheckSquareOutlined />
          <span>Assignments</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <h1>{{ title }}</h1>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
.shell {
  min-height: 100vh;
}
.brand {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
}
.header {
  background: #fff;
  padding: 0 24px;
}
.header h1 {
  margin: 0;
  font-size: 20px;
  line-height: 64px;
}
.content {
  margin: 24px;
}
</style>
