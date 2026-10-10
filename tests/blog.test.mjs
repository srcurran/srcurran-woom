import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { parsePostFilename } from '../src/lib/blog-filename.mjs';
import media from '../src/plugins/blog-media.mjs';

test('filename determines title, stable URL and date', () => {
  const post = parsePostFilename('folder/2020-09-21-1421--Foo-Bar.md');
  assert.equal(post.title, 'Foo Bar');
  assert.equal(post.slug, '2020-09-21-1421--foo-bar');
  assert.equal(post.date.toISOString(), '2020-09-21T14:21:00.000Z');
});
test('invalid names and impossible dates fail clearly', () => {
  for (const name of ['hello.md', '2020-02-30-1421--Bad.md', '2020-09-21-2460--Bad.md']) {
    assert.throws(() => parsePostFilename(name));
  }
});
test('external media URLs stay external', () => {
  let result;
  media.raw({ value: '<video src="https://example.com/movie.mp4"></video>' }, {
    fileURL: pathToFileURL(`${process.cwd()}/src/content/blog/example/post.md`),
    replaceNode: (_, node) => { result = node.value; },
  });
  assert.match(result, /src="https:\/\/example.com\/movie.mp4"/);
});
test('missing media and paths outside the blog fail during compilation', () => {
  for (const src of ['./missing.mp4', '../../../../secret.mp4']) {
    assert.throws(() => media.raw({ value: `<video src="${src}"></video>` }, {
      fileURL: pathToFileURL(`${process.cwd()}/src/content/blog/example/post.md`),
      replaceNode() {},
    }));
  }
});

test('nested relative media resolves with URL escaping and query/hash preserved', async () => {
  const { mkdtemp, writeFile, rm } = await import('node:fs/promises');
  const folder = await mkdtemp(`${process.cwd()}/src/content/blog/media-test-`);
  try {
    await writeFile(`${folder}/my clip.mp4`, 'fixture');
    let result;
    media.raw({ value: '<video src="./my%20clip.mp4?download=1#t=2"></video>' }, {
      fileURL: pathToFileURL(`${folder}/post.md`),
      replaceNode: (_, node) => { result = node.value; },
    });
    assert.match(result, /src="\/blog-media\/media-test-[^/]+\/my%20clip.mp4\?download=1#t=2"/);
  } finally {
    await rm(folder, { recursive: true });
  }
});
