import { RouteRecordRaw } from "vue-router";

// 获取路由数组的前n个 如果不够的话则获取全部
export const getMenu = (menu: any[], n: number) => {
  const menuList = menu.slice(0, n);
  return menuList;
};

// 路由分类 通过路由的每一个parent分类
export const getMenuByParent = (menus: any[]) => {
  const menuList: any[] = [];
  // 遍历路由
  menus.forEach((menuItem: any, index: number) => {
    const find = menuList.find((item) => item.parent === menuItem.parent);
    if (!find) {
      menuList.push({
        parent: menuItem.parent,
        children: [menuItem],
        menuTitle: menuItem.showparent,
      });
    } else {
      find.children.push(menuItem);
    }
  });
  console.log(menuList);

  return menuList;
};

// 添加动态路由
export const addDynamicRoutes = (menus: any[]): RouteRecordRaw[] => {
  const allRoutes: RouteRecordRaw[] = [];
  //vite
  const routeFiles = import.meta.globEager("../router/allRoutes/*.ts");
  for (const fileModule in routeFiles) {
    const route = routeFiles[fileModule].default;
    const isRoutePath = menus.find(
      (item: any) => `/main${item.path}` == route.path
    );
    if (isRoutePath) allRoutes.push(route);
  }

  return allRoutes;
};

// // 通过path路径去获取路由的id
// export const getRouteId = (menus: any[], path: string) => {
//   const allRoutes = [];

// };
