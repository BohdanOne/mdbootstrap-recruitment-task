export default class BaseComponent {
  constructor(templateId, parentId) {
    this.template = document.getElementById(templateId);
    this.parent = document.getElementById(parentId);
    const templateContent = document.importNode(this.template.content, true);
    this.element = templateContent.firstElementChild;
    this.element.id = templateId;
  }

  attachToParent() {
    this.parent.appendChild(this.element);
  }
}
