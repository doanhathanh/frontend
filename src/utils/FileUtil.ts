import * as filestream from 'fs';
import * as path from 'path';

export default class FileUtil {
  static ReadText(filePath: string): string {
    const filepath: string = path.resolve(filePath);
    const fileContent: string = filestream.readFileSync(filepath, { encoding: 'utf8' });
    return fileContent;
  }
}
