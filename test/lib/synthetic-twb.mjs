// 合成 Tableau 工作簿生成器：给基准测试与「大图」端到端测试共用。
// 生成的是**纯元数据** twb（无数据行），与真实工作簿结构一致。

/**
 * 生成一份合成 .twb。
 * @param {{datasources?: number, fields?: number, worksheets?: number, zones?: number}} options
 * @returns {string} twb XML 文本
 */
export function makeTwb({ datasources = 2, fields = 1000, worksheets = 30, zones = 20 } = {}) {
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
  const ds = Array.from(
    { length: datasources },
    (_, d) =>
      `<datasource caption='数据源 ${d}' name='ds${d}'><connection class='federated'><relation name='t${d}' type='table'/></connection>${cols}</datasource>`
  ).join("");
  const sheets = Array.from({ length: worksheets }, (_, i) => `<worksheet name='工作表${i}'/>`).join("");
  const zoneXml = Array.from(
    { length: zones },
    (_, i) => `<zone x='${i * 3000}' y='0' w='2800' h='6000' type-v2='worksheet' name='工作表${i}'/>`
  ).join("");
  const dash = `<dashboards><dashboard name='仪表板'><size minwidth='1200' minheight='800'/><zones>${zoneXml}</zones></dashboard></dashboards>`;
  return `<?xml version='1.0' encoding='utf-8'?><workbook version='18.1'><worksheets>${sheets}</worksheets>${dash}<datasources>${ds}</datasources></workbook>`;
}
