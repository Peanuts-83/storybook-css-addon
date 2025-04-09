import { FORMAT } from "./constants"

export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
}

export interface CssViewerConfig {
  /** prefix added to style file name */
  prefix: string
  /** prefix to ignore for style file name */
  ignorePrefix: string
  /** file format css|less|sass|scss|styl */
  format: 'css' | 'less' | 'sass' | 'scss' | 'styl'
  /** stories to ignore */
  ignore: string[]
}