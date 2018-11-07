import validateRepoSlug from './validateRepoSlug';

describe('#validateRepoSlug', () => {
  it('should return true for valid repo slugs', () => {
    expect(
      validateRepoSlug('EndemolShineGroup/generator-codebuild'),
    ).toBeTruthy();
  });

  it('should return an error string for invalid repo slugs', () => {
    expect(validateRepoSlug('EndemolShineGroup/generator/codebuild')).toMatch(
      'Invalid repo slug',
    );
  });
});
