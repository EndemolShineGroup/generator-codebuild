import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid/v4';
// @ts-ignore
import assert from 'yeoman-assert';

import { generateWithOptions } from '../setupTests';

describe('app:cloudformation', () => {
  const REPO_SLUG = 'glasf-bist';
  const options = {
    isPublic: true,
    repoSlug: REPO_SLUG,
  };

  describe('Generates a CloudFormation template as JSON', () => {
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());

    beforeEach(async () => {
      return generateWithOptions(__dirname, OUTPUT_PATH, options);
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('creates conf/template.yml', () => {
      assert.file(path.join(OUTPUT_PATH, 'conf', 'template.json'));
    });
  });

  describe('Generates a CloudFormation template as YML', () => {
    const OUTPUT_PATH = path.join(os.tmpdir(), uuid());

    beforeEach(async () => {
      return generateWithOptions(__dirname, OUTPUT_PATH, {
        ...options,
        format: 'yml',
      });
    });

    afterEach(() => {
      rimraf.sync(OUTPUT_PATH);
    });

    it('creates conf/template.yml', () => {
      assert.file(path.join(OUTPUT_PATH, 'conf', 'template.yml'));
    });
  });
});
