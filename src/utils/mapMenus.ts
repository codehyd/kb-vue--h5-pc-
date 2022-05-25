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
  // menuList排序 根据menuTitle 1.销售管理 2.采购管理 3. 仓库管理 4.财务管理 5.经营报表 6.基础资料
  menuList.sort((a, b) => {
    if (a.menuTitle === "销售管理") {
      return -1;
    }
    if (b.menuTitle === "销售管理") {
      return 1;
    }
    if (a.menuTitle === "采购管理") {
      return -1;
    }
    if (b.menuTitle === "采购管理") {
      return 1;
    }
    if (a.menuTitle === "仓库管理") {
      return -1;
    }
    if (b.menuTitle === "仓库管理") {
      return 1;
    }
    if (a.menuTitle === "财务管理") {
      return -1;
    }
    if (b.menuTitle === "财务管理") {
      return 1;
    }
    if (a.menuTitle === "经营报表") {
      return -1;
    }
    if (b.menuTitle === "经营报表") {
      return 1;
    }
    if (a.menuTitle === "基础资料") {
      return -1;
    }
    if (b.menuTitle === "基础资料") {
      return 1;
    }
    return 0;
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
