function buildModuleTypes({ moduleName, types }) {
  return Object.entries(types)
    .reduce(
      (exportTypes, [type, value]) => {
        const tmpTypes = exportTypes;
        tmpTypes[type] = `${moduleName}/${value}`;
        return tmpTypes;
      },
      {},
    );
}

export { buildModuleTypes as default };
