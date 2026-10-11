/** esbuild 以 text loader 把 CSS 打成字符串，这里声明其模块类型。 */
declare module "*.css" {
  const content: string;
  export default content;
}
