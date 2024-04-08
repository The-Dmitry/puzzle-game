import InputNodeCreator from '../../../common/nodeCreator/InputNodeCreator';
import NodeCreator from '../../../common/nodeCreator/NodeCreator';
import View from '../../../common/view/View';
import UserItemView from './userItem/UserItemView';
import './usersListView.scss';

export default class UsersListView extends View {
  private listNode = new NodeCreator({ tag: 'ul', css: ['users-list'] });

  private usersList = new Map<string, UserItemView>();

  constructor() {
    super({ tag: 'div', css: ['users'] });
    this.render();
  }

  private render() {
    const filter = new InputNodeCreator({ tag: 'input', type: 'text', css: ['users__filter'] });
    this.addNodeInside(filter, this.listNode);
  }
}
