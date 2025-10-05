/**
 * 动态加载js/css
 * @description 支持批量加载，防止重复加载
 * @example
 * ```ts
 * await AppendJS.loadScript('https://example.com/script.js');
 * await AppendJS.loadScriptsBatch(['https://example.com/script1.js', 'https://example.com/style.css']);
 * AppendJS.remove(['https://example.com/script.js']);
 * AppendJS.clear(); // 清除所有加载的js/css
 * ```
 */
export class AppendJS {
  /** 已经加载完的js/css */
  static LoadedScr: string[] = [];
  /** 正在加载的js/css */
  static LoadingScrQueue: Record<string, any[]> = {};

  static async loadScript(src: string) {
    return await new Promise((resolve, reject) => {
      if (AppendJS.LoadedScr.includes(src)) {
        return resolve(src);
      }

      if (AppendJS.LoadingScrQueue[src]) {
        AppendJS.LoadingScrQueue[src].push(resolve);
      } else {
        AppendJS.LoadingScrQueue[src] = [resolve];
      }

      let link;
      if (src.includes('.js')) {
        link = document.createElement('script');
        link.src = src;
        link.async = true;
      } else if (src.includes('.css')) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
      }

      (link as HTMLScriptElement | HTMLLinkElement).onload = () => {
        AppendJS.LoadedScr.push(src);
        AppendJS.LoadingScrQueue[src].forEach((resolve) => resolve(src));
        AppendJS.LoadingScrQueue[src] = [];
      };
      (link as HTMLScriptElement | HTMLLinkElement).onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(link as HTMLScriptElement | HTMLLinkElement);
    });
  }

  static async loadScriptsBatch(srcArr: string[]) {
    return await Promise.all(srcArr.map(AppendJS.loadScript));
  }

  static remove(src: string[]) {
    src.forEach((item) => {
      const link = document.querySelector(`script[src="${item}"]`) || document.querySelector(`link[href="${item}"]`);
      if (link) {
        link.remove();
      }
    });
  }

  static clear() {
    AppendJS.remove(AppendJS.LoadedScr);
  }
}

export default AppendJS;
