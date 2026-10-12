// 合成 Tableau 工作簿生成器：给基准测试、快照不变量与「大图 / 数据模型」端到端测试共用。
// 生成的是**纯元数据** twb（无数据行），与真实工作簿结构一致：
//   - `relations`：单表 / join 树 / collection
//   - `customSql`：`<relation type='text'>` 自定义 SQL
//   - `formatPadding`：zone 的 <zone-style> 内 padding / margin / 底色
//
// 说明：真实客户工作簿含服务器名、库表名与 SQL，**不得**进仓库；需要验的连接与
// 自定义 SQL 结构一律由本模块合成。

/**
 * 生成一份合成 .twb。
 * @param {object} [options]
 * @param {number} [options.datasources=2] 数据源数量（第 0 个带 join 树）
 * @param {number} [options.fields=1000] 每个数据源的字段数
 * @param {number} [options.worksheets=30] 工作表数量
 * @param {number} [options.zones=20] 仪表板 zone 数量
 * @param {number} [options.joins=0] 第 0 个数据源里的 join 数量（生成链式 join 树）
 * @param {number} [options.customSql=0] 第 0 个数据源里的自定义 SQL 数量（作为 join 的右表参与）
 * @param {boolean} [options.formatPadding=false] zone 是否带 padding / margin / 底色格式
 * @returns {string} twb XML 文本
 */
export function makeTwb({
  datasources = 2,
  fields = 1000,
  worksheets = 30,
  zones = 20,
  joins = 0,
  customSql = 0,
  formatPadding = false
} = {}) {
  let cols = "";
  for (let i = 0; i < fields; i++) {
    const isCalc = i > 10 && i % 5 !== 0;
    const cap = `[字段 ${i}]`;
    if (!isCalc) {
      cols += `<column name='[f${i}]' caption='${cap}' datatype='string' role='${i % 3 === 0 ? "dimension" : "measure"}' type='nominal'/>`;
    } else {
      const refs = [`[f${Math.max(0, i - 1)}]`, `[f${Math.max(0, i - 7)}]`];
      cols += `<column name='[c${i}]' caption='${cap} 计算' datatype='real' role='measure'><calculation class='calculation' formula='SUM(${refs.join(") + SUM(")})'/></column>`;
    }
  }

  /** relation 叶子：物理表 / 自定义 SQL。 */
  const leaf = (name, table) => `<relation connection='federated.0' name='${name}' table='${table}' type='table'/>`;
  const sqlLeaf = (name, sql) => `<relation connection='federated.0' name='${name}' type='text'>${sql}</relation>`;

  /** 第 0 个数据源的 relation：可选 join 链 + 自定义 SQL。 */
  const buildRelationTree = () => {
    if (joins <= 0 && customSql <= 0) return leaf("t0", "[t0]");

    // 组装：t0 join 表1 join 表2 ...（可把自定义 SQL 作为最右侧表）
    let current = leaf("t0", "[t0]");
    // 左深链：每次 join 的左侧是「上一段 join 的右表」，与 Tableau 写出的 ON 表达式一致
    let prevName = "t0";
    for (let j = 0; j < joins; j++) {
      const useSql = customSql > j;
      const rightName = useSql ? `自定义 SQL 查询${j + 1}` : `join${j + 1}`;
      const rightExpr = `[${rightName}].[id]`;
      const leftExpr = `[${prevName}].[id]`;
      const right = useSql
        ? sqlLeaf(rightName, `SELECT id, amount FROM db.table_${j + 1} WHERE dt >= '2024-01-01'`)
        : leaf(rightName, `[${rightName}]`);
      prevName = rightName;
      const joinType = ["inner", "left", "right", "full"][j % 4];
      current =
        `<relation join='${joinType}' type='join'>` +
        `<clause type='join'><expression op='='><expression op='${leftExpr}'/><expression op='${rightExpr}'/></expression></clause>` +
        current +
        right +
        `</relation>`;
    }
    // join 数量为 0 但有自定义 SQL：直接把 SQL 作为唯一 relation
    if (joins <= 0 && customSql > 0) {
      return sqlLeaf("自定义 SQL 查询", "SELECT id, amount FROM db.table_0");
    }
    return current;
  };

  const ds = Array.from({ length: datasources }, (_, d) => {
    const relation = d === 0 ? buildRelationTree() : leaf(`t${d}`, `[t${d}]`);
    return `<datasource caption='数据源 ${d}' name='ds${d}'><connection class='federated'><relation type='collection'>${relation}</relation></connection>${cols}</datasource>`;
  }).join("");

  const sheets = Array.from({ length: worksheets }, (_, i) => `<worksheet name='工作表${i}'/>`).join("");
  const style = formatPadding
    ? `<zone-style><format attr='padding' value='4'/><format attr='margin' value='2'/><format attr='background-color' value='#f5f5f5'/></zone-style>`
    : "";
  const zoneXml = Array.from(
    { length: zones },
    (_, i) => `<zone x='${i * 3000}' y='0' w='2800' h='6000' type-v2='worksheet' name='工作表${i}'>${style}</zone>`
  ).join("");
  const dash = `<dashboards><dashboard name='仪表板'><size minwidth='1200' minheight='800'/><zones>${zoneXml}</zones></dashboard></dashboards>`;
  return `<?xml version='1.0' encoding='utf-8'?><workbook version='18.1'><worksheets>${sheets}</worksheets>${dash}<datasources>${ds}</datasources></workbook>`;
}
