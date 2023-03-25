<template>
  <div :class="{ 'has-logo': showLogo }" :style="{
    backgroundColor:
      sideTheme === 'theme-dark'
        ? variables.menuBackground
        : variables.menuLightBackground,
  }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="
        sideTheme === 'theme-dark'
          ? variables.menuBackground
          : variables.menuLightBackground
      " :text-color="
  sideTheme === 'theme-dark'
    ? variables.menuColor
    : variables.menuLightColor
" :unique-opened="true" :active-text-color="theme" :collapse-transition="false" mode="vertical">
        <!-- 自己的侧边菜单 -->

        <!-- 首页 -->
        <el-menu-item index="/index">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <router-link to="/index">首页</router-link>
        </el-menu-item>

        <!-- 审核功能 -->
        <el-sub-menu index="/audit">

          <template #title>
            <el-icon>
              <BellFilled />
            </el-icon>
            <span>审核功能</span>
          </template>

          <el-menu-item index="/audit/waitAudit">
            <router-link to="/audit/waitAudit">待审核</router-link>
          </el-menu-item>
          <el-menu-item index="/audit/audited">
            <router-link to="/audit/audited">已审核</router-link>
          </el-menu-item>
        </el-sub-menu>

        <!-- 劳动计划 -->
        <el-menu-item index="/laborplane/index">
          <el-icon>
            <List />
          </el-icon>
          <router-link to="/laborplane/index">劳动计划</router-link>
        </el-menu-item>

        <!-- 自动生成的 -->
        <sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.module.scss";
import useAppStore from "@/store/modules/app";
import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

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
});
</script>
