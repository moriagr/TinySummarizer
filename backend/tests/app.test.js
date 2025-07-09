import app from '../src/app.js';
import request from 'supertest';

describe('POST /summarize', () => {
  const longText = `
    The quick brown fox jumps over the lazy dog. 
    This is a sentence about animals. 
    Another sentence follows. 
    Text summarization is a technique used to reduce the length of a document while preserving its meaning.
    Natural language processing enables computers to understand and generate human language.
  `;

  it('should return A summary of the given text', async () => {

    const res = await request(app)
      .post('/summarize')
      .send({ text: longText }) // ✅ send the required body!
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body.summary).toBeDefined(); // ✅ check if summary is defined
    expect(typeof res.body.summary).toBe('string'); // ✅ check if summary is a
    expect(res.body.summary.split('.').length).toBeGreaterThanOrEqual(2);
    expect(res.body.summary).toContain('Text summarization is a technique used to reduce the length of a document while preserving its meaning. Natural language processing enables computers to understand and generate human language.');
  });

  it('should return 400 or 500 if no text is provided', async () => {

    const res = await request(app)
      .post('/summarize')
      .send({ }) // ✅ send the required body!
      .set('Content-Type', 'application/json');

    expect([400, 500]).toContain(res.statusCode);
    expect(res.body.error).toBeDefined(); // ✅ check if summary is defined
    // expect(typeof res.body.summary).toBe('string'); // ✅ check if summary is a
    // expect(res.body.summary.split('.').length).toBeGreaterThanOrEqual(2);
    // expect(res.body.summary).toContain('Text summarization is a technique used to reduce the length of a document while preserving its meaning. Natural language processing enables computers to understand and generate human language.');
  });

});
