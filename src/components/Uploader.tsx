// 上传组件：拖拽 / 选择 .twb，并明确拒绝 .twbx（数据安全）。
//
// .twbx 有意不支持：打包工作簿可能内嵌数据提取（.hyper 等），只读解析 .twb
// 元数据可以避免把数据带进检视流程（见 README「数据安全」）。

import { useRef, useState } from "react";
import { SAMPLE_URL } from "../lib/persist.ts";
import { useT } from "../i18n.tsx";

/** 上传组件 props。 */
export interface UploaderProps {
  /** 读取到 .twb 文本后回调（附带文件名）。 */
  onText: (text: string, fileName: string) => void;
  /** 错误提示回调。 */
  onError: (message: string) => void;
  /** 加载中（禁用交互）。 */
  busy?: boolean;
}


export function Uploader({ onText, onError, busy }: UploaderProps) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);

  const pick = (file: File | null | undefined) => {
    if (!file) return;
    // .twbx 有意不支持：打包工作簿可能内嵌数据提取（.hyper 等），
    // 只读解析 .twb 元数据可以避免把数据带进检视流程（见 README「数据安全」）。
    if (/\.twbx$/i.test(file.name)) {
      if (onError) {
        onError(t("twbxRejected"));
      }
      return;
    }
    if (!/\.twb$/i.test(file.name)) {
      if (onError) onError(t("chooseFile"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (onText) onText(String(reader.result ?? ""), file.name);
    };
    reader.onerror = () => {
      if (onError) onError(t("fileReadFailed"));
    };
    reader.readAsText(file);
  };

  const loadSample = async () => {
    try {
      const res = await fetch(SAMPLE_URL);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const text = await res.text();
      if (onText) onText(text, t("sampleFileName"));
    } catch (err) {
      if (onError) onError(t("sampleLoadFailed") + (err as Error).message);
    }
  };

  return (
    <div
      className={`uploader ${drag ? "drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        pick(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".twb"
        style={{ display: "none" }}
        onChange={(e) => {
          pick(e.target.files?.[0]);
          // 清空 value：否则再选同一个文件不会触发 change（被拒后另存为同名 .twb 的典型场景）
          e.target.value = "";
        }}
      />
      <button className="primary" onClick={() => inputRef.current?.click()} disabled={busy}>
        {t("chooseFileBtn")}
      </button>
      <button onClick={loadSample} disabled={busy}>
        {busy ? t("loading") : t("loadSample")}
      </button>
    </div>
  );
}
