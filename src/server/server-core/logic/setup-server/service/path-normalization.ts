import path from "node:path";

/**
 * 公開するpathにする関数
 * @param root 基準になるディレクトリー
 * @param public 公開するディレクトリーのパス
 */
export function pathNormalization(root: string, publicDirectory: string): string {
    // 利用者が危ないパスにしても、このサーバーは開発用なので割り切ります。
    const deliveryPath = path.resolve(root, publicDirectory);

    return deliveryPath;
}
