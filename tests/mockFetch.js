export default function mockFetch(data, status = 200) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: status,
      ok: true,
      json: () => data
    })
  );
}