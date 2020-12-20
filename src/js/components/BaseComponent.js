export default class BaseComponent {
  constructor(templateId, parentId, newElementId = templateId) {
    this.template = document.getElementById(templateId);
    this.parent = document.getElementById(parentId);
    const templateContent = document.importNode(this.template.content, true);
    this.element = templateContent.firstElementChild;
    this.element.id = newElementId;
    this.attachToParent();
  }

  attachToParent() {
    this.parent.appendChild(this.element);
  }
}
