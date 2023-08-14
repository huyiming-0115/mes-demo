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
    size:'small',
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

/**
 * 校验当前传入字符是否为空
 * @param char 字符串
 * @returns 标志
 */
export const checkCharEmpty = (char:string|number) =>{
  return char == null || char == "" || char == undefined
} 

// 深拷贝方法
export const cloneDeepFn: any = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let result: any;
  if (Array.isArray(obj)) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeepFn(obj[i]);
    }
  } else {
    result = {};
    for (let key in obj) {
      result[key] = cloneDeepFn(obj[key]);
    }
  }
  return result;
};


// list空替换成-
export const wipeListFn = (list: any) => {
  const arr = cloneDeepFn(list);
  const newArr = arr.map((x: any) => {
    for (const key in x) {
      if (x[key] === null || x[key]?.length === 0) {
        x[key] = "-";
      }
    }
    return x;
  });
  return newArr;
};
/**
 * [] => [[],[]]
 * @param list tableList
 * @param exportHeader enkeys
 * @returns manyArray
 */
export const handleTableFn = (list: any, exportHeader: any) => {
  const secondArray: any = [];
  wipeListFn(list).forEach((item: any) => {
    let item_array: any = [];
    exportHeader.forEach((x: any) => {
      item[x] && item_array.push(item[x]);
    });
    secondArray.push(item_array);
  });
  // console.log(secondArray, "导出转换结果");
  return secondArray;
};

// rowId ==> tableList
export const transFormListFn = (rowList: any, tableList: any) => {
  const targetArr: any = [];
  rowList.forEach((x: string) => {
    cloneDeepFn(tableList).forEach((y: any) => {
      x === y.id && targetArr.push(y);
    });
  });
  return targetArr;
};

/**
 * Excel export
 * @param header excelHeader
 * @param data manyArray
 * @param title 
 */
export const exportExcelFn = async (header: any, data: any, title: string) => {
  const excel = await import("./Export2Excel");
  excel.export_json_to_excel({
    header,
    data,
    filename: title,
    autoWidth: true,
    bookType: "xlsx",
  });
};
/**
 * 判断checked tabs  多选框使用
 * @param systemLength 全选的key数组
 * @param targetList 已经选择的key数组
 * @returns {checkAll:boolean,indeterminate:boolean}
 */
export const changeCheckedFn = (systemLength: number, targetList: any): { checkAll: boolean, indeterminate: boolean } => {
  let checkAll: boolean = false, indeterminate: boolean = false
  targetList.length === systemLength && (checkAll = true) && (indeterminate = false)
  targetList.length !== systemLength && (checkAll = false)
  targetList.length < systemLength && (indeterminate = true)
  !targetList.length && (indeterminate = false)
  return { checkAll, indeterminate }
}

// 根据一个数组，返回一个对象,对象里仅包含数组元素
export const arrToObjFn = (obj: any, arr: any) => {
  let targetObj: any = {}
  arr.forEach((x: any) => {
    !(x in targetObj) && (targetObj[x] = cloneDeepFn(obj[x]))
  })
  return targetObj
}
// 根据path拿id  
export const findTreeAtoIdFn = (List: any, Path: any) => {
  const arr: any = TreeToListFn(List);
  const targetObj = arr.find((x: any) => x.path === Path);
  if (!targetObj) {
    console.log("处理数据发生问题，没找到");
  }
  return targetObj?.id || "未找到";
};
export const TreeToListFn = (list: any, targetArr?: any) => {
  let arr: any = [];
  targetArr?.length && (arr = targetArr);
  list.forEach((x: any) => {
    arr.push(x);
    x.children?.length && TreeToListFn(x.children, arr);
  });
  return arr;
};
export const findTreeAtoBFn = (List: any, Path: any) => {
  const arr: any = TreeToListFn(List);
  const targetObj = arr.find((x: any) => x.route === Path);
  return targetObj?.id || "未找到";
};
export const findTreeAtoObjFn = (List: any, Path: any) => {
  const arr: any = TreeToListFn(List);
  const targetObj = arr.find((x: any) => x.path === Path);
  return targetObj || "未找到";
};