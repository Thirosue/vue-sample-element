import { buildPath } from '@/helpers';

describe('buildPath', () => {
  it('一覧画面のパスが正常に返る', () => {
    expect(buildPath('user').LIST).toBe('/userList');
  });

  it('詳細画面のパスが正常に返る', () => {
    expect(buildPath('user').DETAIL).toBe('/user');
  });

  it('編集画面のパスが正常に返る', () => {
    expect(buildPath('user').EDIT).toBe('/userEdit');
  });

  it('編集完了画面のパスが正常に返る', () => {
    expect(buildPath('user').EDIT_COMPLETE).toBe('/userEditComplete');
  });

  it('登録画面のパスが正常に返る', () => {
    expect(buildPath('user').REGISTER).toBe('/userRegister');
  });

  it('登録完了画面のパスが正常に返る', () => {
    expect(buildPath('user').REGISTER_COMPLETE).toBe('/userRegisterComplete');
  });

  it('想定外のプロパティの場合は、undefined が返る', () => {
    expect(buildPath('user').HOGE).toBe(undefined);
  });
});
