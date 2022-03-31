import { MedicalPipe } from './medical.pipe';

describe('MedicalPipe', () => {
  it('create an instance', () => {
    const pipe = new MedicalPipe();
    expect(pipe).toBeTruthy();
  });
});
