import { FORMAT } from "./constants"

export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
}

export interface CssViewerConfig {
  /** file format css|less|sass|scss|styl */
  format: 'css' | 'less' | 'sass' | 'scss' | 'styl'
  /** stories to ignore */
  ignore: string[]
  /** regex to transform story ID into file name */
  fileRegex?: { in: string, out: string }
}