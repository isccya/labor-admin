<template>
  <div :class="{ 'has-logo': showLogo }" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <template #title>
            <router-link to="/student/center">
              <el-icon><User /></el-icon>
              <span>学生信息</span>
            </router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <template #title>
            <router-link to="/manager/info">
              <el-icon><location /></el-icon>
              <span>管理员信息</span>
            </router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <template #title>
            <router-link to="/notice/info">
              <el-icon><DataLine /></el-icon>
              <span>公告管理</span>
            </router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <template #title>
            <router-link to="/log/info">
              <el-icon><Memo /></el-icon>
              <span>系统日志</span>
            </router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>
            <router-link to="/edit/info">
              <el-icon><Bell /></el-icon>
              <span>通知编辑</span>
            </router-link>
          </template>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script setup>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute();
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarRouters =  computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})

</script>