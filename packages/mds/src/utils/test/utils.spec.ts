import { parseTimeString } from '../utils';

describe('parseTimeString', () => {
  it('parses "0" as 00:00', async () => {
    const { hours, minutes } = parseTimeString('0');
    expect(hours).toBe(0);
    expect(minutes).toBe(0);
  });
  it('parses "2" as 02:00', async () => {
    const { hours, minutes } = parseTimeString('2');
    expect(hours).toBe(2);
    expect(minutes).toBe(0);
  });
  it('parses "14" as 14:00', async () => {
    const { hours, minutes } = parseTimeString('14');
    expect(hours).toBe(14);
    expect(minutes).toBe(0);
  });
  it('parses "12:00" as 12:00', async () => {
    const { hours, minutes } = parseTimeString('12:00');
    expect(hours).toBe(12);
    expect(minutes).toBe(0);
  });
  it('parses "23:59" as 23:59', async () => {
    const { hours, minutes } = parseTimeString('23:59');
    expect(hours).toBe(23);
    expect(minutes).toBe(59);
  });
  it('parses "12:59 AM" as 00:59', async () => {
    const { hours, minutes } = parseTimeString('12:59 AM');
    expect(hours).toBe(0);
    expect(minutes).toBe(59);
  });
  it('parses "1259a" as 00:59', async () => {
    const { hours, minutes } = parseTimeString('1259a');
    expect(hours).toBe(0);
    expect(minutes).toBe(59);
  });
  it('parses "02:59 PM" as 14:59', async () => {
    const { hours, minutes } = parseTimeString('02:59 PM');
    expect(hours).toBe(14);
    expect(minutes).toBe(59);
  });
  it('parses "12 59p" as 12:59', async () => {
    const { hours, minutes } = parseTimeString('12 59p');
    expect(hours).toBe(12);
    expect(minutes).toBe(59);
  });
});
