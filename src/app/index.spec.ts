import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid/v4';
// @ts-ignore
import assert from 'yeoman-assert';

import { generateWithPrompts } from '../setupTests';

describe('app', () => {
  describe('Generates CodeBuild files', () => {
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());
    const PROJECT_NAME = 'EndemolShineGroup/glasf-bist';
    const answers: object = {
      repoSlug: PROJECT_NAME,
    };

    beforeEach(async () => {
      return generateWithPrompts(__dirname, OUTPUT_PATH, answers);
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('copies all files', () => {
      assert.file(path.join(OUTPUT_PATH, 'conf', 'template.yml'));
      assert.file(path.join(OUTPUT_PATH, 'buildspec.yml'));
    });
  });
});
