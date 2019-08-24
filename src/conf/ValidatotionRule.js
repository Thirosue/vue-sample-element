const trigger = 'blur';

export const email = [{
  required: true, type: 'email', trigger, message: 'Emailを入力してください。',
}];
export const required = target => [{
  required: true, trigger, message: `${target}を入力してください。`,
}];
