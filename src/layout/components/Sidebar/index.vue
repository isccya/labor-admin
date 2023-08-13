<template>
  <div :class="{ 'has-logo': showLogo }"
    :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor" :unique-opened="true"
        :active-text-color="theme" :collapse-transition="false" mode="vertical" router>
        <el-menu-item index="/index">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>&nbsp;&nbsp;首页</span>
        </el-menu-item>
        <el-menu-item index="/audit">
          <el-icon>
            <BellFilled />
          </el-icon>
          <span>&nbsp;&nbsp;审核功能</span>
        </el-menu-item>
        <el-menu-item index="/laborPlan">
          <el-icon>
            <List />
          </el-icon>
          <span>&nbsp;&nbsp;劳动计划</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <User />
          </el-icon>
          <span>&nbsp;&nbsp;学生信息</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <location />
          </el-icon>
          <span>&nbsp;&nbsp;管理员信息</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon>
            <DataLine />
          </el-icon>
          <span>&nbsp;&nbsp;公告管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>&nbsp;&nbsp;系统日志</span>
        </el-menu-item>
        <el-menu-item index="7">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>&nbsp;&nbsp;通知编辑</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
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

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
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
