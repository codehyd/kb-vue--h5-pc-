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
