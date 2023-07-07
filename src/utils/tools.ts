export const loadInfo = async (query:any, param:any, data:any, pages:any) => {
  param.pageNum = pages.current;
  param.pageSize = pages.pageSize;
  pages.hideOnSinglePage = false;
  const result = await query(param);
  if (result.code == 200 || result.code == 0) {
    pages.total = result.total;
    data.value = result.data;
  }
};

export const loadJSONInfo = async (query:any, param:any, data:any, pages:any) => {
  param.pageNum = pages.current;
  param.pageSize = pages.pageSize;
  pages.hideOnSinglePage = false;
  const result = await query(param, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (result.code == 200 || result.code == 0) {
    pages.total = result.total;
    data.value = result.data;
  }
};

export const getPagination = () => {
  return reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40'],
    showQuickJumper: true,
    showSizeChanger: true,
    showLessItems: true,
    hideOnSinglePage: true,
    total: 0,
    showTotal: (total:any) => {
      return '共 ' + total + ' 条';
    },
  });
};

export const toRawMeta = (meta:any) => {
  const rawMeta = {
    ...meta,
    callback: { ...meta.callback },
    expire: { ...meta.expire },
    form: { ...meta.form },
    other: { ...meta.other },
    handlers: [...meta.handlers],
    cc: [...meta.cc],
    conditions: [...meta.conditions],
  };
  return reactive(rawMeta);
};

export const toNodeMeta = (meta:any) => {
  return {
    ...meta,
    callback: { ...meta.callback },
    expire: { ...meta.expire },
    form: { ...meta.form },
    other: { ...meta.other },
    handlers: [...meta.handlers],
    cc: [...meta.cc],
    conditions: [...meta.conditions],
  };
};

export const getPrvNodes = (nodeList:any, linkList:any, id:any) => {
  let nodeMap = new Map();
  let linkMap = new Map();
  nodeList.forEach((node:any) => {
    nodeMap.set(node.id, node);
  });
  linkList.forEach((link:any) => {
    let prvLinks = linkMap.get(link.endId);
    if (prvLinks) {
      prvLinks.push(link);
    } else {
      prvLinks = [];
      prvLinks.push(link);
      linkMap.set(link.end.id, prvLinks);
    }
  });
  const prvNodes:any = [];
  linksforEach(id, nodeMap, linkMap, prvNodes);
  return prvNodes;
};

const linksforEach = (id:any, nodeMap:any, linkMap:any, prvNodes:any) => {
  let prvLinks = linkMap.get(id);
  if (prvLinks) {
    prvLinks.forEach((link:any) => {
      let node = nodeMap.get(link.start.id);
      if (node) {
        let meta = toNodeMeta(node.meta);
        meta.id = node.id;
        prvNodes.push(meta);
        linksforEach(node.id, nodeMap, linkMap, prvNodes);
      }
    });
  }
};

export const treeFindPath:any = (tree:any, func:any, name = 'id', path:any = []) => {
  if (!tree) return [];
  for (const data of tree) {
    //* 这里按照你的需求来存放最后返回的内容吧
    path.push(data[name]);
    if (func(data)) return path;
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, name, path);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
};
