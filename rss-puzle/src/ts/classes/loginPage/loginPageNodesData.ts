import NodeParams from '../../interfaces/NodeParams';

const LoginPageNodesData: Record<string, NodeParams> = {
  parentNode: {
    tag: 'div',
    css: ['login-page'],
  },
  inputParent: {
    tag: 'div',
    css: ['field'],
  },
  loginNotice: {
    tag: 'p',
    css: ['login-notice'],
  },
  submitBtn: {
    tag: 'button',
    css: ['login-button'],
    text: 'sing in',
  },
  loginContainer: {
    tag: 'div',
    css: ['login-page__container'],
  },
};

export default LoginPageNodesData;
