import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid/v4';
// @ts-ignore
import assert from 'yeoman-assert';

import { generateWithPrompts } from '../setupTests';

describe('app', () => {
  const PROJECT_NAME = 'glasf-bist';
  const answers: object = {
    projectName: PROJECT_NAME,
  };

  describe('Generates CodeBuild files correctly', () => {
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());

    beforeEach(async () => {
      return generateWithPrompts(__dirname, OUTPUT_PATH, answers);
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('copies all files', () => {
      assert.file(path.join(OUTPUT_PATH, 'conf', 'template.json'));
      assert.file(path.join(OUTPUT_PATH, 'buildspec.yml'));
    });
  });
});
